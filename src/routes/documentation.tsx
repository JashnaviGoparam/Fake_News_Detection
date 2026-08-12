import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  FlaskConical,
  Globe,
  GraduationCap,
  Layers,
  LayoutTemplate,
  Lightbulb,
  LineChart,
  ListChecks,
  Monitor,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Project Report & Viva Questions — Fake News Detection" },
      {
        name: "description",
        content:
          "Complete academic documentation: abstract, introduction, existing vs proposed system, methodology, algorithms, results, advantages, future scope, references, screenshots and viva questions with answers.",
      },
      { property: "og:title", content: "Project Report & Viva Questions — Fake News Detection" },
      {
        property: "og:description",
        content: "Full academic report content and viva preparation for the Fake News Detection ML project.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Documentation,
});

const objectives = [
  { icon: Search, text: "Study existing approaches for automated misinformation detection." },
  { icon: Database, text: "Collect and prepare a balanced dataset of real and fake news articles." },
  { icon: Workflow, text: "Apply NLP preprocessing for noise removal and normalisation." },
  { icon: FlaskConical, text: "Extract features using the TF-IDF weighting scheme." },
  { icon: Brain, text: "Train and compare Logistic Regression, Naive Bayes and Random Forest classifiers." },
  { icon: LineChart, text: "Evaluate models with accuracy, precision, recall, F1-score and a confusion matrix." },
  { icon: Server, text: "Persist the best model and expose it through a Flask REST API." },
  { icon: LayoutTemplate, text: "Design a responsive, validated web interface that reports the prediction and confidence." },
];

const requirements = [
  { icon: Cpu, title: "Hardware", text: "Intel i3 or higher, 4 GB RAM (8 GB recommended), 2 GB free disk space." },
  { icon: Monitor, title: "Operating System", text: "Windows 10/11, Linux or macOS with a modern browser." },
  { icon: Terminal, title: "Development Tools", text: "Python 3.9+, pip, VS Code / PyCharm, Git." },
  { icon: FlaskConical, title: "Python Libraries", text: "pandas, numpy, scikit-learn, nltk, flask, flask-cors, joblib, matplotlib, seaborn." },
  { icon: Globe, title: "Frontend Stack", text: "HTML5, CSS3, JavaScript / React for the interactive demo." },
  { icon: Database, title: "Database", text: "SQLite 3 (bundled with Python) for prediction logging." },
];

const methodology = [
  { step: "01", title: "Data Collection", text: "True.csv and Fake.csv from the Kaggle Fake and Real News Dataset, ~44,898 rows in total." },
  { step: "02", title: "Labelling & Merging", text: "real = 0, fake = 1; the two frames are concatenated and shuffled for unbiased training." },
  { step: "03", title: "Text Preprocessing", text: "Lowercasing, URL/HTML/punctuation/digit removal, tokenization, stop-word removal and Porter stemming." },
  { step: "04", title: "Feature Extraction", text: "TfidfVectorizer(stop_words='english', max_df=0.7) builds a sparse weighted term-document matrix." },
  { step: "05", title: "Train-Test Split", text: "80% training / 20% testing with stratify=y and random_state=42 for reproducibility." },
  { step: "06", title: "Model Training", text: "Logistic Regression, Multinomial Naive Bayes and Random Forest are fitted on the training matrix." },
  { step: "07", title: "Evaluation", text: "accuracy_score, classification_report and confusion_matrix; graphs plotted with matplotlib and seaborn." },
  { step: "08", title: "Deployment", text: "The best model and fitted vectorizer are saved with joblib and loaded once by the Flask application." },
];

const algorithms = [
  {
    icon: Search,
    title: "TF-IDF Vectorization",
    text: "Weights each term by its frequency in a document and rarity across the corpus. Common words are down-weighted while discriminative words dominate, producing a high-dimensional sparse feature matrix ideal for text classification.",
  },
  {
    icon: LineChart,
    title: "Logistic Regression",
    text: "Models P(fake | x) = sigmoid(w·x + b). It is linear, fast, interpretable and works extremely well on sparse TF-IDF features, making it the primary classifier of this project.",
  },
  {
    icon: Zap,
    title: "Multinomial Naive Bayes",
    text: "Applies Bayes' theorem with a conditional independence assumption. Extremely fast to train and a strong baseline for text classification tasks.",
  },
  {
    icon: Layers,
    title: "Random Forest",
    text: "An ensemble of decision trees using bagging and random feature selection. It captures non-linear interactions and reduces overfitting while serving as a comparison model.",
  },
];

const advantages = [
  { icon: ShieldCheck, title: "Fully Automated", text: "Available 24×7 with sub-second response time and no manual intervention." },
  { icon: Search, title: "Content-Based", text: "Analyses the article text itself, so it works even for unknown publishers." },
  { icon: Lightbulb, title: "Explainable", text: "Returns a confidence percentage and highlights the words that influenced the decision." },
  { icon: BookOpen, title: "Student Friendly", text: "Simple, interpretable model that a student can explain line by line during a viva." },
  { icon: Cpu, title: "Lightweight", text: "Runs on ordinary hardware without a GPU or paid cloud service." },
  { icon: Workflow, title: "Modular", text: "Clean separation of preprocessing, feature extraction, training and deployment." },
];

const futureScope = [
  { icon: Brain, text: "Fine-tune contextual deep learning models such as LSTM, GRU or BERT for richer semantic understanding." },
  { icon: Globe, text: "Add multilingual support, especially regional Indian languages, to broaden usability." },
  { icon: ShieldCheck, text: "Integrate live fact-checking APIs and source-credibility scoring for layered verification." },
  { icon: Monitor, text: "Provide a browser extension and a mobile application for instant on-the-go checks." },
  { icon: Workflow, text: "Automatically fetch and analyse an article from a pasted URL." },
  { icon: LineChart, text: "Add an admin dashboard with prediction history, analytics and feedback-driven retraining." },
];

const learningOutcomes = [
  { icon: Database, text: "Hands-on experience with real-world text dataset collection, cleaning and labelling." },
  { icon: FlaskConical, text: "Practical understanding of TF-IDF feature extraction and sparse matrix representation." },
  { icon: Brain, text: "Training, comparing and evaluating multiple supervised classifiers using scikit-learn." },
  { icon: LineChart, text: "Interpreting accuracy, precision, recall, F1-score and confusion matrices." },
  { icon: Server, text: "Deploying a trained ML model through a Flask REST API with input validation." },
  { icon: LayoutTemplate, text: "Building a responsive frontend that consumes an ML endpoint and visualises results." },
];

const screenshots = [
  { title: "Home / Detector", desc: "A clean, centred textarea with sample inputs, validation and a prominent Check News button." },
  { title: "Prediction Result Card", desc: "Displays REAL or FAKE label, confidence bar, P(fake) score and the most influential words." },
  { title: "Model & Results Page", desc: "Live metrics, algorithm comparison chart, confusion matrix and top TF-IDF feature weights." },
  { title: "About Project Page", desc: "Architecture diagram, technology stack, modules and folder structure for academic review." },
  { title: "Project Report Page", desc: "Full academic documentation with accordion-style viva questions and answers." },
  { title: "Flask Reference API", desc: "Python backend exposing POST /api/predict and GET /api/history with SQLite logging." },
];

const references = [
  "Shu, K., Sliva, A., Wang, S., Tang, J., & Liu, H. (2017). Fake News Detection on Social Media: A Data Mining Perspective. ACM SIGKDD Explorations Newsletter.",
  "Ahmed, H., Traore, I., & Saad, S. (2017). Detection of Online Fake News Using N-Gram Analysis and Machine Learning Techniques.",
  "Kaggle: Clément Bisaillon, Fake and Real News Dataset — kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset",
  "Pedregosa, F. et al. (2011). Scikit-learn: Machine Learning in Python. JMLR 12, 2825–2830.",
  "Bird, S., Klein, E., & Loper, E. (2009). Natural Language Processing with Python (NLTK). O'Reilly Media.",
  "Flask Documentation — flask.palletsprojects.com",
  "Jurafsky, D. & Martin, J. H. Speech and Language Processing, 3rd edition draft.",
];

const viva: [string, string][] = [
  [
    "What is fake news detection?",
    "It is the task of automatically classifying a news article or headline as genuine or fabricated by analysing its textual content with NLP and machine learning, instead of verifying it manually.",
  ],
  [
    "Why did you choose TF-IDF instead of simple word counts?",
    "A plain Bag-of-Words count gives high importance to frequently occurring words. TF-IDF multiplies term frequency by inverse document frequency, so words that appear in almost every document get a low weight while rare, discriminative words get a high weight. This improves accuracy noticeably on text classification.",
  ],
  [
    "Explain the TF-IDF formula.",
    "tf(t,d) is how many times term t occurs in document d. idf(t) = log((1 + N) / (1 + df(t))) + 1, where N is the number of documents and df(t) the number of documents containing t. tf-idf = tf × idf, and each document vector is then L2 normalised so that document length does not bias the result.",
  ],
  [
    "Why Logistic Regression and not a neural network?",
    "Text data after TF-IDF is very high-dimensional and sparse, which is exactly where linear models excel. Logistic Regression trains in seconds, needs no GPU, gives calibrated probabilities through predict_proba, and its coefficients can be inspected to explain a prediction. A neural network would add complexity without a meaningful accuracy gain on this dataset.",
  ],
  [
    "How does Logistic Regression actually classify?",
    "It computes z = w·x + b and passes it through the sigmoid function to get a probability between 0 and 1. If P(fake) ≥ 0.5 the article is labelled FAKE, otherwise REAL. The weights w are learned by minimising the log-loss (cross-entropy) using gradient descent with L2 regularisation.",
  ],
  [
    "What preprocessing steps did you apply and why?",
    "Lowercasing (so 'News' and 'news' are one token), removal of URLs, HTML tags, punctuation and digits (noise), tokenization, stop-word removal (words like 'the' and 'is' carry no class information) and stemming (so 'running', 'runs' and 'ran' map to one root). This reduces the vocabulary size and improves generalisation.",
  ],
  [
    "What dataset did you use?",
    "The Kaggle Fake and Real News Dataset, which contains True.csv with about 21,417 genuine articles from Reuters and Fake.csv with about 23,481 fabricated articles. Each row has a title, text, subject and date. We add a label column: 0 for real, 1 for fake.",
  ],
  [
    "Why an 80:20 split and what is random_state?",
    "80% of the data trains the model and 20% is held out to measure how well it generalises to unseen articles. random_state=42 fixes the random seed so the split — and therefore the reported results — can be reproduced exactly.",
  ],
  [
    "What is a confusion matrix?",
    "A 2×2 table of True Negatives, False Positives, False Negatives and True Positives. It shows not only how many predictions were wrong but what kind of mistake was made, which matters here because wrongly flagging real news is a different problem from missing fake news.",
  ],
  [
    "Define precision, recall and F1-score.",
    "Precision = TP / (TP + FP): of the articles predicted fake, how many really were fake. Recall = TP / (TP + FN): of all actually fake articles, how many we caught. F1 = 2·P·R / (P + R), the harmonic mean, used when we need one balanced number.",
  ],
  [
    "Why is accuracy alone not enough?",
    "If a dataset were 95% real news, a model that always predicts 'real' would score 95% accuracy while being useless. Precision, recall and F1 reveal that failure; accuracy alone hides it.",
  ],
  [
    "What is overfitting and how did you avoid it?",
    "Overfitting is when the model memorises the training data and fails on new data. We avoid it with a held-out test set, L2 regularisation in Logistic Regression, stop-word removal, and max_df=0.7 in the vectorizer to drop overly common terms.",
  ],
  [
    "What does max_df=0.7 mean?",
    "It tells TfidfVectorizer to ignore any term that appears in more than 70% of the documents, because such a term cannot help distinguish the two classes.",
  ],
  [
    "How is the trained model saved and reused?",
    "Both the fitted TfidfVectorizer and the trained classifier are serialised with joblib.dump into vectorizer.pkl and model.pkl. The Flask app loads them once at startup with joblib.load, so no retraining happens per request. It is essential to save the vectorizer too, since the same vocabulary and idf values must be applied to new text.",
  ],
  [
    "Explain the flow when a user clicks Check News.",
    "The frontend validates the input and sends a POST request with JSON {text: ...} to /api/predict. Flask validates it again, cleans the text, calls vectorizer.transform, then model.predict and model.predict_proba, stores the record in SQLite and returns JSON with the label and confidence. JavaScript then renders the result card.",
  ],
  [
    "Why is Naive Bayes called 'naive'?",
    "Because it assumes that all features (words) are conditionally independent given the class, which is clearly false for language. Despite this unrealistic assumption it performs surprisingly well and trains extremely fast on text.",
  ],
  [
    "What is the difference between Random Forest and Decision Tree?",
    "A decision tree is a single tree that easily overfits. A random forest builds many trees on bootstrapped samples with random feature subsets and averages their votes, which greatly reduces variance and improves generalisation.",
  ],
  [
    "Is this supervised or unsupervised learning?",
    "Supervised — every training article carries a known label (real or fake), and the model learns the mapping from text features to that label.",
  ],
  [
    "What are the future enhancements of your system?",
    "Fine-tuning transformers like BERT for contextual understanding, adding multilingual support, integrating live fact-checking APIs, analysing source URLs, building a browser extension and mobile app, and adding an admin dashboard with feedback-driven retraining.",
  ],
  [
    "Why did you use Flask instead of Django?",
    "Flask is a micro-framework — lightweight, minimal boilerplate and ideal for exposing a single machine learning prediction endpoint. Django would bring an ORM, admin and app structure that this project does not need.",
  ],
  [
    "What is the role of the database here?",
    "SQLite stores each submitted text with its predicted label, confidence and timestamp. This gives a prediction history, supports analytics, and provides real-world data that can be labelled and used for retraining later.",
  ],
  [
    "What makes this project suitable for a final-year AI/ML course?",
    "It covers the complete ML pipeline — data collection, NLP preprocessing, feature extraction, model training, evaluation, persistence, REST API deployment and a responsive frontend — while remaining interpretable and easy to demonstrate in a viva.",
  ],
];

function Documentation() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 sm:p-12">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4 gap-1.5">
              <GraduationCap className="size-3.5" />
              Final-Year AI/ML Project
            </Badge>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Fake News Detection Using Machine Learning
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
              Complete academic documentation, project report and viva preparation. This page covers the problem
              statement, methodology, algorithms, results, advantages, future scope, UI design, learning outcomes and
              commonly asked viva questions with model answers.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Sparkles className="size-4" /> Try the Live Detector
              </Link>
              <Link
                to="/model"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <LineChart className="size-4" /> View Model Results
              </Link>
            </div>
          </div>
        </div>

        {/* Abstract */}
        <Section icon={BookOpen} title="1. Abstract">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="leading-relaxed">
              The rapid growth of online media has made it easy to publish and circulate misleading news, which can
              influence public opinion, damage reputations and even threaten public safety. Manual fact-checking cannot
              keep pace with the volume of content produced every day. This project presents an automated{" "}
              <strong className="text-foreground">Fake News Detection System</strong> that uses Natural Language
              Processing and supervised Machine Learning to classify a news article or headline as REAL or FAKE.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              News text is cleaned using NLP techniques (lowercasing, punctuation and URL removal, stop-word removal and
              stemming) and converted into numerical features using TF-IDF vectorization. Classification models —
              Logistic Regression, Multinomial Naive Bayes and Random Forest — are trained on the Kaggle Fake and Real
              News Dataset and compared using accuracy, precision, recall and F1-score. The best model achieves over
              95% accuracy on the held-out test set. The trained model is serialised with joblib and deployed through a
              Flask REST API, with a responsive web interface where a user can paste news text and instantly receive
              the predicted label along with a confidence percentage.
            </p>
          </div>
        </Section>

        {/* Introduction */}
        <Section icon={Lightbulb} title="2. Introduction">
          <p className="text-muted-foreground leading-relaxed">
            News is no longer consumed only through newspapers and television. Social networks, messaging apps and
            content aggregators deliver information instantly and without editorial control. This freedom has a cost:
            false or deliberately manipulated stories, commonly called fake news, spread faster and wider than verified
            reporting.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Machine Learning offers a practical solution. Fake and real news differ statistically — in vocabulary,
            sensationalism, punctuation and writing style. A supervised classifier trained on a large labelled corpus
            can learn these patterns and generalise to unseen articles. This project implements such a classifier
            end-to-end and packages it as an easy-to-use web application.
          </p>
        </Section>

        {/* Problem Statement */}
        <Section icon={Target} title="3. Problem Statement">
          <div className="rounded-2xl border-l-4 border-l-primary bg-card p-6 shadow-sm">
            <p className="leading-relaxed">
              There is no simple, accessible tool for an ordinary reader to check whether a news item is likely to be
              fabricated. Professional fact-checking is accurate but slow, manual and limited in coverage. The problem is
              therefore to design and implement an automated system that accepts free-form news text, analyses its
              linguistic content and returns a reliable REAL/FAKE classification with a measure of confidence, in real
              time and through a simple interface.
            </p>
          </div>
        </Section>

        {/* Objectives */}
        <Section icon={ListChecks} title="4. Objectives">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {objectives.map((o, i) => (
              <div key={i} className="rounded-2xl border bg-card p-5 transition-colors hover:border-primary/30">
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <o.icon className="size-5" />
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{o.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Existing vs Proposed */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Section icon={Monitor} title="5. Existing System">
            <p className="text-muted-foreground leading-relaxed">
              Current practice relies mainly on manual verification by journalists and fact-checking organisations, and
              on platform-level moderation such as user reporting and blacklists of known unreliable domains.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Manual verification is slow and cannot scale to millions of daily posts.",
                "Source-based blacklists fail when false content is published on new or credible-looking domains.",
                "Keyword filters are rigid and easily bypassed by rewording.",
                "Results are not available to the reader at the moment of reading.",
                "Human judgement can be inconsistent or biased.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={Rocket} title="6. Proposed System">
            <p className="text-muted-foreground leading-relaxed">
              The proposed system automates detection using content-based machine learning. The user pastes a news
              article or headline into a web page and clicks <strong className="text-foreground">Check News</strong>.
              The backend cleans the text, converts it into a TF-IDF feature vector using the vectorizer fitted at
              training time, and passes it to the trained classifier, which outputs a class label together with a
              probability. The result and its confidence are displayed immediately, and the query is logged into a
              database.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Analyses the content itself, not just the source.",
                "Instant, real-time prediction through a REST API.",
                "Gives a confidence score instead of a bare yes/no.",
                "Retrainable — accuracy improves as more data is added.",
                "Lightweight, runs on ordinary hardware without a GPU.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* System Requirements */}
        <Section icon={Cpu} title="7. System Requirements">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {requirements.map((r) => (
              <div key={r.title} className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <r.icon className="size-4.5" />
                  </div>
                  <h3 className="font-semibold">{r.title}</h3>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Methodology */}
        <Section icon={Workflow} title="8. Methodology">
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The project follows the standard supervised learning workflow, from raw text to a deployed classifier.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((m) => (
              <div key={m.step} className="relative rounded-2xl border bg-card p-5">
                <span className="font-display text-3xl font-bold text-primary/20">{m.step}</span>
                <h3 className="mt-2 font-semibold">{m.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Algorithms */}
        <Section icon={Brain} title="9. Algorithms Used">
          <div className="grid gap-4 sm:grid-cols-2">
            {algorithms.map((a) => (
              <div key={a.title} className="rounded-2xl border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <a.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold">{a.title}</h3>
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Results */}
        <Section icon={Award} title="10. Results">
          <div className="rounded-2xl border bg-card p-6">
            <p className="leading-relaxed">
              On the full Kaggle dataset with an 80:20 stratified split,{" "}
              <strong className="text-foreground">Logistic Regression reached approximately 96% accuracy</strong>,
              Multinomial Naive Bayes approximately 93%, and Random Forest approximately 96%. Precision, recall and
              F1-score for the FAKE class all stayed above 0.93 for the best model, and the confusion matrix showed a
              small and balanced number of false positives and false negatives.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              The <Link to="/model" className="font-medium text-primary hover:underline">Model & Results</Link> page
              of this application recomputes the same metrics live on the bundled demo sample, so the accuracy,
              precision, recall, F1-score, confusion matrix and feature importances shown there are genuine outputs of
              the trained model, not static images.
            </p>
          </div>
        </Section>

        {/* Advantages */}
        <Section icon={Zap} title="11. Advantages">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a) => (
              <div key={a.title} className="rounded-2xl border bg-card p-5 transition-colors hover:border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-success/10 text-success">
                    <a.icon className="size-4.5" />
                  </div>
                  <h3 className="font-semibold">{a.title}</h3>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Future Scope */}
        <Section icon={Rocket} title="12. Future Scope & Enhancements">
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The current system is a strong, interpretable baseline. The following enhancements can extend its reach and
            accuracy even further:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Learning Outcomes */}
        <Section icon={GraduationCap} title="13. Learning Outcomes">
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

        {/* Screenshots & UI Design */}
        <Section icon={LayoutTemplate} title="14. Screenshots & UI Design">
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The user interface is designed to be clean, responsive and self-explanatory so that any visitor can use the
            detector without training. Key screens are described below.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((s, i) => (
              <div key={i} className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-bold text-primary/30">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-semibold">{s.title}</h3>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Conclusion */}
        <Section icon={CheckCircle2} title="15. Conclusion">
          <div className="rounded-2xl border border-success/30 bg-success/5 p-6">
            <p className="leading-relaxed">
              This project successfully demonstrates that fake news can be detected automatically with high accuracy
              using classical Natural Language Processing and Machine Learning. TF-IDF vectorization combined with
              Logistic Regression provides an excellent balance of accuracy, speed and interpretability, achieving
              around 96% test accuracy. Wrapping the trained model in a Flask REST API and a responsive web interface
              turns the model into a usable product rather than a notebook experiment.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              The system is designed as a first line of defence that helps readers pause before believing and sharing
              suspicious content. Its modular architecture makes it straightforward to extend the work with deep
              learning models, multilingual data and live verification services.
            </p>
          </div>
        </Section>

        {/* References */}
        <Section icon={BookOpen} title="16. References">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            {references.map((r) => (
              <li key={r} className="leading-relaxed">
                {r}
              </li>
            ))}
          </ol>
        </Section>

        {/* Viva */}
        <section className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Viva Questions & Answers</h2>
              <p className="text-muted-foreground text-sm">{viva.length} commonly asked questions with model answers.</p>
            </div>
          </div>
          <Accordion type="single" collapsible className="rounded-2xl border bg-card px-4">
            {viva.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline sm:text-base">
                  <span className="mr-2 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
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
