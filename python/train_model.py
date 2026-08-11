"""
train_model.py — dataset preparation, training, evaluation and model saving.

Run:  python train_model.py
Output: model/model.pkl, model/vectorizer.pkl, results/*.png, results/metrics.txt
"""

import os

import joblib
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB

from preprocess import clean_text

DATA_DIR = "dataset"
MODEL_DIR = "model"
RESULTS_DIR = "results"
RANDOM_STATE = 42

REAL, FAKE = 0, 1


# --------------------------------------------------------------------- #
# 1. Dataset preparation                                                 #
# --------------------------------------------------------------------- #
def load_dataset() -> pd.DataFrame:
    """Load True.csv / Fake.csv, label, merge and shuffle."""
    true_df = pd.read_csv(os.path.join(DATA_DIR, "True.csv"))
    fake_df = pd.read_csv(os.path.join(DATA_DIR, "Fake.csv"))

    true_df["label"] = REAL
    fake_df["label"] = FAKE

    df = pd.concat([true_df, fake_df], ignore_index=True)
    df["content"] = df["title"].fillna("") + " " + df["text"].fillna("")
    df = df[["content", "label"]].dropna()
    df = df.sample(frac=1, random_state=RANDOM_STATE).reset_index(drop=True)

    print(f"Total articles : {len(df)}")
    print(df["label"].value_counts().rename({REAL: "REAL", FAKE: "FAKE"}))
    return df


# --------------------------------------------------------------------- #
# 2. Training + evaluation                                               #
# --------------------------------------------------------------------- #
def evaluate(name, y_test, y_pred):
    metrics = {
        "model": name,
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1": f1_score(y_test, y_pred),
    }
    print(f"\n===== {name} =====")
    print(classification_report(y_test, y_pred, target_names=["REAL", "FAKE"]))
    return metrics


def plot_confusion(y_test, y_pred, name):
    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(4.5, 4))
    sns.heatmap(
        cm, annot=True, fmt="d", cmap="Blues",
        xticklabels=["REAL", "FAKE"], yticklabels=["REAL", "FAKE"],
    )
    plt.title(f"Confusion Matrix — {name}")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.tight_layout()
    plt.savefig(os.path.join(RESULTS_DIR, f"confusion_{name.replace(' ', '_').lower()}.png"), dpi=150)
    plt.close()


def plot_comparison(all_metrics):
    df = pd.DataFrame(all_metrics).set_index("model")[["accuracy", "precision", "recall", "f1"]] * 100
    df.plot(kind="bar", figsize=(8, 4.5), ylim=(80, 100), rot=0)
    plt.title("Model performance comparison (%)")
    plt.ylabel("Score (%)")
    plt.tight_layout()
    plt.savefig(os.path.join(RESULTS_DIR, "model_comparison.png"), dpi=150)
    plt.close()


def main():
    os.makedirs(MODEL_DIR, exist_ok=True)
    os.makedirs(RESULTS_DIR, exist_ok=True)

    df = load_dataset()

    print("\nCleaning text (this can take a few minutes)...")
    df["clean"] = df["content"].apply(clean_text)

    X_train, X_test, y_train, y_test = train_test_split(
        df["clean"], df["label"], test_size=0.2, random_state=RANDOM_STATE, stratify=df["label"]
    )

    # 3. Feature extraction -------------------------------------------------
    vectorizer = TfidfVectorizer(stop_words="english", max_df=0.7)
    X_train_v = vectorizer.fit_transform(X_train)
    X_test_v = vectorizer.transform(X_test)
    print(f"TF-IDF features: {len(vectorizer.get_feature_names_out())}")

    # 4. Model training -----------------------------------------------------
    candidates = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Multinomial NB": MultinomialNB(),
        "Random Forest": RandomForestClassifier(n_estimators=200, random_state=RANDOM_STATE, n_jobs=-1),
    }

    all_metrics, trained = [], {}
    for name, clf in candidates.items():
        clf.fit(X_train_v, y_train)
        y_pred = clf.predict(X_test_v)
        all_metrics.append(evaluate(name, y_test, y_pred))
        plot_confusion(y_test, y_pred, name)
        trained[name] = clf

    plot_comparison(all_metrics)

    # 5. Select and save the best model ------------------------------------
    best = max(all_metrics, key=lambda m: m["f1"])
    best_name = best["model"]
    print(f"\nBest model: {best_name} (F1 = {best['f1']:.4f})")

    joblib.dump(trained[best_name], os.path.join(MODEL_DIR, "model.pkl"))
    joblib.dump(vectorizer, os.path.join(MODEL_DIR, "vectorizer.pkl"))
    print(f"Saved -> {MODEL_DIR}/model.pkl and {MODEL_DIR}/vectorizer.pkl")

    with open(os.path.join(RESULTS_DIR, "metrics.txt"), "w") as fh:
        for m in all_metrics:
            fh.write(
                f"{m['model']}: accuracy={m['accuracy']:.4f} precision={m['precision']:.4f} "
                f"recall={m['recall']:.4f} f1={m['f1']:.4f}\n"
            )

    # 6. Quick sanity check -------------------------------------------------
    demo = "SHOCKING! Doctors are furious, this herb cures every disease in 3 days!!!"
    vec = vectorizer.transform([clean_text(demo)])
    proba = trained[best_name].predict_proba(vec)[0]
    print(f"\nDemo prediction -> {'FAKE' if np.argmax(proba) == FAKE else 'REAL'} "
          f"({max(proba) * 100:.2f}% confidence)")


if __name__ == "__main__":
    main()
