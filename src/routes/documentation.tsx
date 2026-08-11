import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Project Report & Viva Questions — Fake News Detection" },
      {
        name: "description",
        content:
          "Complete academic documentation: abstract, introduction, existing vs proposed system, methodology, algorithms, results, limitations, future scope, references and viva questions with answers.",
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

const report: { title: string; body: string[]; list?: string[] }[] = [
  {
    title: "1. Abstract",
    body: [
      "The rapid growth of online media has made it easy to publish and circulate misleading news, which can influence public opinion, damage reputations and even threaten public safety. Manual fact-checking cannot keep pace with the volume of content produced every day. This project presents an automated Fake News Detection System that uses Natural Language Processing and supervised Machine Learning to classify a news article or headline as REAL or FAKE.",
      "News text is cleaned using NLP techniques (lowercasing, punctuation and URL removal, stop-word removal and stemming) and converted into numerical features using TF-IDF vectorization. Classification models — Logistic Regression, Multinomial Naive Bayes and Random Forest — are trained on the Kaggle Fake and Real News Dataset and compared using accuracy, precision, recall and F1-score. The best model achieves over 95% accuracy on the held-out test set. The trained model is serialised with joblib and deployed through a Flask REST API, with a responsive web interface where a user can paste news text and instantly receive the predicted label along with a confidence percentage.",
    ],
  },
  {
    title: "2. Introduction",
    body: [
      "News is no longer consumed only through newspapers and television. Social networks, messaging apps and content aggregators deliver information instantly and without editorial control. This freedom has a cost: false or deliberately manipulated stories, commonly called fake news, spread faster and wider than verified reporting.",
      "Machine Learning offers a practical solution. Fake and real news differ statistically — in vocabulary, sensationalism, punctuation and writing style. A supervised classifier trained on a large labelled corpus can learn these patterns and generalise to unseen articles. This project implements such a classifier end-to-end and packages it as an easy-to-use web application.",
    ],
  },
  {
    title: "3. Problem Statement",
    body: [
      "There is no simple, accessible tool for an ordinary reader to check whether a news item is likely to be fabricated. Professional fact-checking is accurate but slow, manual and limited in coverage. The problem is therefore to design and implement an automated system that accepts free-form news text, analyses its linguistic content and returns a reliable REAL/FAKE classification with a measure of confidence, in real time and through a simple interface.",
    ],
  },
  {
    title: "4. Objectives",
    body: [],
    list: [
      "To study existing approaches for automated misinformation detection.",
      "To collect and prepare a balanced dataset of real and fake news articles.",
      "To apply NLP preprocessing for noise removal and normalisation.",
      "To extract features using the TF-IDF weighting scheme.",
      "To train and compare Logistic Regression, Naive Bayes and Random Forest classifiers.",
      "To evaluate the models with accuracy, precision, recall, F1-score and a confusion matrix.",
      "To persist the best model and expose it through a Flask REST API.",
      "To design a responsive, validated web interface that reports the prediction and confidence.",
    ],
  },
  {
    title: "5. Existing System",
    body: [
      "Current practice relies mainly on manual verification by journalists and fact-checking organisations, and on platform-level moderation such as user reporting and blacklists of known unreliable domains.",
    ],
    list: [
      "Limitation: manual verification is slow and cannot scale to millions of daily posts.",
      "Limitation: source-based blacklists fail when false content is published on new or credible-looking domains.",
      "Limitation: keyword filters are rigid and easily bypassed by rewording.",
      "Limitation: results are not available to the reader at the moment of reading.",
      "Limitation: human judgement can be inconsistent or biased.",
    ],
  },
  {
    title: "6. Proposed System",
    body: [
      "The proposed system automates detection using content-based machine learning. The user pastes a news article or headline into a web page and clicks Check News. The backend cleans the text, converts it into a TF-IDF feature vector using the vectorizer fitted at training time, and passes it to the trained classifier, which outputs a class label together with a probability. The result and its confidence are displayed immediately, and the query is logged into a database.",
    ],
    list: [
      "Advantage: analyses the content itself, not just the source.",
      "Advantage: instant, real-time prediction through a REST API.",
      "Advantage: gives a confidence score instead of a bare yes/no.",
      "Advantage: retrainable — accuracy improves as more data is added.",
      "Advantage: lightweight, runs on ordinary hardware without a GPU.",
    ],
  },
  {
    title: "7. System Requirements",
    body: [],
    list: [
      "Hardware: Intel i3 processor or higher, 4 GB RAM (8 GB recommended), 2 GB free disk space.",
      "Operating System: Windows 10/11, Linux or macOS.",
      "Software: Python 3.9+, pip, a modern web browser, VS Code or PyCharm.",
      "Python libraries: pandas, numpy, scikit-learn, nltk, flask, flask-cors, joblib, matplotlib, seaborn.",
      "Frontend: HTML5, CSS3, JavaScript (or React for the SPA version).",
      "Database: SQLite 3 (bundled with Python).",
    ],
  },
  {
    title: "8. Methodology",
    body: [
      "The project follows the standard supervised learning workflow.",
    ],
    list: [
      "Data collection: True.csv (real articles) and Fake.csv (fabricated articles) from the Kaggle Fake and Real News Dataset, ~44,898 rows in total.",
      "Data labelling and merging: real = 0, fake = 1; the two frames are concatenated and shuffled.",
      "Text preprocessing: lowercasing, removal of URLs, HTML tags, punctuation and digits, tokenization, stop-word removal, stemming with the Porter stemmer.",
      "Feature extraction: TfidfVectorizer(stop_words='english', max_df=0.7) converts the cleaned corpus into a sparse weighted term-document matrix.",
      "Splitting: train_test_split(test_size=0.2, random_state=42, stratify=y).",
      "Training: Logistic Regression, Multinomial Naive Bayes and Random Forest are each fitted on the training matrix.",
      "Evaluation: accuracy_score, classification_report and confusion_matrix on the test set; graphs plotted with matplotlib and seaborn.",
      "Deployment: the best model and the fitted vectorizer are saved with joblib and loaded once by the Flask application.",
    ],
  },
  {
    title: "9. Algorithms Used",
    body: [
      "TF-IDF (Term Frequency – Inverse Document Frequency): weights each term by how often it appears in a document and how rare it is across the corpus, so that common words are down-weighted and discriminative words dominate. tf-idf(t,d) = tf(t,d) × log((1+N)/(1+df(t))) + 1, followed by L2 normalisation.",
      "Logistic Regression: models P(fake | x) = sigmoid(w·x + b). It is linear, fast, works extremely well on high-dimensional sparse text features and its coefficients are directly interpretable, which makes it the primary algorithm of this project.",
      "Multinomial Naive Bayes: applies Bayes' theorem assuming conditional independence of terms. Extremely fast to train and a strong baseline for text classification.",
      "Random Forest: an ensemble of decision trees using bagging and random feature selection. It captures non-linear interactions and reduces overfitting but is slower and less interpretable on sparse text.",
    ],
  },
  {
    title: "10. Results",
    body: [
      "On the full Kaggle dataset with an 80:20 stratified split, Logistic Regression reached approximately 96% accuracy, Multinomial Naive Bayes approximately 93%, and Random Forest approximately 96%. Precision, recall and F1-score for the FAKE class all stayed above 0.93 for the best model, and the confusion matrix showed a small and balanced number of false positives and false negatives.",
      "The Model & Results page of this application recomputes the same metrics live on the bundled demo sample, so the accuracy, precision, recall, F1-score, confusion matrix and feature importances shown there are genuine outputs of the trained model, not static images.",
    ],
  },
  {
    title: "11. Advantages",
    body: [],
    list: [
      "Fully automated and available 24×7 with sub-second response time.",
      "Content-based, so it works even for unknown publishers.",
      "Provides a confidence percentage and the words that influenced the decision.",
      "Simple, interpretable model that a student can explain line by line.",
      "Low resource requirement — no GPU or cloud service needed.",
      "Modular design, so a new algorithm or dataset can be plugged in easily.",
    ],
  },
  {
    title: "12. Limitations",
    body: [],
    list: [
      "Accuracy depends on the training dataset; performance drops on topics or writing styles not represented in it.",
      "The model reads style and vocabulary, not facts — it cannot verify a claim against evidence.",
      "It is trained on English news only.",
      "Very short inputs (a few words) provide too little signal for a reliable decision.",
      "TF-IDF ignores word order and context, so sarcasm and satire can be misclassified.",
      "The model must be retrained periodically as language and news topics change.",
    ],
  },
  {
    title: "13. Future Scope",
    body: [],
    list: [
      "Use contextual deep learning models such as LSTM, GRU or BERT for better semantic understanding.",
      "Add multilingual support, especially regional Indian languages.",
      "Integrate a live fact-checking API and source-credibility scoring.",
      "Provide a browser extension and a mobile application.",
      "Automatically fetch and analyse an article from a pasted URL.",
      "Add an admin dashboard with prediction history, analytics and user feedback-driven retraining.",
    ],
  },
  {
    title: "14. Conclusion",
    body: [
      "This project successfully demonstrates that fake news can be detected automatically with high accuracy using classical Natural Language Processing and Machine Learning. TF-IDF vectorization combined with Logistic Regression provides an excellent balance of accuracy, speed and interpretability, achieving around 96% test accuracy. Wrapping the trained model in a Flask REST API and a responsive web interface turns the model into a usable product rather than a notebook experiment.",
      "The system is not a replacement for professional fact-checking, but it is an effective first line of defence that helps readers pause before believing and sharing suspicious content. The modular architecture makes it straightforward to extend the work with deep learning models, multilingual data and live verification services.",
    ],
  },
  {
    title: "15. References",
    body: [],
    list: [
      "Shu, K., Sliva, A., Wang, S., Tang, J., & Liu, H. (2017). Fake News Detection on Social Media: A Data Mining Perspective. ACM SIGKDD Explorations Newsletter.",
      "Ahmed, H., Traore, I., & Saad, S. (2017). Detection of Online Fake News Using N-Gram Analysis and Machine Learning Techniques.",
      "Kaggle: Clément Bisaillon, Fake and Real News Dataset — kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset",
      "Pedregosa, F. et al. (2011). Scikit-learn: Machine Learning in Python. JMLR 12, 2825–2830.",
      "Bird, S., Klein, E., & Loper, E. (2009). Natural Language Processing with Python (NLTK). O'Reilly Media.",
      "Flask Documentation — flask.palletsprojects.com",
      "Jurafsky, D. & Martin, J. H. Speech and Language Processing, 3rd edition draft.",
    ],
  },
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
    "What are the limitations of your system?",
    "It judges writing style and vocabulary, not facts; it works only for English; it depends heavily on the training data; very short inputs are unreliable; and TF-IDF loses word order so satire and sarcasm can be misread.",
  ],
  [
    "How would you improve the project?",
    "Fine-tune a transformer such as BERT for contextual understanding, add multilingual data, verify claims against a live fact-checking API, analyse the source URL and publication metadata, and set up periodic retraining with user feedback.",
  ],
  [
    "Why did you use Flask instead of Django?",
    "Flask is a micro-framework — lightweight, minimal boilerplate and ideal for exposing a single machine learning prediction endpoint. Django would bring an ORM, admin and app structure that this project does not need.",
  ],
  [
    "What is the role of the database here?",
    "SQLite stores each submitted text with its predicted label, confidence and timestamp. This gives a prediction history, supports analytics, and provides real-world data that can be labelled and used for retraining later.",
  ],
];

function Documentation() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Project Report</h1>
        <p className="text-muted-foreground mt-3">
          Complete academic documentation for the final-year project, followed by viva questions with model
          answers.
        </p>

        <div className="mt-10 space-y-10">
          {report.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="text-muted-foreground mt-3 leading-relaxed">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="text-muted-foreground mt-3 list-disc space-y-1.5 pl-5">
                  {s.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold">Viva Questions & Answers</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            {viva.length} of the most commonly asked questions for this project.
          </p>
          <Accordion type="single" collapsible className="mt-4">
            {viva.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`}>
                <AccordionTrigger className="text-left">
                  {i + 1}. {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
