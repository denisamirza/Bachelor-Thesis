import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from "../shared/shared.service"
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts: any = [];
  result: any;
  constructor(
    private http: HttpClient,
    public shared: SharedService
  ) {
    this.shared.setFeedlogo();
   }

  ngOnInit(): void {
    this.getPosts();
  }


  incrementCommentNr(item: any) {
    item.commentNr++;
  }

  incrementPinNr(item: any) {
    console.log("deniiiiiiiiiiiii" + item)
    item.pinNr++;
  }

  decrementPinNr(item: any) {
    item.pinNr--;
  }
  getPosts() {
    this.http.get('https://pti.com.ro/post/', {
    }).subscribe(data => {
      let posts = JSON.parse(JSON.stringify(data));
      for (let json of posts) {
        console.log(json);
        let imgPath = "https://pti.com.ro/user/" + json.imgPath;
        imgPath = imgPath.replace("\\", "/");
        json.imgPath = imgPath;
        this.posts.push(json);
      }
    })
  }
  getPostWithLocation() {
    this.http.get('https://pti.com.ro/post/get-post-after-place/' + this.result, {
    }).subscribe(data => {
      this.posts = [];
      let posts = JSON.parse(JSON.stringify(data));
      for (let json of posts) {
        console.log(json);
        let imgPath = "https://pti.com.ro/user/" + json.imgPath;
        imgPath = imgPath.replace("\\", "/");
        json.imgPath = imgPath;
        this.posts.push(json);
      }
    })
  }

  setCommentNumber(newItem: any, item: any) {
    console.log('lalalalalala')
    console.log(newItem)
    item.commentNr = newItem;
  }

  setPinNumber(newItem: any, item: any) {
    console.log('lalalalalala')
    console.log(newItem)
    item.pinNr = newItem;
  }


  onAutocompleteSelected(result: PlaceResult) {
    this.result = result.place_id;
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    let latitude = location.latitude;
    let longitude = location.longitude;
  }

}
