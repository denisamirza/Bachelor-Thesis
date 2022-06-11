import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from "../shared/shared.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public showPassword: boolean = false;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private shared: SharedService) {
      this.form = this.fb.group({
        email: [''],
        password: [''],
      });
    }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.email.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
  }

  login(): void {
    this.http.post('http://code.pti.com.ro:8000/user/login', {
            email: this.form.get("email")?.value,
            password: this.form.get("password")?.value
          }).subscribe(data => {
            this.shared.setEmail(this.form.get("email")?.value);
            this.router.navigate([`profile`, this.shared.getEmail()]);
          })
  }
}
