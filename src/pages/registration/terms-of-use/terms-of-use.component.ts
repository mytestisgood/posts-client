import {Component, Inject, OnInit, Optional} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'smarti-terms-of-use',
  standalone: true,
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css']
})

export class TermsOfUseComponent implements OnInit {

  constructor(private router: Router,
             ) { }

  ngOnInit(): void {
  }

  back(){
    this.router.navigate(['/']);
  }

}
