
const summarizeButton = document.getElementById("summarize");
const statusText = document.getElementById("status");
const results = document.getElementById("results");
const copyButton = document.getElementById("copySummary");

let currentSummary = "";

summarizeButton.addEventListener("click", async () => {
  summarizeButton.disabled = true;
  results.hidden = true;
  statusText.textContent = "Reading the page...";

  try {
    // Find the active browser tab.
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!tab?.id) {
      throw new Error("Could not find the active tab.");
    }

    // Extract the webpage text in the page's context.
    const injection = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => ({
        title: document.title || "Untitled page",
        text: document.body?.innerText || ""
      })
    });

    const page = injection[0]?.result;

    if (!page || page.text.trim().length < 80) {
      throw new Error(
        "Not enough readable text. Try opening a normal article."
      );
    }

    statusText.textContent = "Finding what matters...";

    // Send the webpage to the local FastAPI backend.
    const response = await fetch(
      "http://127.0.0.1:5000/summarize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: page.title,
          text: page.text.slice(0, 12000)
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const message = data.detail || data.error ||
        "Summary generation failed.";

      throw new Error(
        typeof message === "string"
          ? message
          : "Invalid request. Try another webpage."
      );
    }

    // Build the summary safely using textContent.
    document.getElementById("mainIdea").textContent =
      data.main_idea || "No main idea returned.";

    const list = document.getElementById("keyPoints");
    list.replaceChildren();

    const points = Array.isArray(data.key_points)
      ? data.key_points.slice(0, 5)
      : [];

    points.forEach((point) => {
      const item = document.createElement("li");
      item.textContent = String(point);
      list.appendChild(item);
    });

    document.getElementById("takeaway").textContent =
      data.takeaway || "No takeaway returned.";

    document.getElementById("timeSaved").textContent =
      "⏱ " + (data.reading_time_saved || "Estimate unavailable");

    // Save a plain-text version for the copy button.
    currentSummary = [
      "LazyRead-AI Summary",
      "",
      "THE BIG PICTURE",
      data.main_idea || "",
      "",
      "KEY POINTERS",
      ...points.map((point) => "• " + point),
      "",
      "REMEMBER THIS",
      data.takeaway || ""
    ].join("\n");

    results.hidden = false;
    statusText.textContent = "Here's what matters.";
  } catch (error) {
    statusText.textContent =
      error.message ||
      "Something went wrong. Check that Ollama and FastAPI are running.";
  } finally {
    summarizeButton.disabled = false;
  }
});

// Copy the generated summary.
copyButton.addEventListener("click", async () => {
  if (!currentSummary) return;

  try {
    await navigator.clipboard.writeText(currentSummary);
    copyButton.textContent = "Copied!";
  } catch {
    copyButton.textContent = "Copy failed";
  }

  setTimeout(() => {
    copyButton.textContent = "Copy summary";
  }, 1500);
});
