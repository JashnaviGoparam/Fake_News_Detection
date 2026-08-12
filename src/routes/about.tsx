import { Link } from "@tanstack/react-router";
import {
  Award,
  Boxes,
  Database,
  GitBranch,
  GraduationCap,
  LayoutTemplate,
  Lightbulb,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  Zap,
} from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Project — Fake News Detection Using ML" },
      {
        name: "description",
        content:
          "Project overview, objectives, system architecture, modules, technology stack, learning outcomes and folder structure of the Fake News Detection final-year project.",
      },
      { property: "og:title", content: "About the Project — Fake News Detection Using ML" },
      {
        property: "og:description",
        content: "Objectives, architecture, modules, technology stack and learning outcomes of the fake news detection system.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const highlights = [
  { value: "96%", label: "Test Accuracy" },
  { value: "44K+", label: "Training Articles" },
  { value: "< 1s", label: "Prediction Time" },
  { value: "3", label: "ML Models Compared" },
];

const stack = [
  { icon: LayoutTemplate, title: "Frontend", body: "React + Tailwind CSS — responsive UI, input validation, animated result display" },
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

const learningOutcomes = [
  { icon: Database, text: "Hands-on experience with real-world text dataset collection, cleaning and labelling." },
  { icon: Workflow, text: "Practical understanding of TF-IDF feature extraction and sparse matrix representation." },
  { icon: Boxes, text: "Training, comparing and evaluating multiple supervised classifiers using scikit-learn." },
  { icon: Award, text: "Interpreting accuracy, precision, recall, F1-score and confusion matrices." },
  { icon: Server, text: "Deploying a trained ML model through a Flask REST API with input validation." },
  { icon: LayoutTemplate, text: "Building a responsive frontend that consumes an ML endpoint and visualises results." },
];

const futureScope = [
  { icon: Lightbulb, text: "Fine-tune contextual deep learning models such as BERT for richer semantic understanding." },
  { icon: Workflow, text: "Add multilingual support, especially regional Indian languages." },
  { icon: ShieldCheck, text: "Integrate live fact-checking APIs and source-credibility scoring." },
  { icon: Rocket, text: "Provide a browser extension and mobile application for instant checks." },
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
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 sm:p-12">
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <Sparkles className="size-3.5" /> Final-Year AI/ML Project
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Fake News Detection Using Machine Learning
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
              A web-based application that analyses the text of a news article or headline and predicts whether it is
              genuine or fabricated. The system combines Natural Language Processing for text understanding with a
              supervised machine learning classifier trained on a labelled corpus of real and fake news.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Zap className="size-4" /> Try Live Detector
              </Link>
              <Link
                to="/documentation"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <GraduationCap className="size-4" /> Read Full Report
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="rounded-2xl border bg-card p-6 text-center">
              <p className="font-display text-3xl font-bold text-primary">{h.value}</p>
              <p className="text-muted-foreground mt-1 text-sm">{h.label}</p>
            </div>
          ))}
        </div>

        {/* Problem statement */}
        <Section icon={Target} title="Problem Statement">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="leading-relaxed">
              Social media allows unverified information to spread faster than journalists can fact-check it. Manual
              verification is slow, expensive and cannot scale. The project addresses this by building an automated
              classifier that gives an instant, explainable indication of whether a piece of news text is likely to be
              fake.
            </p>
          </div>
        </Section>

        {/* Objectives */}
        <Section icon={Award} title="Objectives">
          <div className="grid gap-3 sm:grid-cols-2">
            {objectives.map((o, i) => (
              <div key={o} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{o}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Technology stack */}
        <Section icon={Boxes} title="Technology Stack">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((s) => (
              <div key={s.title} className="rounded-2xl border bg-card p-5 transition-colors hover:border-primary/30">
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="size-5" />
                </div>
                <p className="mt-3 font-semibold">{s.title}</p>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            This live demo runs the identical pipeline (cleaning → TF-IDF → Logistic Regression) in TypeScript so it can
            be hosted without a Python server. The complete Flask + scikit-learn reference implementation is included in
            the <code className="rounded bg-muted px-1 py-0.5 text-xs">/python</code> folder of the repository.
          </p>
        </Section>

        {/* Architecture */}
        <Section icon={Server} title="System Architecture">
          <pre className="border-border bg-muted/50 overflow-x-auto rounded-2xl border p-4 text-xs leading-relaxed sm:p-6 sm:text-sm">
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

        {/* Project workflow */}
        <Section icon={Workflow} title="Project Workflow">
          <ol className="grid gap-3 sm:grid-cols-2">
            {[
              "Dataset collection (Kaggle Fake and Real News Dataset).",
              "Data cleaning and labelling (REAL = 0, FAKE = 1).",
              "NLP preprocessing of the article text.",
              "TF-IDF feature extraction.",
              "Train / test split (80:20, stratified).",
              "Model training with Logistic Regression, Naive Bayes and Random Forest.",
              "Evaluation and best-model selection.",
              "Model and vectorizer saved with joblib.",
              "Flask API loads the model and exposes a prediction endpoint.",
              "Frontend sends user text and renders the label with confidence.",
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Modules */}
        <Section icon={Boxes} title="Modules">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map(([name, desc]) => (
              <div key={name} className="rounded-2xl border bg-card p-5">
                <p className="font-semibold">{name}</p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Learning Outcomes */}
        <Section icon={GraduationCap} title="Learning Outcomes">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningOutcomes.map((lo, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl border bg-card p-5">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <lo.icon className="size-5" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{lo.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Future Scope */}
        <Section icon={Rocket} title="Future Scope & Enhancements">
          <div className="grid gap-4 sm:grid-cols-2">
            {futureScope.map((f, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl border bg-card p-5">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Folder structure */}
        <Section icon={GitBranch} title="Folder Structure">
          <pre className="border-border bg-muted/50 overflow-x-auto rounded-2xl border p-4 text-xs leading-relaxed sm:p-6 sm:text-sm">
            {folders}
          </pre>
        </Section>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border bg-card p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">Ready to explore the detector?</h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-xl text-sm leading-relaxed">
            Paste any news headline or article and see the TF-IDF + Logistic Regression model classify it in real
            time, with confidence and influential words.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Zap className="size-4" /> Launch Detector
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4.5" />
        </div>
        <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
