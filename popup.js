import { saveToNotion } from "./notion.js";

const urlField = document.getElementById("urlField");
const impressionField = document.getElementById("impressionField");
const saveButton = document.getElementById("saveButton");
const statusEl = document.getElementById("status");

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#b42318" : "#1f1f1f";
}

function getLocalDateISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function populateCurrentTabUrl() {
  try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = activeTab?.url ?? "";
    urlField.value = url;
    if (!url) {
      setStatus("Could not read the current tab URL.", true);
    }
  } catch (error) {
    setStatus("Failed to access current tab URL.", true);
  }
}

async function handleSave() {
  const url = urlField.value.trim();
  const impression = impressionField.value.trim();

  if (!url) {
    setStatus("No page URL available to save.", true);
    return;
  }

  if (!impression) {
    setStatus("Please write an impression first.", true);
    return;
  }

  saveButton.disabled = true;
  setStatus("Saving to Notion...");

  try {
    await saveToNotion({
      url,
      impression,
      savedOn: getLocalDateISO()
    });
    setStatus("Saved to Notion.");
    impressionField.value = "";
  } catch (error) {
    setStatus(error.message || "Failed to save to Notion.", true);
  } finally {
    saveButton.disabled = false;
  }
}

saveButton.addEventListener("click", handleSave);
populateCurrentTabUrl();
