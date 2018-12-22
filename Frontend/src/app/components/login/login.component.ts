import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private loginService: LoginService,
    private router: Router, private spinner: NgxSpinnerService) { }


  ngOnInit() {
    if (this.loginService.isLoggednIn()) {
      this.router.navigate(['/admin']);
    }

  }

  login() {
    this.spinner.show();
    this.loginService.login(this.email, this.password);
    this.email = this.password = '';
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
