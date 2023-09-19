import { Injectable } from '@angular/core';
import { InlineResponse2003 } from '@shared/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  public isDashboardProcessFileUploaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public dashboardProcessUploadFileResult$: BehaviorSubject<InlineResponse2003 | null> =
    new BehaviorSubject<InlineResponse2003 | null>(null);
}