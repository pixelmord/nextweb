---
title: 'Start a new Project'
publishedAt: '2020-05-18'
createdAt: '2019-07-23'
summary: 'Project Bootstrapping'
tags:
  - project
draft: true
---

// Last modified: 2020/05/18 10:37:14

## Steps

### Clone or `npm init -y`

### copy common files

1. editorconfig
2. prettier.config
3. LICENSE file

### Install and configure semantic release

#### Add config to `package.json`

```json
{
  "release": {
    "branch": "master",
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      [
        "@semantic-release/npm",
        {
          "npmPublish": false
        }
      ],
      "@semantic-release/github",
      [
        "@semantic-release/git",
        {
          "assets": ["CHANGELOG.md", "package.json"],
          "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }
      ]
    ]
  }
}
```

#### Install dependencies

```bash
yarn add --dev semantic-release @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/changelog @semantic-release/github @semantic-release/git
```

#### Add a Github Action to release via CI

See [ci.yml](../.github/workflows/ci.yml)

#### Add a npm script to execute semantic release

Amend package.json:

```json
{
  "scripts": {
    "sematic-release": "semantic-release"
  }
}
```

### Setup commit linting

Install husky and commitlint:

```bash
yarn add --dev husky @commitlint/{config-conventional,cli}
```

Amend package.json:

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

Add [commitlint.config](../commitlint.config.js)
