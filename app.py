from flask import Flask, request, jsonify
from flask_cors import CORS
from trending.model import predict_statement           # Model 1 - Basic Truth Check
from deep_analysis.deep_analysis import perform_deep_analysis  # Model 2 - Deep Analysis

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Route for Model 1: Statement Verification (Pie Chart + Verdict)
@app.route('/api/verify', methods=['POST'])
def verify():
    statement = request.json.get('statement')
    if not statement:
        return jsonify({"error": "Missing 'statement' in request."}), 400

    deep_analysis = perform_deep_analysis(statement)
    result = {
        "prediction":  predict_statement(statement),
        "statement": statement,
        "isTrue": True,
        "deep_analysis": deep_analysis
    }
    
    return jsonify(result)

'''
# Route for Model 2: Deep Analysis (Sentiment/NER/Keywords)
@app.route('/api/deep_analysis', methods=['POST'])
def deep_analysis():
    statement = request.json.get('statement')
    if not statement:
        return jsonify({"error": "Missing 'statement' in request."}), 400

    result = perform_deep_analysis(statement)
    return jsonify(result)
'''
if __name__ == '__main__':
    app.run(debug=True)
