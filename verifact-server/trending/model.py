# trending/model.py

import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from trending.search import fetch_search_results  # Now using DuckDuckGo scraper

# Load the RNN model
model = load_model('trending/rnn_model.h5')

# Load the tokenizer
with open('trending/tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

def predict_statement(statement):
    # Fetch search results using DuckDuckGo + scraping
    search_results = fetch_search_results(statement)

    supports = 0
    not_supports = 0
    sources = []

    for result in search_results:
        text = result.get('title', '') + " " + result.get('snippet', '')
        
        # Preprocess and predict
        sequences = tokenizer.texts_to_sequences([text])
        padded = pad_sequences(sequences, maxlen=100)
        prob = model.predict(padded)[0][0]

        if prob >= 0.5:
            supports += 1
        else:
            not_supports += 1

        # Add source to output
        sources.append({
            "title": result.get("title"),
            "link": result.get("link"),
            "snippet": result.get("snippet")
        })

    # Calculate percentages
    total = supports + not_supports
    supports_percent = round((supports / total) * 100, 2) if total > 0 else 50
    not_supports_percent = 100 - supports_percent

    # Final verdict
    verdict = "TRUE ✅" if supports > not_supports else "FALSE ❌"

    return {
        "verdict": verdict,
        "pie_chart": {
            "SUPPORTS": supports_percent,
            "NOT_SUPPORTS": not_supports_percent
        },
        "sources": sources[:5]  # Limit to top 5 sources
    }
