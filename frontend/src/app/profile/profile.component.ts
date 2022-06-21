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
  pins: any = [];
  followers: any = [];
  followedBy: any = [];
  @Input() email: String = '';
  img = 'denn';
  name: String = '';
  surname: String = '';
  followButton: String = 'Follow';

  deletePinById(id: string) {
    console.log("here" + id)
    this.pins.forEach( (item: any, index: any) => {
      console.log(item)
      if(item.postId === id) this.pins.splice(index,1);
    });
  }

  addPinBy(post: any) {
      this.pins.push(post);
  }

  setCommentNumber(newItem: any, item: any) {
    console.log('lalalalalala')
    console.log(newItem)
    item.commentNr = newItem;
  }

  setPinNumber(newItem: any, item: any) {
    console.log('lalalalalala1')
    console.log(newItem)
    item.pinNr = newItem;
  }

  constructor(
    private http: HttpClient,
    public shared: SharedService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    console.log(this.email)
    this.route.params.subscribe(params => {
      if (params.email) {
        if (params.email == this.shared.getEmail()) {
            this.shared.setProfilelogo();
            this.email = params.email;
        }
      }
      this.checkFollow();
      console.log(this.email)
      this.getFollowed();
      console.log(this.email)
      this.getFollowers();
      console.log(this.email)
      this.http.get('https://pti.com.ro/user/get-user/'+ this.email, {
      }).subscribe(data => {
        console.log(this.email)
        console.log(data);
        let user = JSON.parse(JSON.stringify(data));
        let url = "https://pti.com.ro/user/" + user.imgPath;
        url = url.replace("\\", "/");
        if (this.email == this.shared.getEmail()) {
          console.log("here:"+ this.email + this.shared.getEmail())
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
      this.getPins()
    });


  }

  getPosts() {
    this.http.get('https://pti.com.ro/post/get-posts/' + this.email, {
    }).subscribe(data => {
      console.log(JSON.stringify(data));
      let posts = JSON.parse(JSON.stringify(data));
      for (let json of posts) {
        console.log(json);
        let imgPath = "https://pti.com.ro/user/" + json.imgPath;
        imgPath = imgPath.replace("\\", "/");
        json.imgPath = imgPath;
        this.posts.push(json);
      }
     // console.log("success" +  JSON.stringify(this.favouriteMovies[0]));
    })
  }

  getPins(): void {
    this.http.get('https://pti.com.ro/pin/get-user-pin/' + this.email, {
    }).subscribe(data => {
      console.log(JSON.stringify(data));
      let pins = JSON.parse(JSON.stringify(data));
      for (let json of pins) {
        console.log(json._id);
        this.http.get('https://pti.com.ro/post/read-post/'+ json.postId, {
        }).subscribe(data => {
          console.log(data);
          let post = JSON.parse(JSON.stringify(data));
          json.imgPath = "https://pti.com.ro/post/" + post.imgPath;
          json.imgPath = json.imgPath.replace("\\", "/");
          json.title = post.title;
          json.description = post.description;
          json.date = post.time;
        })
        this.pins.push(json);
      }
      console.log(Object.keys(this.pins).length);
    })
  }


  action() {
    if ( this.followButton == "Follow") {
      this.follow();
    }
    else {
      this.unfollow();
    }
  }
  follow() {
    this.http.post('https://pti.com.ro/follower/add-follow', {
      follower: this.shared.getEmail(),
      followed: this.email,
    }).subscribe(data => {
      this.followButton = "Unfollow";
      var json= {"name": this.shared.getName(),
                "surname": this.shared.getSurname(),
                "userImg": this.shared.getImgSrc()}
      console.log(json)
      this.followers.push(json);
      this.http.post('https://pti.com.ro/notification/add-notif', {
        sender: this.shared.getEmail(),
        receiver: this.email,
        message: "started following you"
      }).subscribe(data => {
      })
      console.log("added")
    })
  }

  addPostInPinList(json: any) {
    console.log("wdferferfer")
    console.log(json)
    this.pins.push(json);
  }

  unfollow() {

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


  checkFollow() {
    console.log(this.email)
    this.http.get('https://pti.com.ro/follower/check-follow/' + this.shared.getEmail() + '/' + this.email, {
    }).subscribe(data => {
      console.log(JSON.stringify(data));
      if (data)
        this.followButton  = "Unfollow";
    })
  }

  getFollowed() {
    this.http.get('https://pti.com.ro/follower/get-followed/' + this.email, {
    }).subscribe(data => {
      console.log(JSON.stringify(data));
      let followed = JSON.parse(JSON.stringify(data));
      for (let json of followed) {
        console.log(json._id);
        this.http.get('https://pti.com.ro/user/get-user/' + json.followed, {}).subscribe(data => {
          let user = JSON.parse(JSON.stringify(data));
          let url = "https://pti.com.ro/user/" ;
          url = url + user.imgPath;
          url = url.replace("\\", "/");
          json.userImg = url;
          json.name = user.name;
          json.surname = user.surname;
        });
        this.followedBy.push(json);
      }
      console.log(Object.keys(this.followedBy).length);
    })
  }

  getFollowers() {
    this.http.get('https://pti.com.ro/follower/get-followers/' + this.email, {
    }).subscribe(data => {
      console.log(JSON.stringify(data));
      let followed = JSON.parse(JSON.stringify(data));
      for (let json of followed) {
        console.log(json._id);
        this.http.get('https://pti.com.ro/user/get-user/' + json.follower, {}).subscribe(data => {
          let user = JSON.parse(JSON.stringify(data));
          let url = "https://pti.com.ro/user/" ;
          url = url + user.imgPath;
          url = url.replace("\\", "/");
          json.userImg = url;
          json.name = user.name;
          json.surname = user.surname;
        });
        this.followers.push(json);
      }
      console.log(Object.keys(this.followers).length);
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
