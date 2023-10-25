import { Injectable } from '@angular/core';
import { UploadFilePostResponse } from '@shared/api/models';
import { DashboardHeaderIds } from '@shared/entities';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  public isDashboardProcessFileUploaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public dashboardProcessUploadFileResult$: BehaviorSubject<UploadFilePostResponse | null> =
    new BehaviorSubject<UploadFilePostResponse | null>(null);
  public dashboardHeaderIds: BehaviorSubject<DashboardHeaderIds> = new BehaviorSubject<DashboardHeaderIds>({
    organizationId: null,
    employerId: null,
    departmentId: null,
  });
}
