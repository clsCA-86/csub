const cheerio = require('cheerio');
const { fetchUrl } = require('./httpRequest');

const searchEngines = {
  google: 'https://www.google.com/search?q=site:',
  bing: 'https://www.bing.com/search?q=site:',
  yahoo: 'https://search.yahoo.com/search?p=site:',
};

async function fetchSubdomainsFromSearchEngine(domain, engineName) {
  const searchUrl = `${searchEngines[engineName]}${domain}`;
  console.log(`Querying ${engineName} for subdomains of: ${domain}`);
  try {
    const htmlContent = await fetchUrl(searchUrl);
    const $ = cheerio.load(htmlContent);
    const subdomains = new Set();

    $('a').each((i, link) => {
      const href = $(link).attr('href');
      if (href && href.includes(`.${domain}`)) {
        const url = new URL(href);
        const hostname = url.hostname;
        if (hostname.endsWith(domain)) {
          subdomains.add(hostname);
        }
      }
    });

    console.log(`Found ${subdomains.size} subdomains from ${engineName} for domain: ${domain}`);
    return Array.from(subdomains);
  } catch (error) {
    console.error(`Error fetching subdomains from ${engineName} for domain: ${domain}:`, error);
    return [];
  }
}

async function querySearchEngines(domain) {
  const engines = Object.keys(searchEngines);
  const promises = engines.map(engine => fetchSubdomainsFromSearchEngine(domain, engine));
  console.log(`Starting search engine queries for domain: ${domain}`);
  const results = await Promise.all(promises);
  const subdomains = new Set(results.flat());
  console.log(`Total unique subdomains found from all search engines for domain: ${domain}: ${subdomains.size}`);
  return Array.from(subdomains);
}

module.exports = { querySearchEngines };