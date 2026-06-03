# Wrote

> Wrote helps you remember why a link mattered not just that you saved it.

A minimal Chrome extension that captures the current page URL and your impressions about the page, and logs it instantly to a Notion database. 

![Wrote Icon](icon.png)

## Prerequisites

- Google Chrome browser
- A Notion account
- A Notion database with the properties listed below

## Setup

1. Clone or download this repo
2. Copy `config.example.js` to `config.js`
3. Fill in your values:
   - `NOTION_TOKEN` — from notion.so/my-integrations
   - `NOTION_DATABASE_ID` — from your Notion database URL
4. Ensure your Notion integration has access to the database (Database → ... → Connections)

## Required Notion Database Properties

Property names are case-sensitive and must match exactly:

| Property | Type |
|---|---|
| `Name` | Title |
| `URL` | URL |
| `Impression` | Rich text |
| `Saved on` | Date |

## Load in Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked** and select this project folder

## Manual Test Plan

1. Open any web page (`http` or `https`)
2. Click the Wrote extension icon in your toolbar
3. Confirm the URL field is auto-filled and read-only
4. Enter text in **My Impressions**
5. Click **Save to Notion**
6. Verify a new row appears in Notion with:
   - `Name`: page URL
   - `URL`: page URL
   - `Impression`: your text
   - `Saved on`: today's date in `YYYY-MM-DD`

## Security

Never commit your real `config.js` — it contains your Notion token and is listed in `.gitignore`. Share `config.example.js` instead.

## Built with

Vanilla JS · Chrome Extensions MV3 · Notion API · Cursor · Git

---

*More to come.*