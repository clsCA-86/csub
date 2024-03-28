const { fetchUrl } = require('./src/httpRequest');

(async () => {
    try {
        const url = 'https://www.example.com'; // You can change this URL to any you'd like to test
        const content = await fetchUrl(url);
        console.log(`Content fetched from ${url}:`, content.substring(0, 100)); // Log the first 100 characters to avoid clutter
    } catch (error) {
        console.error('Error:', error.message);
    }
})();