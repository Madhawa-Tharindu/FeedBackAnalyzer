from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS module
from textblob import TextBlob

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def analyze_sentiment(text):
    blob = TextBlob(text)
    sentiment_polarity = blob.sentiment.polarity

    if sentiment_polarity > 0:
        sentiment = "POSITIVE"
    elif sentiment_polarity < 0:
        sentiment = "NEGATIVE"
    else:
        sentiment = "NEUTRAL"

    return sentiment, sentiment_polarity

@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment_api():
    try:
        data = request.get_json()
        text_to_analyze = data['text']
        sentiment, score = analyze_sentiment(text_to_analyze)
        response = {'sentiment_label': sentiment, 'sentiment_score': score}
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
