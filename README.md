# csub

A powerful command-line tool for subdomain enumeration, csub is designed to uncover subdomains using various enumeration techniques, brute-forcing, and permutation generation. It aims to provide a comprehensive list of subdomains for a given domain without relying on a single data source.

## Overview

Built with Node.js and leveraging the Express framework for potential future web interfaces, csub operates primarily through the command line. It utilizes search engines, third-party services, and custom algorithms for brute-forcing and permutation generation to discover subdomains.

## Features

- Multiple enumeration engines including search engines and services like Netcraft and DNSDumpster.
- Brute-forcing capabilities to discover potential subdomains using common prefixes.
- Permutation generation for uncovering additional subdomain variations.
- Outputs discovered subdomains to the console and a plain text file for further analysis.

## Getting started

### Requirements

- Node.js
- npm (Node Package Manager)

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the cloned directory and run `npm install` to install the dependencies.
3. To start subdomain enumeration, run:
   ```
   node src/csub.js --domain example.com
   ```
   Replace `example.com` with the domain you wish to enumerate.

### License

Copyright (c) 2024.