import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    public fb: FormBuilder) {
      this.form = this.fb.group({
        name: [''],
        surname: [''],
        email: [''],
        password: [''],
        image: [null],
      });
   }

  ngOnInit(): void {
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
