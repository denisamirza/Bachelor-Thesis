import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})

export class AddPostComponent implements OnInit {
  postId = 'postId';
  postImg: any;
  form: FormGroup;
  fileToUpload: any;
  posts: any = [];

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private http: HttpClient,
    public shared: SharedService) {
      var date = (new Date()).toString().split(' ').splice(1,3).join(' ');
      console.log(date)
      this.postImg = "../assets/images/white.jpg";
      this.form = this.fb.group({
        email: [this.shared.getEmail()],
        title: [''],
        location: [''],
        description: [''],
        image: [null],
        time: [date]
      });
      this.getPostsOfUser();
  }


  ngOnInit(): void {

  }

  updateFile(event: any): void {
    this.fileToUpload = event.target.files[0].name;
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.postImg = reader.result;
    }
    this.form.patchValue({
      image: file,
    });
    const image = this.form.get('image');
    if (image) {
      image.updateValueAndValidity();
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.form.patchValue({location: result.place_id});
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    let latitude = location.latitude;
    let longitude = location.longitude;
  }

  sendData(): void {
      var formData: any = new FormData();

      formData.append('email', this.form.get("email")?.value);
      formData.append('title', this.form.get("title")?.value);
      formData.append('location', this.form.get('location')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('image', this.form.get('image')?.value);
      formData.append('time', this.form.get('time')?.value);

      this.http
        .post('https://pti.com.ro/post/add-post', formData)
        .subscribe({
          next: (response) => {
            console.log(response)
            window.location.reload();
          },
          error: (error) => console.log(error),
        });
  }

  getPostsOfUser() {
    this.http.get('https://pti.com.ro/post/get-post/' + this.shared.getEmail(), {
          }).subscribe(data => {
            let arr = JSON.parse(JSON.stringify(data));
            for (let json of arr) {


              let post = JSON.parse(JSON.stringify(json));
              let imgSrc = btoa(String.fromCharCode(...new Uint8Array(post.img.data.data)));
              console.log("denoiii: "+ imgSrc)
              let contentType = post.img.contentType;
              let img  = "data:" + contentType + ";base64,"+ imgSrc;
              json.image.set(img);

              this.posts.add(json);

              console.log("denoiii: "+ imgSrc)
            }
          })
  }

}
