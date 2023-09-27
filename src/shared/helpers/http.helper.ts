import { HttpParams } from '@angular/common/http';

export function createObjectHttpParams(data: object): HttpParams {
  return new HttpParams({ fromObject: Object(data) });
}