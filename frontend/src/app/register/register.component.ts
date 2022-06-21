import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  public showPassword: boolean = false;
  fileToUpload: any;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private http: HttpClient) {
      this.form = this.fb.group({
        name: [''],
        surname: [''],
        email: [''],
        password: [''],
        image: [null],
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

  register(): void {
    var formData: any = new FormData();

    formData.append('email', this.form.get("email")?.value);
    formData.append('name', this.form.get('name')?.value);
    formData.append('surname', this.form.get('surname')?.value);
    formData.append('password', this.form.get('password')?.value);
    formData.append('image', this.form.get('image')?.value);

    this.http
      .post('https://pti.com.ro/user/add-user', formData)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate([`login`]);
        },
        error: (error) => console.log(error),
      });
  }

  updateFile(event: any) {
    this.fileToUpload = event.target.files[0].name;
    console.log(this.fileToUpload);
    const file = event.target.files[0];
    this.form.patchValue({
      image: file,
    });
    const image = this.form.get('image');
    if (image) {
      image.updateValueAndValidity();
    }
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  emailAlreadyExists(): boolean {
    this.http.get('https://pti.com.ro/user/get-user/'+ this.email.value, {
    }).subscribe(data => {
      console.log(data);
      return true;
    })
    return false;
  }

}
