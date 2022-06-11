import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() id: string = '';
  imgUrl: String = '';
  title: String = '';
  description: String = '';
  userImg: String = '';
  name: String = '';
  surname: String = '';
  date: String = '';
  placeId: String = '';
  commentNr: any;
  @Output() commentNumberEmmiter = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    public shared: SharedService
  ) { }

  ngOnInit(): void {
    console.log("deni")
    this.http.get('http://code.pti.com.ro:8000/post/read-post/'+ this.id, {
    }).subscribe(data => {
      console.log(data);
      let post = JSON.parse(JSON.stringify(data));
      this.imgUrl = "http://code.pti.com.ro:8000/post/" + post.imgPath;
      this.imgUrl = this.imgUrl.replace("\\", "/");
      this.title = post.title;
      this.description = post.description;
      this.date = post.time;
      this.getUser(post.email);
    })
  }

  getUser(email: string): void {
    this.http.get('http://code.pti.com.ro:8000/user/get-user/'+ email, {
    }).subscribe(data => {
      console.log(data);
      let user = JSON.parse(JSON.stringify(data));
      this.userImg = "http://code.pti.com.ro:8000/user/" + user.imgPath;
      this.userImg = this.userImg.replace("\\", "/");
      this.name = user.name;
      this.surname = user.surname;
    })
  }

  sendCommentNr(eventData: { number: string }) {
    console.log("wefewfef")
    this.commentNr = eventData.number;
    this.commentNumberEmmiter.emit(eventData.number);
    console.log("wefewfssef")
  }

}
