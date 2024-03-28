const { program } = require('commander');
const fs = require('fs');
const { querySearchEngines } = require('./searchEngines');
const { bruteForceSubdomains } = require('./bruteForce');
const { testPermutations } = require('./permutationGenerator');

program
  .option('-d, --domain <type>', 'Target domain for subdomain enumeration');

program.parse(process.argv);

const options = program.opts();

if (!options.domain) {
  console.error('Specify a domain using the --domain option.');
  process.exit(1);
}

console.log(`Starting subdomain enumeration for: ${options.domain}`);

(async () => {
  try {
    console.log('Querying search engines for initial subdomains...');
    const searchEngineSubdomains = await querySearchEngines(options.domain);
    console.log(`Subdomains found by search engines: ${searchEngineSubdomains.length}`);

    console.log('Applying brute-force to discover additional subdomains...');
    const bruteForcedSubdomains = await bruteForceSubdomains(options.domain);
    console.log(`Subdomains found by brute-forcing: ${bruteForcedSubdomains.length}`);

    console.log('Generating and testing permutations of found subdomains...');
    const allFoundSubdomains = [...searchEngineSubdomains, ...bruteForcedSubdomains];
    const permutations = await testPermutations(allFoundSubdomains);
    console.log(`Subdomain permutations found: ${permutations.length}`);

    const uniqueSubdomains = Array.from(new Set([...allFoundSubdomains, ...permutations]));
    console.log(`Total unique subdomains found: ${uniqueSubdomains.length}`);

    uniqueSubdomains.forEach(subdomain => console.log(subdomain));

    const fileName = `${options.domain.replace(/\./g, '-')}-subdomains.txt`;
    fs.writeFileSync(fileName, uniqueSubdomains.join('\n'));
    console.log(`Subdomain enumeration complete. Results saved to ${fileName}`);
  } catch (error) {
    console.error(`An error occurred during subdomain enumeration: ${error.message}`);
  }
})();