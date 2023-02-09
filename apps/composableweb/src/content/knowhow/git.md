---
title: 'GIT'
datePublished: '2019-08-03'
dateCreated: '2019-07-23'
summary: 'GIT commands'
tags:
  - GIT
draft: false
---

## useful commands

```bash
# unrelated history error (e.g. due to github repo creation with license)
git pull --allow-unrelated-histories
# To stop tracking a file you need to remove it from the index
git rm --cached <filename>
# If you want to remove a whole folder, you need to remove all files in it recursively.
git rm -r --cached <foldername>
# (aggressively) save space in your git repo
git gc --aggressive
```
