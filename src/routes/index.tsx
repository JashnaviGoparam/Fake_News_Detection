import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, BadgeCheck, Loader2, RotateCcw, ShieldAlert, Sparkles } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getPipeline, predictNews, type Prediction } from "@/lib/ml";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VeriNews — Fake News Detection Using Machine Learning" },
      {
        name: "description",
        content:
          "Paste a news headline or article and an NLP + TF-IDF machine learning model predicts whether it is REAL or FAKE news, with a confidence score.",
      },
      { property: "og:title", content: "VeriNews — Fake News Detection Using Machine Learning" },
      {
        property: "og:description",
        content: "NLP + TF-IDF + Logistic Regression classifier that labels news text as REAL or FAKE.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Detector,
});

const SAMPLES = [
  "The finance ministry said the new tax framework will be implemented from the next fiscal year after consultation with state governments.",
  "SHOCKING!!! Doctors are furious — this one kitchen herb cures every disease in 3 days, share before it is deleted!",
];

const MIN_CHARS = 20;

function Detector() {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Prediction | null>(null);
  const pipeline = useMemo(() => getPipeline(), []);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  function handleCheck() {
    const value = text.trim();
    if (!value) return setError("Please enter a news headline or article before checking.");
    if (value.length < MIN_CHARS)
      return setError(`Please enter at least ${MIN_CHARS} characters so the model has enough context.`);
    if (!/[a-zA-Z]/.test(value)) return setError("The text must contain readable words, not only numbers or symbols.");

    setError(null);
    setBusy(true);
    setResult(null);
    // small delay so the loading state is visible, mirroring an API round-trip
    window.setTimeout(() => {
      try {
        setResult(predictNews(value));
      } catch {
        setError("Something went wrong while analysing the text. Please try again.");
      } finally {
        setBusy(false);
      }
    }, 350);
  }

  function reset() {
    setText("");
    setResult(null);
    setError(null);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 pt-14 pb-8 sm:px-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            <Sparkles className="size-3.5" /> NLP · TF-IDF · Logistic Regression
          </p>
          <h1 className="font-display mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
            Fake News Detection Using Machine Learning
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
            Paste a news headline or article below. The trained classifier cleans the text, converts it into
            TF-IDF features and predicts whether the content reads as <strong className="text-foreground">REAL</strong>{" "}
            or <strong className="text-foreground">FAKE</strong> news — along with a confidence score.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-border bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
            <label htmlFor="news-input" className="text-sm font-medium">
              News article or headline
            </label>
            <Textarea
              id="news-input"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Paste the news content here…"
              className="mt-2 min-h-56 resize-y text-base leading-relaxed"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "news-error" : undefined}
            />

            <div className="text-muted-foreground mt-2 flex flex-wrap justify-between gap-2 text-xs">
              <span>
                {words} words · {text.length} characters
              </span>
              <span>Minimum {MIN_CHARS} characters</span>
            </div>

            {error && (
              <p
                id="news-error"
                role="alert"
                className="text-destructive mt-3 flex items-start gap-2 text-sm font-medium"
              >
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                {error}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={handleCheck} disabled={busy} size="lg">
                {busy ? <Loader2 className="size-4 animate-spin" /> : <ShieldAlert className="size-4" />}
                {busy ? "Analyzing…" : "Check News"}
              </Button>
              <Button variant="outline" size="lg" onClick={reset} disabled={busy && !text}>
                <RotateCcw className="size-4" /> Clear
              </Button>
            </div>

            <div className="mt-5">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Try a sample</p>
              <div className="mt-2 flex flex-col gap-2">
                {SAMPLES.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setText(s);
                      setResult(null);
                      setError(null);
                    }}
                    className="border-border hover:bg-muted rounded-lg border px-3 py-2 text-left text-sm transition-colors"
                  >
                    {s.slice(0, 90)}…
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ResultCard result={result} busy={busy} />
            <div className="border-border bg-card rounded-2xl border p-5 text-sm">
              <h2 className="font-display text-base font-semibold">Live model snapshot</h2>
              <dl className="text-muted-foreground mt-3 space-y-2">
                <Row label="Algorithm" value="Logistic Regression" />
                <Row label="Features" value={`${pipeline.vocabSize} TF-IDF terms`} />
                <Row label="Training samples" value={String(pipeline.trainSize)} />
                <Row label="Test accuracy" value={`${(pipeline.test.accuracy * 100).toFixed(1)}%`} />
                <Row label="F1-score (fake)" value={pipeline.test.f1.toFixed(3)} />
              </dl>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border/60 flex justify-between gap-4 border-b pb-2 last:border-0 last:pb-0">
      <dt>{label}</dt>
      <dd className="text-foreground font-medium">{value}</dd>
    </div>
  );
}

function ResultCard({ result, busy }: { result: Prediction | null; busy: boolean }) {
  if (busy) {
    return (
      <div className="border-border bg-card text-muted-foreground grid min-h-56 place-items-center rounded-2xl border p-6 text-sm">
        <span className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" /> Running preprocessing → TF-IDF → prediction…
        </span>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="border-border bg-card text-muted-foreground grid min-h-56 place-items-center rounded-2xl border border-dashed p-6 text-center text-sm">
        The prediction, confidence score and the words that influenced the decision will appear here.
      </div>
    );
  }

  const fake = result.isFake;
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-sm",
        fake ? "border-destructive/40 bg-destructive/5" : "border-success/40 bg-success/5",
      )}
    >
      <div className="flex items-center gap-3">
        {fake ? (
          <ShieldAlert className="text-destructive size-7" />
        ) : (
          <BadgeCheck className="text-success size-7" />
        )}
        <div>
          <p className="text-muted-foreground text-xs tracking-wide uppercase">Prediction</p>
          <p className={cn("font-display text-2xl font-semibold", fake ? "text-destructive" : "text-success")}>
            {result.label}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-muted-foreground">Confidence</span>
          <span className="font-semibold">{(result.confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="bg-muted h-2.5 w-full overflow-hidden rounded-full">
          <div
            className={cn("h-full rounded-full transition-all", fake ? "bg-destructive" : "bg-success")}
            style={{ width: `${Math.round(result.confidence * 100)}%` }}
          />
        </div>
        <p className="text-muted-foreground mt-2 text-xs">
          P(fake) = {result.fakeProbability.toFixed(3)} · decision threshold 0.50 · {result.knownTokens} of{" "}
          {result.tokens} processed words were present in the model vocabulary.
        </p>
      </div>

      {result.lowSignal && (
        <p className="border-border text-muted-foreground mt-4 rounded-lg border border-dashed p-3 text-xs">
          Very few words of this text appear in the training vocabulary, so treat this prediction with caution.
          Longer text gives a more reliable result.
        </p>
      )}

      {result.influential.length > 0 && (
        <div className="mt-5">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Most influential words
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {result.influential.map((t) => (
              <span
                key={t.term}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs",
                  t.contribution > 0
                    ? "border-destructive/40 text-destructive"
                    : "border-success/40 text-success",
                )}
                title={`weight × tf-idf = ${t.contribution.toFixed(3)}`}
              >
                {t.term}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
