import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-pins',
  templateUrl: './post-pins.component.html',
  styleUrls: ['./post-pins.component.scss']
})
export class PostPinsComponent implements OnInit {
  @Input() id: string = '';
  pins: any = [];
  @Output() pinNr = new EventEmitter<{ number: any }>();

  setPinNumber() {
    console.log("lalaal")
    this.pinNr.emit({ number: Object.keys(this.pins).length });
  }

  constructor(
    private router: Router,
    public shared: SharedService,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.getPostPins();
  }

  getPostPins(): void {
    this.http.get('https://pti.com.ro/pin/get-pin/' + this.id, {
    }).subscribe(data => {
      console.log(JSON.stringify(data));
      let pins = JSON.parse(JSON.stringify(data));
      for (let json of pins) {
        this.http.get('https://pti.com.ro/user/get-user/' + json.email, {}).subscribe(data => {
          let user = JSON.parse(JSON.stringify(data));
          let url = "https://pti.com.ro/user/" ;
          url = url + user.imgPath;
          url = url.replace("\\", "/");
          json.userImg = url;
          json.name = user.name;
          json.surname = user.surname;
        });
        this.pins.push(json);
      }
      this.setPinNumber();
      console.log(Object.keys(this.pins).length);
    })
  }

}
