---
to: "<%= h.src() %>/packages/<%= name %>/tsconfig.json"
---
{
  "extends": "tsconfig/react-library.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
