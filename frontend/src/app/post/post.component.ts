import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  email: String = '';
  surname: String = '';
  date: String = '';
  placeId: any = '';
  @Output() commentNr: any;
  pinNr: any;
  place: any;
  isPinned: boolean = false;
  @Output() commentNumberEmmiter = new EventEmitter<any>();
  @Output() pinNumberEmmiter = new EventEmitter<any>();
  @Output("deletePinById") deletePinById: EventEmitter<any> = new EventEmitter();
  @Output("addPostInPinList") addPostInPinList: EventEmitter<any> = new EventEmitter();
  @Output("incrementCommentNr") incrementCommentNrToPost: EventEmitter<any> = new EventEmitter();
  @Output("incrementPinNr") incrementPinNr: EventEmitter<any> = new EventEmitter();
  @Output("decrementPinNr") decrementPinNr: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    public shared: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAlreadyPinned();
    console.log("deniiii" + this.id)
    this.http.get('https://pti.com.ro/post/read-post/'+ this.id, {
    }).subscribe(data => {
      console.log(data);
      let post = JSON.parse(JSON.stringify(data));
      this.imgUrl = "https://pti.com.ro/post/" + post.imgPath;
      this.imgUrl = this.imgUrl.replace("\\", "/");
      this.title = post.title;
      this.description = post.description;
      this.date = post.time;
      this.placeId = post.location;
      // let options: google.maps.GeocoderRequest = {placeId: this.placeId};
      const geocoder = new google.maps.Geocoder();
      geocoder
      .geocode({placeId: this.placeId },
      (results) => {
        console.log(results);
        this.place = results[0].formatted_address;
        console.log(this.place)
      });
      this.email = post.email;
      this.getUser(post.email);
    })

  }

  isAlreadyPinned() {
    console.log(this.isPinned)
    this.http.get('https://pti.com.ro/pin/check-pin/' + this.shared.getEmail() + "/" + this.id , {
  }).subscribe(data => {
    console.log(data)
    if (data != null)
      this.isPinned = true;
  })
  }

  getUser(email: string): void {
    this.http.get('https://pti.com.ro/user/get-user/'+ email, {
    }).subscribe(data => {
      console.log(data);
      let user = JSON.parse(JSON.stringify(data));
      this.userImg = "https://pti.com.ro/user/" + user.imgPath;
      this.userImg = this.userImg.replace("\\", "/");
      this.name = user.name;
      this.surname = user.surname;
    })
  }

  pinPost(): void {
    console.log(this.shared.getEmail())
    console.log(this.id)
    this.http.post('https://pti.com.ro/pin/add-pin', {
      email: this.shared.getEmail(),
      postId: this.id,
    }).subscribe(data => {
      console.log(data)
      this.isPinned = !this.isPinned;
      this.pinNr++;
      var json= {"email": this.email,
      "postId": this.id,
      "imgPath": this.imgUrl}
      console.log(data)
      this.addPostInPinList.emit(json);
      this.incrementPinNr.emit(json);
      if (this.shared.getEmail() != this.email) {
        this.http.post('https://pti.com.ro/notification/add-notif', {
          sender: this.shared.getEmail(),
          receiver: this.email,
          message: "pinned your post",
          optionalPostId: this.id
        }).subscribe(data => {

        })
    }
    })
  }
  goToMap() {
    this.router.navigate(['/map',  this.place]);
  }
  sendCommentNr(eventData: { number: string }) {
    this.commentNr = eventData.number;
    this.commentNumberEmmiter.emit(eventData.number);
  }

  incrementCommentNr() {
    this.commentNr++;
  }

  sendPinNr(eventData: { number: string }) {
    this.pinNr = eventData.number;
    this.pinNumberEmmiter.emit(eventData.number);
  }

  deletePin() {
    this.http.delete('https://pti.com.ro/pin/delete-pin/' + this.shared.getEmail() + "/" + this.id, {
    }).subscribe(data => {
        this.deletePinById.emit();
        this.isPinned = !this.isPinned;
        this.pinNr--;
        this.decrementPinNr.emit();
    })
  }

}
