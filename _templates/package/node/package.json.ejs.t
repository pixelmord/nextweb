---
to: "<%= h.src() %>/packages/<%= name %>/package.json"
---
{
  "name": "<%= name %>",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "source": "./src/index.ts",
  "types": "./dist/index.d.ts",
  "files": [
    "dist/**"
  ],
  "scripts": {
    "build": "tsc",
    "clean": "rm -rf dist",
    "dev": "tsc -w",
    "lint": "TIMING=1 eslint \"src/**/*.ts*\"",
    "test": "jest"
  },
  "devDependencies": {
    "@types/jest": "^29.2.5",
    "@types/node": "^18.11.9",
    "@types/eslint": "^8.4.10",
    "eslint": "^8.31.0",
    "eslint-config-custom": "workspace:*",
    "tsconfig": "workspace:*",
    "typescript": "^4.9.4"
  }
}
