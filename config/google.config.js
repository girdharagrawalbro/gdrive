// ─── GOOGLE DRIVE AUTH CONFIG ─────────────────────────────────────────────────
// Uses a Service Account for server-to-server authentication.
// No user OAuth flow needed — just share the Drive folder with the SA email.
// ──────────────────────────────────────────────────────────────────────────────

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

let _auth = null;
let _drive = null;

/**
 * Returns a cached, authenticated Google Auth client.
 * Reads the service account JSON key from GOOGLE_SERVICE_ACCOUNT_KEY_PATH.
 */

function getAuth() {
    if (_auth) return _auth;

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    _auth = oauth2Client;
    return _auth;
}

/**
 * Returns a cached Google Drive v3 client.
 */
function getDrive() {
    if (_drive) return _drive;
    _drive = google.drive({ version: 'v3', auth: getAuth() });
    return _drive;
}

module.exports = { getAuth, getDrive };