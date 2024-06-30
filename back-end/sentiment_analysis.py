# sentiment_analysis.py

from transformers import pipeline

def analyze_sentiment(text):
    sent_pipeline = pipeline("sentiment-analysis")
    result = sent_pipeline(text)
    return result[0]['label'], result[0]['score']

if __name__ == "__main__":
    import sys
    text_to_analyze = sys.argv[1]
    sentiment_label, sentiment_score = analyze_sentiment(text_to_analyze)
    print(f"{sentiment_label},{sentiment_score}")
