import { NOTION_TOKEN, NOTION_DATABASE_ID } from "./config.js";

function getErrorMessage(payload) {
  if (!payload || typeof payload !== "object") {
    return "Unknown Notion API error.";
  }
  if (payload.message && payload.code) {
    return `${payload.message} (${payload.code})`;
  }
  return payload.message || "Unknown Notion API error.";
}

export async function saveToNotion({ url, impression, savedOn }) {
  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    throw new Error("Missing NOTION_TOKEN or NOTION_DATABASE_ID in config.js.");
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [
            {
              type: "text",
              text: { content: url }
            }
          ]
        },
        URL: { url },
        Impression: {
          rich_text: [
            {
              type: "text",
              text: { content: impression }
            }
          ]
        },
        "Saved on": {
          date: { start: savedOn }
        }
      }
    })
  });

  if (!response.ok) {
    let errorPayload = null;
    try {
      errorPayload = await response.json();
    } catch {
      throw new Error(`Notion request failed (${response.status}).`);
    }
    throw new Error(getErrorMessage(errorPayload));
  }

  return response.json();
}
