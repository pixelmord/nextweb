---
to: "<%= h.src() %>/packages/<%= name %>/tsconfig.json"
---
{
  "compilerOptions": {
    "lib": ["ES2015"],
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "exclude": ["node_modules"],
  "extends": "tsconfig/base.json",
  "include": ["src"]
}
