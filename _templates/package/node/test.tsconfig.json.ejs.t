---
to: "<%= h.src() %>/packages/<%= name %>/src/__tests__/tsconfig.json"
---
{
  "extends": "../../tsconfig.json",
  "include": [".", "../."]
}
