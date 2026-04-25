function getAuth() {
    if (_auth) return _auth;

    let credentials;

    // Prefer inline JSON (for Render/cloud deployments)
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON) {
        credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON);
    } else {
        // Fallback to file path (for local development)
        const keyPath = path.resolve(
            process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || './service-account.json'
        );
        if (!fs.existsSync(keyPath)) {
            throw new Error(
                `[DriveStore] Service account key not found at: ${keyPath}\n` +
                'Set GOOGLE_SERVICE_ACCOUNT_KEY_JSON or GOOGLE_SERVICE_ACCOUNT_KEY_PATH in your .env file.'
            );
        }
        credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    }

    _auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });

    return _auth;
}