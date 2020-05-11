import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

     selectedcase="1";
     selectedtype="";
     selectedstatus="";
    constructor(private router: Router) {}

    ClientData = { "clientName":"Jhon Smith","cases":[
      { "id": "1", "case": "Case1" ,"caseType":"Type1","caseStatus":"waiting for documents"},
      { "id": "2", "case": "Case2" ,"caseType":"Type2","caseStatus":"documents on varification" },
      { "id": "3", "case": "Case3" ,"caseType":"Type3","caseStatus":"waiting for emails" },
    ] 
  }
    ngOnInit() {
      for(var n = 0; n < this.ClientData.cases.length; n++)
      {
        if(this.ClientData.cases[n].id == this.selectedcase)
        {
          console.log("data",this.ClientData.cases[n]);
          let selecteddata= this.ClientData.cases[n]
          this.selectedtype= selecteddata.caseType;
          this.selectedstatus = selecteddata.caseStatus;
        }
      }
         }

    yourFn($event){
        if($event.index==0)
        {
          this.router.navigate(['/posts',{id:this.selectedcase}]);
          //.demoTabIndex = 0;
        }
        if($event.index==1)
        {
          this.router.navigate(['/documents']);
         // this.demoTabIndex = 1;
        }
    }

    onCountrySelectionChanged(data) {
      console.log('select changed...');
      this.selectedcase = data.value;
      for(var n = 0; n < this.ClientData.cases.length; n++)
      {
        if(this.ClientData.cases[n].id == this.selectedcase)
        {
          console.log("data",this.ClientData.cases[n]);
          let selecteddata= this.ClientData.cases[n]
          this.selectedtype= selecteddata.caseType;
          this.selectedstatus = selecteddata.caseStatus;
        }
      } 
      this.router.navigate(['/posts',{id:this.selectedcase}]);
    }
  
    onLoggedout() {
      localStorage.removeItem('isLoggedin');
      this.router.navigate(['/login']);
  }
}
