import { FileDataExtResponse } from '@shared/api/models';
import { saveAs } from 'file-saver';
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

export function toBlobAndSaveFile(data: FileDataExtResponse): void {
  const file: string = 'data:application/' + data.ext + ';base64,' + data.data;
  const blob: Blob = new Blob([file], { type: data.ext });

  return saveAs(blob, data.filename);
}
