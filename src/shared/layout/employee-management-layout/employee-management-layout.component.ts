import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-employee-management-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-management-layout.component.html',
  styleUrls: ['./employee-management-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeManagementLayoutComponent {

}
