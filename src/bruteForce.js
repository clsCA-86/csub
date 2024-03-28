const { fetchUrl } = require('./httpRequest');

// List of common subdomain prefixes
const commonPrefixes = ['www', 'mail', 'ftp', 'api', 'blog', 'test', 'dev'];

/**
 * Checks if the constructed subdomain URL is valid by making an HTTP request.
 * @param {string} subdomain - The constructed subdomain to check.
 * @returns {Promise<boolean>} - A promise that resolves with true if the subdomain is valid, false otherwise.
 */
async function isSubdomainValid(subdomain) {
    try {
        await fetchUrl(`http://${subdomain}`);
        console.log(`Subdomain ${subdomain} is valid.`);
        return true;
    } catch (error) {
        console.error(`Failed to validate subdomain ${subdomain}:`, error.toString());
        return false;
    }
}

/**
 * Implements brute-forcing logic to discover valid subdomains.
 * @param {string} domain - The target domain.
 * @returns {Promise<string[]>} - A promise that resolves with a list of found subdomains.
 */
async function bruteForceSubdomains(domain) {
    const foundSubdomains = [];
    for (const prefix of commonPrefixes) {
        const subdomain = `${prefix}.${domain}`;
        console.log(`Checking ${subdomain}...`);
        if (await isSubdomainValid(subdomain)) {
            console.log(`Found valid subdomain: ${subdomain}`);
            foundSubdomains.push(subdomain);
        }
    }
    return foundSubdomains;
}

module.exports = { bruteForceSubdomains };