import { fromEvent, map, Observable } from 'rxjs';

export function downloadFileHelper(filePath: string, fileName: string): void {
  const link: HTMLAnchorElement = document.createElement('a');

  link.setAttribute('type', 'hidden');
  link.href = filePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function fileFromBlotToTextFormatHelper(files: File[]): Observable<string> {
  const fileReader: FileReader = new FileReader();
  const file: File = files[0];

  fileReader.readAsText(file);

  return fromEvent(fileReader, 'load').pipe(
    map(() => {
      return fileReader.result;
    }),
  ) as Observable<string>;
}
