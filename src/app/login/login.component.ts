import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData = { UserName: '', Password: '' };

  constructor(private http: HttpClient, private router: Router, private appService: AppService) {}

  ngOnInit(): void {
    if(localStorage.getItem('token') != undefined){
      if(localStorage.getItem('role') == "admin")
        this.router.navigate(['/products']);
      else
      this.router.navigate(['/allproducts']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  onLoginSubmit(form: any): void {
    if (form.valid) {
      this.appService.LoginUser(this.loginData).subscribe({
        next: (response: any) => {
          if(response){
            console.log(response?.token);
            console.log(response?.role);
            console.log(response?.userId);
            localStorage.setItem('token', response.token);
            const payload = JSON.parse(atob(response.token.split('.')[1]));
            localStorage.setItem('role', payload.role);
            localStorage.setItem('userId', response?.userId);
            localStorage.setItem('username', response?.username);
            // localStorage.setItem('role', response.role);
            if(payload.role === 'admin')
              this.router.navigate(['/products']);
            else if(payload.role === 'user')
              this.router.navigate(['/allproducts']);
          }
        },
        error: (err) => {
          // console.error('Error fetching product list:', err);
          this.router.navigate(['/login']);
          localStorage.clear();
        },
      });
    }
  }
}