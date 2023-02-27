export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function mergeDeep(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
