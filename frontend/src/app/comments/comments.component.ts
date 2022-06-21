import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() id: string = '';
  comment: String ='';
  comments: any = [];
  @Input() userEmail: any;
  @Output() commentNr = new EventEmitter<{ number: any }>();
  @Output("incrementCommentNr") incrementCommentNr: EventEmitter<any> = new EventEmitter();

  setCommentNumber() {
    console.log("lalaal")
    this.commentNr.emit({ number: Object.keys(this.comments).length });
  }
  constructor(
    private router: Router,
    public shared: SharedService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.http.get('https://pti.com.ro/comment/get-comment/' + this.id, {
    }).subscribe(data => {
      console.log(JSON.stringify(data));
      let comments = JSON.parse(JSON.stringify(data));
      for (let json of comments) {
        this.http.get('https://pti.com.ro/user/get-user/' + json.email, {}).subscribe(data => {
          let user = JSON.parse(JSON.stringify(data));
          let url = "https://pti.com.ro/user/" ;
          url = url + user.imgPath;
          url = url.replace("\\", "/");
          json.userImg = url;
          json.name = user.name;
          json.surname = user.surname;
        });
        this.comments.push(json);
      }
      this.setCommentNumber();
      console.log(Object.keys(this.comments).length);
    })
  }

  addComment(event: any): void {
    this.http.post('https://pti.com.ro/comment/add-comment', {
            comment: this.comment,
            email: this.shared.getEmail(),
            postId: this.id
          }).subscribe(data => {
            this.http.post('https://pti.com.ro/notification/add-notif', {
              sender: this.shared.getEmail(),
              receiver: this.userEmail,
              message: "commented on your post",
              optionalPostId: this.id
            }).subscribe(data => {
              var json= {"comment": this.comment,
                        "surname": this.shared.getSurname(),
                        "name": this.shared.getName(),
                        "userImg": this.shared.getImgSrc()};
              console.log(json)
              this.comments.push(json);
              this.setCommentNumber();
            })
            this.incrementCommentNr.emit();
            this.comment = ''
          })
  }
}
