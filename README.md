# Building a Vulnerable Node.js Application

## Introduction
This article provides a step-by-step guide on building a deliberately vulnerable Node.js application for educational purposes. The application is designed to help users learn how to test for vulnerabilities in CI/CD pipelines using tools like Snyk. The project includes intentional vulnerabilities that users can identify and remediate using CLI tools and dashboards.

## Prerequisites
Before starting, ensure you have the following installed on your machine:
- Node.js (https://nodejs.org/)
- `npm` (Node.js package manager)

## BitBucket

### Set Up Your Project
Create a new directory for your project
```bash
mkdir vulnerable-node-app
cd vulnerable-node-app
```

Initialize a new `Node.js` project and follow the prompts. This will create a package.json file.
```bash
npm init
```

### Install Dependencies
Install the required `Node.js` packages for your application
```bash
npm install express body-parser lodash
```

### Create Vulnerable Application
Create a new file named `app.js` in your project directory and add the following code. This will create a basic `Express.js` application with a vulnerable endpoint.
```json
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash'); // Vulnerable dependency

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Vulnerable endpoint with lodash vulnerable function
app.post('/vulnerable-endpoint', (req, res) => {
  const data = req.body;
  const sanitizedData = lodash.pick(data, ['username', 'email']); // Vulnerable usage of lodash

  // Process sanitized data (e.g., save to database)
  // ...

  res.status(200).json({ message: 'Data processed successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### Configure Vulnerable Package
Modify your `package.json` file to include your scripts and dependencies
```json
{
  "name": "vulnerable-node-app",
  "version": "1.0.0",
  "description": "A deliberately vulnerable Node.js application for educational purposes",
  "main": "app.js",
  "dependencies": {
    "express": "4.13.1",
    "body-parser": "1.19.0",
    "lodash": "4.17.5"
  },
  "scripts": {
    "start": "node app.js"
  },
  "author": "Your Name",
  "license": "MIT"
}
```

### Integrate with Bitbucket CI/CD
To test for vulnerabilities in CI/CD, integrate the application with Bitbucket Pipelines. Create a configuration file (e.g., `bitbucket-pipelines.yml`)

```yaml
image: node:14

pipelines:
  default:
    - step:
        name: Scan Dependencies
        script:
          - npm install # Install project dependencies
          - npm install -g snyk # Install Snyk globally
          - snyk test # Run Snyk test to scan for vulnerabilities
```
