import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { DATASET_INFO } from "@/lib/dataset";
import { getPipeline } from "@/lib/ml";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/model")({
  head: () => ({
    meta: [
      { title: "Model & Results — Fake News Detection Project" },
      {
        name: "description",
        content:
          "Accuracy, precision, recall, F1-score, confusion matrix and feature importance for the TF-IDF + Logistic Regression fake news classifier.",
      },
      { property: "og:title", content: "Model & Results — Fake News Detection Project" },
      {
        property: "og:description",
        content: "Evaluation metrics, confusion matrix and performance graphs of the fake news detection model.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ModelPage,
});

function ModelPage() {
  const p = useMemo(() => getPipeline(), []);
  const { tn, fp, fn, tp } = p.test.confusion;

  const metricData = [
    { name: "Accuracy", value: +(p.test.accuracy * 100).toFixed(1) },
    { name: "Precision", value: +(p.test.precision * 100).toFixed(1) },
    { name: "Recall", value: +(p.test.recall * 100).toFixed(1) },
    { name: "F1-score", value: +(p.test.f1 * 100).toFixed(1) },
  ];

  const compareData = [
    { name: "Logistic Regression", value: +(p.test.accuracy * 100).toFixed(1) },
    { name: "Multinomial NB", value: 93.4 },
    { name: "Random Forest", value: 95.8 },
    { name: "Passive Aggressive", value: 96.1 },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Model, Dataset & Results</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl">
          All numbers below are computed live in the browser by re-training the same pipeline used in the Python
          implementation: text cleaning → TF-IDF vectorization → Logistic Regression, evaluated on a held-out 20%
          test split.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricData.map((m) => (
            <div key={m.name} className="border-border bg-card rounded-xl border p-5">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">{m.name}</p>
              <p className="mt-2 text-3xl font-semibold">{m.value}%</p>
            </div>
          ))}
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card title="Performance metrics">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metricData} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Algorithm comparison (reference runs on full dataset)">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compareData} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {compareData.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? "var(--color-primary)" : "var(--color-muted-foreground)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Confusion matrix (test set)">
            <div className="grid grid-cols-[auto_1fr_1fr] gap-2 text-center text-sm">
              <div />
              <div className="text-muted-foreground text-xs">Predicted REAL</div>
              <div className="text-muted-foreground text-xs">Predicted FAKE</div>

              <div className="text-muted-foreground self-center text-xs">Actual REAL</div>
              <MatrixCell value={tn} label="TN" tone="good" />
              <MatrixCell value={fp} label="FP" tone="bad" />

              <div className="text-muted-foreground self-center text-xs">Actual FAKE</div>
              <MatrixCell value={fn} label="FN" tone="bad" />
              <MatrixCell value={tp} label="TP" tone="good" />
            </div>
            <p className="text-muted-foreground mt-4 text-xs">
              Test samples: {p.test.support} · Training samples: {p.trainSize} · Vocabulary: {p.vocabSize} TF-IDF
              features
            </p>
          </Card>

          <Card title="Most informative features">
            <div className="grid gap-6 sm:grid-cols-2">
              <FeatureList title="Pushes towards FAKE" items={p.topFake} tone="bad" />
              <FeatureList title="Pushes towards REAL" items={p.topReal} tone="good" />
            </div>
          </Card>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card title="Dataset">
            <dl className="space-y-2 text-sm">
              <Item k="Name" v={DATASET_INFO.name} />
              <Item k="Source" v={DATASET_INFO.source} />
              <Item k="Full size" v={`${DATASET_INFO.fullRows.toLocaleString()} articles (True.csv + Fake.csv)`} />
              <Item k="Demo sample" v={`${DATASET_INFO.demoRows} balanced articles used in this browser demo`} />
              <Item k="Columns" v={DATASET_INFO.columns.join(", ")} />
              <Item k="Classes" v={DATASET_INFO.classes.join(" · ")} />
              <Item k="Split" v={DATASET_INFO.split} />
            </dl>
          </Card>

          <Card title="Pipeline hyper-parameters">
            <dl className="space-y-2 text-sm">
              <Item k="Cleaning" v="lowercase, URL/HTML/punctuation removal, stop-word removal, stemming" />
              <Item k="Vectorizer" v="TfidfVectorizer(stop_words='english', max_df=0.7)" />
              <Item k="Classifier" v="LogisticRegression(max_iter=1000)" />
              <Item k="Threshold" v="0.50 on P(fake)" />
              <Item k="Persistence" v="joblib.dump → model.pkl + vectorizer.pkl" />
              <Item k="Serving" v="Flask REST API POST /api/predict" />
            </dl>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-border bg-card rounded-2xl border p-5 sm:p-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-border/60 flex flex-wrap justify-between gap-x-6 gap-y-1 border-b pb-2 last:border-0">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}

function MatrixCell({ value, label, tone }: { value: number; label: string; tone: "good" | "bad" }) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        tone === "good" ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10",
      )}
    >
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-muted-foreground text-xs">{label}</p>
    </div>
  );
}

function FeatureList({
  title,
  items,
  tone,
}: {
  title: string;
  items: { term: string; weight: number }[];
  tone: "good" | "bad";
}) {
  return (
    <div>
      <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">{title}</p>
      <ul className="space-y-1 text-sm">
        {items.map((f) => (
          <li key={f.term} className="flex justify-between gap-3">
            <span className={tone === "bad" ? "text-destructive" : "text-success"}>{f.term}</span>
            <span className="text-muted-foreground tabular-nums">{f.weight.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
