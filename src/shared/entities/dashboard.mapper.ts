import { FormControl, FormGroup } from '@angular/forms';
import { DashboardHeaderGroupControls } from './dashboard.models';

export function dashboardHeaderGroupMapper(): FormGroup<DashboardHeaderGroupControls> {
  return new FormGroup({
    organization: new FormControl(),
    employer: new FormControl(),
    department: new FormControl(),
  });
}