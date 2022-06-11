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
  user: any;
  @Output() commentNr = new EventEmitter<{ number: any }>();

  setCommentNumber() {
    console.log("lalaal")
    this.commentNr.emit({ number: Object.keys(this.comments).length });
  }
  constructor(
    private router: Router,
    public shared: SharedService,
    private http: HttpClient
  ) {
    console.log(this.id);
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.http.get('http://code.pti.com.ro:8000/comment/get-comment/' + this.id, {
    }).subscribe(data => {
      console.log(JSON.stringify(data));
      let comments = JSON.parse(JSON.stringify(data));
      for (let json of comments) {
        this.http.get('http://code.pti.com.ro:8000/user/get-user/' + json.email, {}).subscribe(data => {
          let user = JSON.parse(JSON.stringify(data));
          let url = "http://code.pti.com.ro:8000/user/" ;
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
    this.http.post('http://code.pti.com.ro:8000/comment/add-comment', {
            comment: this.comment,
            email: this.shared.getEmail(),
            postId: this.id
          }).subscribe(data => {
              this.comment = '';
          })
  }
}
