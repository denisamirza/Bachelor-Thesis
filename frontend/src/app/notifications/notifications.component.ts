import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifs: any = []
  constructor(public shared: SharedService,
    private http: HttpClient) { }

  ngOnDestroy(): void {
      this.http.post('https://pti.com.ro/notification/set-seen/' + this.shared.getEmail(), {
      }).subscribe(data => {
        console.log("seen");
      })
    }

  ngOnInit(): void {
    this.shared.setNotifslogo();
    this.http.get('https://pti.com.ro/notification/get-notification/' + this.shared.getEmail(), { ///???
  }).subscribe(data => {
    console.log(JSON.stringify(data));
    let notifs = JSON.parse(JSON.stringify(data));
    for (let json of notifs) {
      console.log(json);
      this.http.get('https://pti.com.ro/user/get-user/' + json.sender, {}).subscribe(data => {
        let user = JSON.parse(JSON.stringify(data));
        console.log(data)
        let url = "https://pti.com.ro/user/" ;
        url = url + user.imgPath;
        url = url.replace("\\", "/");
        json.userImg = url;
        json.name = user.name;
        json.surname = user.surname;
        console.log(json)
      });
      if (json.optionalPostId) {
        console.log("heeeeeeeeeeeeeee")
        this.http.get('https://pti.com.ro/post/read-post/'+ json.optionalPostId, {
        }).subscribe(data => {
          console.log(data);
          let post = JSON.parse(JSON.stringify(data));
          let imgUrl = "https://pti.com.ro/post/" + post.imgPath;
          imgUrl = imgUrl.replace("\\", "/");
          json.imgPath = imgUrl;
          json.title = post.title;
          json.postId = post._id;
          console.log(json)
          this.notifs.push(json);
        })
      }
      else {
        this.notifs.push(json);
      }


    }
    console.log(Object.keys(this.notifs).length);
  })
  }

}
