// script.js — frontend logic: validation, API call, result rendering.

const textEl = document.getElementById("newsText");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("result");
const labelEl = document.getElementById("label");
const fillEl = document.getElementById("fill");
const confEl = document.getElementById("confidence");
const checkBtn = document.getElementById("checkBtn");
const clearBtn = document.getElementById("clearBtn");

const MIN_CHARS = 20;

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
}

function hideError() {
  errorEl.hidden = true;
}

textEl.addEventListener("input", () => {
  counter.textContent = `${textEl.value.length} characters`;
  hideError();
});

clearBtn.addEventListener("click", () => {
  textEl.value = "";
  counter.textContent = "0 characters";
  resultEl.hidden = true;
  hideError();
});

checkBtn.addEventListener("click", async () => {
  const text = textEl.value.trim();

  // ---- client side validation ----
  if (!text) return showError("Please enter a news headline or article before checking.");
  if (text.length < MIN_CHARS) return showError(`Please enter at least ${MIN_CHARS} characters.`);
  if (!/[a-zA-Z]/.test(text)) return showError("The text must contain readable words.");

  hideError();
  checkBtn.disabled = true;
  checkBtn.textContent = "Analyzing...";

  try {
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();

    if (!data.success) {
      showError(data.error || "Prediction failed. Please try again.");
      resultEl.hidden = true;
      return;
    }

    const isFake = data.prediction === 1;
    resultEl.hidden = false;
    resultEl.className = `card result ${isFake ? "fake" : "real"}`;
    labelEl.textContent = data.label;
    fillEl.style.width = `${data.confidence}%`;
    confEl.textContent = `Confidence: ${data.confidence}% · P(fake) = ${data.fake_probability}`;
  } catch (err) {
    showError("Could not reach the server. Please check that Flask is running.");
  } finally {
    checkBtn.disabled = false;
    checkBtn.textContent = "Check News";
  }
});
