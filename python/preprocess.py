"""
preprocess.py — NLP text cleaning utilities.

Steps: lowercase -> remove urls/html/punctuation/digits -> tokenize
       -> remove english stop words -> Porter stemming
"""

import re
import string

import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Download the required NLTK resources once (safe to call repeatedly).
for pkg in ("stopwords", "punkt"):
    try:
        nltk.data.find(f"corpora/{pkg}" if pkg == "stopwords" else f"tokenizers/{pkg}")
    except LookupError:  # pragma: no cover
        nltk.download(pkg)

STOP_WORDS = set(stopwords.words("english"))
STEMMER = PorterStemmer()


def clean_text(text: str) -> str:
    """Return a cleaned, stemmed, space separated string ready for TF-IDF."""
    if not isinstance(text, str):
        return ""

    text = text.lower()
    text = re.sub(r"https?://\S+|www\.\S+", " ", text)   # urls
    text = re.sub(r"<.*?>", " ", text)                   # html tags
    text = re.sub(r"\[.*?\]", " ", text)                 # [bracketed] text
    text = re.sub(r"\d+", " ", text)                     # digits
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r"\s+", " ", text).strip()

    tokens = [w for w in text.split() if len(w) > 2 and w not in STOP_WORDS]
    tokens = [STEMMER.stem(w) for w in tokens]
    return " ".join(tokens)


if __name__ == "__main__":
    print(clean_text("BREAKING!!! Visit http://fake.com — Doctors are SHOCKED in 2024."))
