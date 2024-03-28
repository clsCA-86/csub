const axios = require('axios');

/**
 * Makes an HTTP GET request to a specified URL and returns the HTML content.
 * @param {string} url - The URL to request.
 * @returns {Promise<string>} A promise that resolves with the HTML content of the page.
 */
async function fetchUrl(url) {
    console.log(`Fetching URL: ${url}`);
    try {
        const response = await axios.get(url);
        console.log(`Successfully fetched URL: ${url}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching URL ${url}:`, error.toString());
        // Handling specific HTTP errors such as rate-limiting could go here
        // For now, we simply throw the error to be handled by the caller
        throw new Error(`Failed to fetch URL ${url}: ${error.toString()}`);
    }
}

module.exports = { fetchUrl };