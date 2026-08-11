import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Database, GitBranch, LayoutTemplate, Server, Workflow } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Project — Fake News Detection Using ML" },
      {
        name: "description",
        content:
          "Project overview, objectives, system architecture, modules, technology stack and folder structure of the Fake News Detection final-year project.",
      },
      { property: "og:title", content: "About the Project — Fake News Detection Using ML" },
      {
        property: "og:description",
        content: "Objectives, architecture, modules and technology stack of the fake news detection system.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const stack = [
  { icon: LayoutTemplate, title: "Frontend", body: "HTML, CSS, JavaScript / React — responsive UI, input validation, result display" },
  { icon: Server, title: "Backend", body: "Python Flask REST API exposing /api/predict and serving the web pages" },
  { icon: Boxes, title: "Machine Learning", body: "Scikit-learn — Logistic Regression, Multinomial Naive Bayes, Random Forest" },
  { icon: Workflow, title: "NLP", body: "Text cleaning, stop-word removal, stemming, TF-IDF vectorization" },
  { icon: Database, title: "Database", body: "SQLite (predictions.db) storing every query, prediction and confidence" },
  { icon: GitBranch, title: "Persistence", body: "joblib serialised model.pkl and vectorizer.pkl loaded once at server start" },
];

const objectives = [
  "Collect and prepare a labelled dataset of real and fake news articles.",
  "Apply NLP preprocessing to convert raw news text into clean tokens.",
  "Extract numerical features from text using TF-IDF vectorization.",
  "Train and compare multiple supervised classification algorithms.",
  "Evaluate models using accuracy, precision, recall, F1-score and a confusion matrix.",
  "Save the best performing model and serve it through a Flask REST API.",
  "Build a responsive, validated web interface for end users.",
  "Display the prediction along with a confidence percentage.",
];

const modules = [
  ["Module 1 — Dataset Module", "Loads True.csv and Fake.csv, labels them, merges and shuffles the data."],
  ["Module 2 — Preprocessing Module", "Lowercasing, URL/HTML/punctuation removal, tokenization, stop-word removal, stemming."],
  ["Module 3 — Feature Extraction Module", "TF-IDF vectorization converting cleaned text into a weighted numeric matrix."],
  ["Module 4 — Model Training Module", "Trains Logistic Regression, Naive Bayes and Random Forest on the training split."],
  ["Module 5 — Evaluation Module", "Computes metrics, confusion matrix and performance graphs; selects the best model."],
  ["Module 6 — Persistence Module", "Serialises the winning model and the fitted vectorizer with joblib."],
  ["Module 7 — API Module", "Flask endpoint that validates input, transforms it and returns JSON prediction + confidence."],
  ["Module 8 — User Interface Module", "Responsive frontend with the text area, Check News button and result card."],
  ["Module 9 — Database Module", "SQLite log of every prediction for history and analysis."],
];

const folders = `fake-news-detection/
├── dataset/
│   ├── True.csv
│   └── Fake.csv
├── model/
│   ├── model.pkl
│   └── vectorizer.pkl
├── notebooks/
│   └── exploration.ipynb
├── static/
│   ├── css/style.css
│   └── js/script.js
├── templates/
│   ├── index.html
│   └── about.html
├── app.py                # Flask backend + REST API
├── train_model.py        # preprocessing, training, evaluation, saving
├── preprocess.py         # NLP cleaning helpers
├── database.py           # SQLite helper
├── requirements.txt
└── README.md`;

function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About the Project</h1>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          <strong className="text-foreground">Fake News Detection Using Artificial Intelligence and Machine
          Learning</strong> is a web-based application that analyses the text of a news article or headline and
          predicts whether it is genuine or fabricated. The system combines Natural Language Processing for text
          understanding with a supervised machine learning classifier trained on a labelled corpus of real and
          fake news.
        </p>

        <Section title="Problem statement">
          <p className="text-muted-foreground leading-relaxed">
            Social media allows unverified information to spread faster than journalists can fact-check it.
            Manual verification is slow, expensive and cannot scale. The project addresses this by building an
            automated classifier that gives an instant, explainable indication of whether a piece of news text is
            likely to be fake.
          </p>
        </Section>

        <Section title="Objectives">
          <ul className="text-muted-foreground list-disc space-y-1.5 pl-5">
            {objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </Section>

        <Section title="Technology stack">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((s) => (
              <div key={s.title} className="border-border bg-card rounded-xl border p-4">
                <s.icon className="text-primary size-5" />
                <p className="mt-3 font-semibold">{s.title}</p>
                <p className="text-muted-foreground mt-1 text-sm">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            This live demo runs the identical pipeline (cleaning → TF-IDF → Logistic Regression) in TypeScript so
            it can be hosted without a Python server. The complete Flask + scikit-learn reference implementation
            is included in the <code className="bg-muted rounded px-1">/python</code> folder of the repository.
          </p>
        </Section>

        <Section title="System architecture">
          <pre className="border-border bg-muted/50 overflow-x-auto rounded-xl border p-4 text-xs leading-relaxed">
{`┌──────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│   Browser UI · text area · Check News · result card      │
└───────────────────────────┬──────────────────────────────┘
                            │ HTTP POST /api/predict (JSON)
┌───────────────────────────▼──────────────────────────────┐
│                    APPLICATION LAYER                     │
│   Flask · input validation · error handling · routing    │
└───────────────────────────┬──────────────────────────────┘
                            │ clean_text()
┌───────────────────────────▼──────────────────────────────┐
│                  MACHINE LEARNING LAYER                  │
│   TF-IDF vectorizer.pkl  →  model.pkl (LogReg)           │
│   returns label + predict_proba confidence               │
└───────────────────────────┬──────────────────────────────┘
                            │
┌───────────────────────────▼──────────────────────────────┐
│                      DATA LAYER                          │
│   dataset/True.csv · Fake.csv    SQLite predictions.db   │
└──────────────────────────────────────────────────────────┘`}
          </pre>
        </Section>

        <Section title="Project workflow">
          <ol className="text-muted-foreground list-decimal space-y-1.5 pl-5">
            <li>Dataset collection (Kaggle Fake and Real News Dataset).</li>
            <li>Data cleaning and labelling (REAL = 0, FAKE = 1).</li>
            <li>NLP preprocessing of the article text.</li>
            <li>TF-IDF feature extraction.</li>
            <li>Train / test split (80:20, stratified).</li>
            <li>Model training with Logistic Regression, Naive Bayes and Random Forest.</li>
            <li>Evaluation and best-model selection.</li>
            <li>Model and vectorizer saved with joblib.</li>
            <li>Flask API loads the model and exposes a prediction endpoint.</li>
            <li>Frontend sends user text and renders the label with confidence.</li>
          </ol>
        </Section>

        <Section title="Modules">
          <div className="divide-border border-border divide-y rounded-xl border">
            {modules.map(([name, desc]) => (
              <div key={name} className="p-4">
                <p className="font-medium">{name}</p>
                <p className="text-muted-foreground mt-1 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Folder structure">
          <pre className="border-border bg-muted/50 overflow-x-auto rounded-xl border p-4 text-xs leading-relaxed">
            {folders}
          </pre>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
