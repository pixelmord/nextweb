---
title: 'MacOS'
publishedAt: '2020-09-02'
createdAt: '2019-07-23'
summary: 'Code style conventions'
tags:
  - Mac
draft: false
---

## Clear package manager caches

```bash
yarn cache clean
brew cleanup
# also remove latest versions of formulae
# brew  cleanup -s
# remove everything in homebrew cache (also downloads for installed versions)
# rm -rf $(brew --cache)
```

## SSH

```bash
# create key
ssh-keygen -t rsa -b 4096 -C "andreas.sahle@gmail.com"
# copy (default) public key to clipboard
pbcopy < ~/.ssh/id_rsa.pub
# add key to agent
ssh-add ~/.ssh/id_rsa
# list keys in agent
ssh-add -l
```

```bash
# add key to remote server
ssh-copy-id remote_username@server_ip_address
```

## Secret

```bash
openssl rand -base64 32 | colrm 17
```
