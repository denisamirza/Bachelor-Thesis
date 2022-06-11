import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from "../shared/shared.service"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  postId = 'postId';
  settingsId = 'settingsId';
  posts: any = [];
  email: String = '';
  img = 'denn';
  name: String = '';
  surname: String = '';

  setCommentNumber(newItem: any, item: any) {
    console.log('lalalalalala')
    console.log(newItem)
    item.commentNr = newItem;
  }

  constructor(
    private http: HttpClient,
    public shared: SharedService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.email) {
        this.shared.setProfilelogo();
        this.shared.setEmail(params.email);
        this.email = params.email;
      }
    });

    this.http.get('http://code.pti.com.ro:8000/user/get-user/'+ this.email, {
    }).subscribe(data => {
      console.log(data);
      let user = JSON.parse(JSON.stringify(data));
      let url = "http://code.pti.com.ro:8000/user/" + user.imgPath;
      url = url.replace("\\", "/");
      if (this.email == this.shared.getEmail()) {
        this.shared.setImgSrc(url);
        this.shared.setSurname(user.surname);
        this.shared.setName(user.name);
      }

      console.log(this.img);
      console.log(this.shared.getImgSrc())
      this.name = user.name;
      this.surname = user.surname;
      this.img = url;
    })
    this.getPosts()
  }

  getPosts() {
    this.http.get('http://code.pti.com.ro:8000/post/get-posts/' + this.email, {
    }).subscribe(data => {
      console.log(JSON.stringify(data));
      let posts = JSON.parse(JSON.stringify(data));
      for (let json of posts) {
        console.log(json);
        let imgPath = "http://code.pti.com.ro:8000/user/" + json.imgPath;
        imgPath = imgPath.replace("\\", "/");
        json.imgPath = imgPath;
        this.posts.push(json);
      }
     // console.log("success" +  JSON.stringify(this.favouriteMovies[0]));
    })
  }

  showPosts(): void {
    window.scroll(0, 0);
    var x = document.getElementById("postsDiv");
    if (x?.style.display === "none" || x?.style.display === "") {
      x.style.display = "grid";
      var y = document.getElementById("pinsDiv");
      y!.style.display = "none";
      var posts = document.getElementById("posts");
      posts?.classList.toggle("selected");
      var pins = document.getElementById("pins");
      pins?.classList.toggle("selected");
    }
  }
  showPins(): void {
    window.scroll(0, 0);
    var x = document.getElementById("pinsDiv");
    if (x?.style.display === "none" || x?.style.display === "") {
      x!.style.display = "grid";
      var y = document.getElementById("postsDiv");
      y!.style.display = "none";
      var pins = document.getElementById("pins");
      pins?.classList.toggle("selected");
      var posts = document.getElementById("posts");
      posts?.classList.toggle("selected");
    }
  }
}
