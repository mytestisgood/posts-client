import { FormControl } from '@angular/forms';

export interface DashboardHeaderGroupControls {
  organization: FormControl<string | number | null>;
  employer: FormControl<string | number | null>;
  department: FormControl<string | number | null>;
}