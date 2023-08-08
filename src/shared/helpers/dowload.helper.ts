export function downloadFileHelper(filePath: string, fileName: string): void {
  const link: HTMLAnchorElement = document.createElement('a');

  link.setAttribute('type', 'hidden');
  link.href = filePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}