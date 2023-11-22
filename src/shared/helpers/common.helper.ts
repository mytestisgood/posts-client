export function getObjectKeyByValue(iterableObject: object, value: string): string {
  return Object.keys(iterableObject)[Object.values(iterableObject).indexOf(value)];
}

export function isEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0;
};
