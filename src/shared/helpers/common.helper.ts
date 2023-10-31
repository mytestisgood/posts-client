export function getObjectKeyByValue(iterableObject: object, value: string): string {
  return Object.keys(iterableObject)[Object.values(iterableObject).indexOf(value)];
}
