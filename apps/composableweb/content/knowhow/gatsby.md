---
title: 'Gatsby'
publishedAt: '2020-02-23'
createdAt: '2019-07-23'
summary: 'Code style conventions'
tags:
  - Gatsby
draft: false
---

## Deployment via Github Actions

with e.g. https://github.com/enriikke/gatsby-gh-pages-action

File `.github/workflows/main.yml`

```yaml
name: CI

on:
  push:
    branches:
      - source

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: enriikke/gatsby-gh-pages-action@v2
        with:
          access-token: ${{ secrets.ACCESS_TOKEN }}
```
