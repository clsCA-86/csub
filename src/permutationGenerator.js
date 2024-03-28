const { fetchUrl } = require('./httpRequest');

/**
 * Generates permutations based on common variations for each subdomain.
 * @param {string} subdomain - A subdomain to generate permutations for.
 * @returns {string[]} An array of subdomain permutations.
 */
function generatePermutations(subdomain) {
    // Common permutation patterns can be expanded as needed
    const patterns = [
        subdomain => subdomain.replace('www', 'ww2'),
        subdomain => `${subdomain}-test`,
    ];

    return patterns.map(pattern => pattern(subdomain)).filter((value, index, self) => self.indexOf(value) === index);
}

/**
 * Tests each permutation to see if it resolves to a valid subdomain.
 * @param {string[]} subdomains - An array of subdomains to generate permutations for.
 * @returns {Promise<string[]>} A promise that resolves with an array of valid subdomain permutations.
 */
async function testPermutations(subdomains) {
    const permutations = subdomains.flatMap(generatePermutations);
    const validPermutations = [];

    for (const permutation of permutations) {
        try {
            await fetchUrl(`http://${permutation}`);
            console.log(`Valid permutation found: ${permutation}`);
            validPermutations.push(permutation);
        } catch (error) {
            console.log(`Permutation not valid: ${permutation}. Error: ${error.toString()}`);
        }
    }

    return validPermutations;
}


module.exports = { testPermutations };