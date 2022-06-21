import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsId = 'settingsId';
  userImg: any = this.shared.getImgSrc();
  form!: FormGroup;
  fileToUpload: any;
  constructor(
    private http: HttpClient,
    public shared: SharedService,
    public fb: FormBuilder,
    private router: Router) {
      this.form = this.fb.group({
        name: [null],
        surname: [null],
        email: [this.shared.getEmail()],
        oldPassword: [null],
        password: [null],
        image: [null],
      });
   }

  ngOnInit(): void {
  }

  update(): void {
    var formData: any = new FormData();
    if (this.form.get('oldPassword')?.value  == null) {
      alert('Please type the old password')
      return
    }
    else {
      formData.append('oldPassword', this.form.get('oldPassword')?.value);
    }
    formData.append('email', this.form.get("email")?.value);
    if (this.form.get('surname')?.value != null) {
      console.log(this.form.get('surname')?.value)
      formData.append('surname', this.form.get('surname')?.value);
    }
    if (this.form.get('name')?.value != null) {
      formData.append('name', this.form.get('name')?.value);
    }
    if (this.form.get('password')?.value  != null) {
      formData.append('password', this.form.get('password')?.value);
    }
    if (this.form.get('image')?.value  != null) {
      formData.append('image', this.form.get('image')?.value);
    }

    console.log(formData.values())

    this.http
      .post('https://pti.com.ro/user/add-user', formData)
      .subscribe({
        next: (response) => {
          console.log(response)
          window.location.reload();
          //this.router.navigate([`profile`, this.shared.getEmail()]);
        },
        error: (error) => console.log(error),
      });
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  updateFile(event: any): void {
    this.fileToUpload = event.target.files[0].name;
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.userImg = reader.result;
    }
    this.form.patchValue({
      image: file,
    });
    const image = this.form.get('image');
    if (image) {
      image.updateValueAndValidity();
    }
  }
}
