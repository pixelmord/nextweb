---
to: "<%= h.src() %>/<%= appPath %>/src/components/<%= name %>/<%= name %>.tsx"
---

export const <%= name %>: React.FC= (props) => {
  return (<div {...props}></div>);
}

export default <%= name %>;
