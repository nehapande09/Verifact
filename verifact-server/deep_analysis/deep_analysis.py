import warnings
warnings.filterwarnings("ignore", category=UserWarning, module='wikipedia')

import wikipedia
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# --- Sentence Tokenizer ---
def split_sentences(text):
    doc = nlp(text)
    return [sent.text.strip() for sent in doc.sents]

# --- Clean and guess query ---
def guess_wikipedia_query(statement):
    return statement.strip()

# --- Get Wikipedia Summary ---
def get_wikipedia_context(query):
    try:
        return wikipedia.summary(query, sentences=5)
    except Exception as e:
        return str(e)

# --- Check if statement is supported ---
def is_statement_true(statement, context, threshold=0.3):
    sentences = split_sentences(context)
    tfidf = TfidfVectorizer().fit_transform([statement] + sentences)
    cosine_similarities = cosine_similarity(tfidf[0:1], tfidf[1:]).flatten()

    max_similarity = max(cosine_similarities)
    return (max_similarity >= threshold), round(max_similarity * 100, 2)

# --- Final Deep Analysis Function ---
def perform_deep_analysis(statement):
    query = guess_wikipedia_query(statement)
    context = get_wikipedia_context(query)

    if "may refer to:" in context or "disambiguation" in context.lower():
        return {"error": "⚠ Multiple Wikipedia pages found. Please refine the statement."}
    elif "not found" in context.lower():
        return {"error": "❌ Wikipedia page not found. Try changing the statement."}

    verdict_bool, confidence = is_statement_true(statement, context)

    supports_percent = confidence
    not_supports_percent = round(100 - confidence, 2)

    return {
        "verdict": "True" if verdict_bool else "False",
        "pie_chart": {
            "SUPPORTS": supports_percent,
            "NOT_SUPPORTS": not_supports_percent
        }
    }

