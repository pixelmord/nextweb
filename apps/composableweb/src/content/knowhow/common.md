---
title: 'Common Web Project Config'
datePublished: '2019-07-23'
dateCreated: '2019-07-23'
summary: 'Common Web Project Config - files and infos that should be common to all project flavours.'
tags:
  - Editorconfig
draft: false
---

Files and infos that should be common to all project flavours.

## editorconfig

.editorconfig

```bash
# https://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

# Use 4 spaces for the Python files
[*.py]
indent_size = 4
max_line_length = 80

# The JSON files contain newlines inconsistently
[*.json]
insert_final_newline = ignore

# Minified JavaScript files shouldn't be changed
[**.min.js]
indent_style = ignore
insert_final_newline = ignore

# Makefiles always use tabs for indentation
[Makefile]
indent_style = tab

# Batch files use tabs for indentation
[*.bat]
indent_style = tab

[*.md]
trim_trailing_whitespace = false
```

https://editorconfig.org/
