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
  constructor(
    private http: HttpClient,
    public shared: SharedService
  ) {
    this.shared.setFeedlogo();
   }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.http.get('http://code.pti.com.ro:8000/post/', {
    }).subscribe(data => {
      let posts = JSON.parse(JSON.stringify(data));
      for (let json of posts) {
        console.log(json);
        let imgPath = "http://code.pti.com.ro:8000/user/" + json.imgPath;
        imgPath = imgPath.replace("\\", "/");
        json.imgPath = imgPath;
        this.posts.push(json);
      }
    })
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    let latitude = location.latitude;
    let longitude = location.longitude;
  }

}
