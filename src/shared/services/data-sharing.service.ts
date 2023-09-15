import { Injectable } from '@angular/core';
import { InlineResponse2002 } from '@shared/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  public isDashboardProcessFileUploaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public dashboardProcessUploadFileResult$: BehaviorSubject<InlineResponse2002 | null> =
    new BehaviorSubject<InlineResponse2002 | null>(null);
}