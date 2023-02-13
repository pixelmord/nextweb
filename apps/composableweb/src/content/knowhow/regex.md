---
title: 'Regular Expressions'
datePublished: '2020-04-22'
dateCreated: '2019-07-23'
summary: 'Regular Expressions'
tags:
  - regex
draft: false
---

## Web regex

```javascript
const values = {
  email: 'john@doe.me',
  url: 'https://example.com',
};
/* EMAIL REGEX: */
!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email);

/* URL REGEX: */
!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url);
```
