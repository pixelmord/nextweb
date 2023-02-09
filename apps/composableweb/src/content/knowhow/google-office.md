---
title: 'Google Office'
datePublished: '2020-02-23'
dateCreated: '2019-07-23'
summary: 'Code style conventions'
tags:
  - Office
draft: false
---

## GSheets

### Sequential row numbering

> Do you want these IDs to be sequential? By this, I mean should the first person be 1, second person be 2, etc.? If so, the formula is quite simple.
> If you want 1000 ID numbers to be generated use the formula `=ArrayFormula(ROW(A1:A1000))`. If you want 50,000 ID numbers to be generated use the formula `=ArrayFormula(ROW(A1:A50000))`...etc.
> If you want all of the ID numbers to be a certain number of digits, wrap it in a text formula. Say you want it to be a four digit number (e.g. ID 1 would appear as ID 0001), wrap it in a text formula and include that many zeros.
> Put it all together and you can generate 1000, four digit ID numbers using formula `=ArrayFormula(text(ROW(A1:A1000),"0000"))​`. Just put that at the top of the column you want IDs in.

[Google Help Article](https://support.google.com/docs/thread/24496382?hl=en&msgid=25317640)

```js
=ArrayFormula(text(ROW(A1:A1000),"0000"))
```
