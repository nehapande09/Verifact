from flask import Flask, request, jsonify
from flask_cors import CORS
from trending.model import predict_statement  # Model 1 - Basic Truth Check
from deep_analysis.deep_analysis import perform_deep_analysis  # Model 2 - Deep Analysis
from pymongo import MongoClient
from datetime import datetime, timedelta, timezone

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")  # Use your MongoDB URI here (Atlas or Local)
db = client["verifact_db"]
collection = db["fact_checks"]

# Save to MongoDB
def save_to_mongo(statement, prediction, deep_analysis):
    # Only store the necessary data (prediction and deep_analysis)
    data = {
        "statement": statement,
        "prediction": prediction,
        "deep_analysis": deep_analysis,
        "created_at": datetime.now(timezone.utc)
    }
    collection.insert_one(data)
def generate_result_text(prediction, deep_analysis):
    primary_score = prediction.get("pie_chart", {}).get("SUPPORTS", 0)
    secondary_score = deep_analysis.get("pie_chart", {}).get("SUPPORTS", 0)

    # Derive verdicts from score thresholds
    primary_verdict = "True" if primary_score >= 50 else "False"
    secondary_verdict = "True" if secondary_score < 50 else "False"

    return (
        f"Based on our dual-model evaluation, the statement is assessed as follows:\n"
        f"- Model 1 (Trending): {primary_verdict} (Confidence: {primary_score}%)\n"
        f"- Model 2 (In-depth Analysis): {secondary_verdict} (Confidence: {100 - secondary_score}%)\n\n"
        f"These results indicate that both models independently assess the statement with a high degree of confidence, "
      
    )



# Route for Model 1 + Deep Analysis
@app.route('/api/verify', methods=['POST'])
def verify():
    statement = request.json.get('statement')
    if not statement:
        return jsonify({"error": "Missing 'statement' in request."}), 400

    try:
        prediction = predict_statement(statement)
        deep_analysis = perform_deep_analysis(statement)
        save_to_mongo(statement, prediction, deep_analysis)

        result_text = generate_result_text(prediction, deep_analysis)

        return jsonify({
            "prediction": prediction,
            "statement": statement,
            "result": result_text,
            "deep_analysis": deep_analysis
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"An error occurred during verification: {str(e)}"}), 500


# Get latest 3 results (for homepage cards)
@app.route('/api/latest', methods=['GET'])
def latest():
    try:
        latest_docs = list(collection.find().sort("created_at", -1).limit(3))
        for doc in latest_docs:
            doc["_id"] = str(doc["_id"])
        return jsonify(latest_docs)
    except Exception as e:
        return jsonify({"error": f"Error fetching latest data: {str(e)}"}), 500

# Get last week's history
@app.route('/api/history', methods=['GET'])
def history():
    try:
        one_week_ago = datetime.now(timezone.utc) - timedelta(days=7)
        weekly_docs = list(collection.find({"created_at": {"$gte": one_week_ago}}).sort("created_at", -1))
        for doc in weekly_docs:
            doc["_id"] = str(doc["_id"])
        return jsonify(weekly_docs)
    except Exception as e:
        return jsonify({"error": f"Error fetching history: {str(e)}"}), 500

# Optional: Route for testing connection
@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({"status": "Backend is live!"})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
