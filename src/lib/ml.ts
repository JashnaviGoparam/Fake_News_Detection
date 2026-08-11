/**
 * Minimal, dependency-free re-implementation of the scikit-learn pipeline used
 * in /python/train_model.py:
 *
 *   TfidfVectorizer(stop_words='english', max_df=0.7)  ->  LogisticRegression()
 *
 * Everything here mirrors the Python maths so that the numbers shown in the UI
 * can be explained during a viva:
 *   tf-idf(t, d) = tf(t, d) * (ln((1 + n) / (1 + df(t))) + 1), then L2 normalised
 *   P(fake | x)  = sigmoid(w . x + b)
 */

import { DATASET, type Label, type NewsSample } from "./dataset";

/* ------------------------------------------------------------------ */
/* 1. NLP text preprocessing                                           */
/* ------------------------------------------------------------------ */

export const STOP_WORDS = new Set(
  `a about above after again against all am an and any are as at be because been before being below
  between both but by can cannot could did do does doing down during each few for from further had has
  have having he her here hers herself him himself his how i if in into is it its itself me more most my
  myself no nor not of off on once only or other ought our ours ourselves out over own same she should so
  some such than that the their theirs them themselves then there these they this those through to too
  under until up very was we were what when where which while who whom why will with would you your yours`
    .split(/\s+/)
    .filter(Boolean),
);

/** lowercase -> strip punctuation/digits/urls -> tokenise -> remove stop words -> light stemming */
export function preprocess(raw: string): string[] {
  return raw
    .toLowerCase()
    .replace(/https?:\/\/\S+|www\.\S+/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .map(stem);
}

/** Very small Porter-style suffix stripper (enough for a college project). */
export function stem(word: string): string {
  for (const suffix of ["ingly", "edly", "ing", "edly", "ies", "ied", "ers", "ed", "es", "ly", "s"]) {
    if (word.length > suffix.length + 2 && word.endsWith(suffix)) {
      return word.slice(0, word.length - suffix.length);
    }
  }
  return word;
}

/* ------------------------------------------------------------------ */
/* 2. TF-IDF vectorizer                                                */
/* ------------------------------------------------------------------ */

export interface Vectorizer {
  vocabulary: Map<string, number>;
  idf: Float64Array;
  features: string[];
}

export function fitVectorizer(docs: string[], minDf = 1, maxDfRatio = 0.7): Vectorizer {
  const df = new Map<string, number>();
  const tokenised = docs.map(preprocess);

  for (const tokens of tokenised) {
    for (const t of new Set(tokens)) df.set(t, (df.get(t) ?? 0) + 1);
  }

  const n = docs.length;
  const features: string[] = [];
  for (const [term, count] of df) {
    if (count >= minDf && count <= maxDfRatio * n) features.push(term);
  }
  features.sort();

  const vocabulary = new Map<string, number>();
  const idf = new Float64Array(features.length);
  features.forEach((term, i) => {
    vocabulary.set(term, i);
    idf[i] = Math.log((1 + n) / (1 + (df.get(term) ?? 0))) + 1; // smooth idf
  });

  return { vocabulary, idf, features };
}

export function transform(vec: Vectorizer, text: string): Float64Array {
  const x = new Float64Array(vec.features.length);
  for (const token of preprocess(text)) {
    const i = vec.vocabulary.get(token);
    if (i !== undefined) x[i] = (x[i] ?? 0) + 1;
  }
  for (let i = 0; i < x.length; i++) if (x[i]) x[i] = x[i]! * vec.idf[i]!;
  let norm = 0;
  for (let i = 0; i < x.length; i++) norm += x[i]! * x[i]!;
  norm = Math.sqrt(norm);
  if (norm > 0) for (let i = 0; i < x.length; i++) x[i] = x[i]! / norm;
  return x;
}

/* ------------------------------------------------------------------ */
/* 3. Logistic Regression (batch gradient descent + L2)                */
/* ------------------------------------------------------------------ */

export interface LogisticModel {
  weights: Float64Array;
  bias: number;
}

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

export function trainLogistic(
  X: Float64Array[],
  y: Label[],
  { epochs = 400, lr = 1.2, l2 = 0.0015 } = {},
): LogisticModel {
  const d = X[0]!.length;
  const weights = new Float64Array(d);
  let bias = 0;

  for (let epoch = 0; epoch < epochs; epoch++) {
    const grad = new Float64Array(d);
    let gradB = 0;
    for (let i = 0; i < X.length; i++) {
      const xi = X[i]!;
      let z = bias;
      for (let j = 0; j < d; j++) if (xi[j]) z += weights[j]! * xi[j]!;
      const err = sigmoid(z) - y[i]!;
      for (let j = 0; j < d; j++) if (xi[j]) grad[j] = grad[j]! + err * xi[j]!;
      gradB += err;
    }
    const m = X.length;
    for (let j = 0; j < d; j++) weights[j] = weights[j]! - lr * (grad[j]! / m + l2 * weights[j]!);
    bias -= lr * (gradB / m);
  }

  return { weights, bias };
}

export function predictProba(model: LogisticModel, x: Float64Array): number {
  let z = model.bias;
  for (let j = 0; j < x.length; j++) if (x[j]) z += model.weights[j]! * x[j]!;
  return sigmoid(z);
}

/* ------------------------------------------------------------------ */
/* 4. Evaluation metrics                                               */
/* ------------------------------------------------------------------ */

export interface Metrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  confusion: { tn: number; fp: number; fn: number; tp: number };
  support: number;
}

export function evaluate(yTrue: Label[], yPred: Label[]): Metrics {
  let tp = 0,
    tn = 0,
    fp = 0,
    fn = 0;
  yTrue.forEach((t, i) => {
    const p = yPred[i]!;
    if (t === 1 && p === 1) tp++;
    else if (t === 0 && p === 0) tn++;
    else if (t === 0 && p === 1) fp++;
    else fn++;
  });
  const precision = tp + fp === 0 ? 0 : tp / (tp + fp);
  const recall = tp + fn === 0 ? 0 : tp / (tp + fn);
  return {
    accuracy: (tp + tn) / Math.max(1, yTrue.length),
    precision,
    recall,
    f1: precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall),
    confusion: { tn, fp, fn, tp },
    support: yTrue.length,
  };
}

/* ------------------------------------------------------------------ */
/* 5. Trained pipeline (built once, cached)                            */
/* ------------------------------------------------------------------ */

export interface Pipeline {
  vectorizer: Vectorizer;
  model: LogisticModel;
  train: Metrics;
  test: Metrics;
  vocabSize: number;
  trainSize: number;
  testSize: number;
  topFake: { term: string; weight: number }[];
  topReal: { term: string; weight: number }[];
}

/** Deterministic pseudo random shuffle so results are reproducible (random_state=42). */
function seededShuffle<T>(items: T[], seed = 42): T[] {
  const out = [...items];
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

let cached: Pipeline | null = null;

export function getPipeline(data: NewsSample[] = DATASET): Pipeline {
  if (cached) return cached;

  const shuffled = seededShuffle(data);
  const cut = Math.floor(shuffled.length * 0.8);
  const trainSet = shuffled.slice(0, cut);
  const testSet = shuffled.slice(cut);

  const vectorizer = fitVectorizer(trainSet.map((s) => s.text));
  const Xtrain = trainSet.map((s) => transform(vectorizer, s.text));
  const ytrain = trainSet.map((s) => s.label);
  const model = trainLogistic(Xtrain, ytrain);

  const predict = (set: NewsSample[]) =>
    set.map((s) => (predictProba(model, transform(vectorizer, s.text)) >= 0.5 ? 1 : 0) as Label);

  const weighted = vectorizer.features
    .map((term, i) => ({ term, weight: model.weights[i] ?? 0 }))
    .sort((a, b) => b.weight - a.weight);

  cached = {
    vectorizer,
    model,
    train: evaluate(ytrain, predict(trainSet)),
    test: evaluate(
      testSet.map((s) => s.label),
      predict(testSet),
    ),
    vocabSize: vectorizer.features.length,
    trainSize: trainSet.length,
    testSize: testSet.length,
    topFake: weighted.slice(0, 12),
    topReal: weighted.slice(-12).reverse(),
  };
  return cached!;
}

/* ------------------------------------------------------------------ */
/* 6. Public prediction API                                            */
/* ------------------------------------------------------------------ */

export interface Prediction {
  label: "REAL NEWS" | "FAKE NEWS";
  isFake: boolean;
  confidence: number; // 0..1 confidence in the predicted class
  fakeProbability: number;
  tokens: number;
  knownTokens: number;
  lowSignal: boolean;
  influential: { term: string; contribution: number }[];
}

export function predictNews(text: string): Prediction {
  const { vectorizer, model } = getPipeline();
  const x = transform(vectorizer, text);
  const p = predictProba(model, x);

  const tokens = preprocess(text);
  const known = tokens.filter((t) => vectorizer.vocabulary.has(t));

  const influential = Array.from(new Set(known))
    .map((term) => {
      const i = vectorizer.vocabulary.get(term)!;
      return { term, contribution: (model.weights[i] ?? 0) * (x[i] ?? 0) };
    })
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    .slice(0, 6);

  const isFake = p >= 0.5;
  return {
    label: isFake ? "FAKE NEWS" : "REAL NEWS",
    isFake,
    confidence: isFake ? p : 1 - p,
    fakeProbability: p,
    tokens: tokens.length,
    knownTokens: known.length,
    lowSignal: known.length < 3,
    influential,
  };
}
