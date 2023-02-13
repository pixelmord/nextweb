---
to: "<%= h.src() %>/packages/<%= name %>/src/index.ts"
---
export const log = (str: any) => {
  console.log("logger: " + str);
};
