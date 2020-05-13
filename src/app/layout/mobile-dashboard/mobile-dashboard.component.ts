import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.component.html',
  styleUrls: ['./mobile-dashboard.component.scss']
})
export class MobileDashboardComponent implements OnInit {
  cases = [
    { value: 'case1', viewValue: 'case1' },
    { value: 'case2', viewValue: 'case2' },
    { value: 'case3', viewValue: 'case3' },
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(index){
    this.router.navigate(['/posts',{id : index+1}]);
  }

}
