---
title: 'Docker'
datePublished: '2019-07-23'
dateCreated: '2019-07-23'
summary: 'Useful Docker Commands'
tags:
  - Docker
  - CLI
draft: false
---

```bash
# kill all running containers with
docker kill $(docker ps -q)
# delete all stopped containers with
docker rm $(docker ps -a -q)
# delete all images with
docker rmi $(docker images -q)

# list all running processes
docker ps -a
```

See also:
https://medium.com/the-code-review/top-10-docker-commands-you-cant-live-without-54fb6377f481
