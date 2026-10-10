/**
 * FitFox — early-access waitlist → Google Sheet
 *
 * Setup (5 min): see README.md → "Early-access lijst in Google Sheets".
 * 1. Create a Google Sheet, open Extensions → Apps Script, paste this file.
 * 2. Change SECRET below to a long random string (same value as WAITLIST_SECRET on Vercel).
 * 3. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone → Deploy.
 * 4. Copy the Web app URL into WAITLIST_SHEET_URL on Vercel.
 */

const SECRET = "CHANGE-ME-to-a-long-random-string";
const SHEET_NAME = "Waitlist";
// Column headers chosen so Mailchimp's CSV import maps them automatically.
const HEADERS = ["Email Address", "Signup Date", "Source", "Consent", "Tags"];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (data.secret !== SECRET) return json({ ok: false, error: "unauthorized" });

    const email = String(data.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return json({ ok: false, error: "invalid_email" });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getSheet();
      // Skip duplicates so the list stays clean for import.
      const last = sheet.getLastRow();
      if (last > 1) {
        const existing = sheet.getRange(2, 1, last - 1, 1).getValues().flat().map(String);
        if (existing.indexOf(email) !== -1) return json({ ok: true, duplicate: true });
      }
      sheet.appendRow([
        email,
        new Date(),
        String(data.source || "website").slice(0, 60),
        String(data.consent || "").slice(0, 200),
        "early-access",
      ]);
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: "server_error" });
  }
}

function doGet() {
  return json({ ok: true, service: "fitfox-waitlist" });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
