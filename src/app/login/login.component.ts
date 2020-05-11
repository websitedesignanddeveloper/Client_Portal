import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Input,  Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private router: Router) {}
    ngOnInit() {
      localStorage.clear();
    }

    form: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
      });
    
      submit() {
        if (this.form.valid) {
            console.log(this.form.value);
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('UserName', this.form.value.username);
            this.router.navigate(['/posts',{id : 1}]);
        }
      }

    onLogin() {
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/posts']);
    }

    @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}