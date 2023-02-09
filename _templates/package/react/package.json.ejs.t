---
to: "<%= h.src() %>/packages/<%= name %>/package.json"
---
{
  "name": "<%= name %>",
  "version": "0.0.0",
  "license": "MIT",
  "exports": {
    ".": "./dist",
    "./styles.css": "./dist/styles.css"
  },
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.tsx --format esm,cjs --dts --external react && tailwindcss -i ./src/styles.css -o ./dist/styles.css",
    "clean": "rm -rf dist",
    "dev": "concurrently \"tsup src/index.tsx --format esm,cjs --dts --external react --watch\" \"tailwindcss -i ./src/styles.css -o ./dist/styles.css --watch\"",
    "lint": "TIMING=1 eslint \"**/*.ts*\"",
    "test": "jest"
  },
  "jest": {
    "preset": "jest-presets/jest/node"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@types/eslint": "^8.4.10",
    "@types/react": "^18.0.26",
    "@types/react-dom": "^18.0.10",
    "@types/testing-library__jest-dom": "^5.14.5",
    "class-variance-authority": "^0.4.0",
    "concurrently": "^7.2.2",
    "eslint": "^8.31.0",
    "eslint-config-custom": "workspace:*",
    "jest": "^29.3.1",
    "jest-environment-jsdom": "^29.3.1",
    "jest-presets": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-config": "workspace:*",
    "tailwindcss": "^3.2.4",
    "tsconfig": "workspace:*",
    "tsup": "^6.1.3",
    "typescript": "^4.9.4"
  }
}
