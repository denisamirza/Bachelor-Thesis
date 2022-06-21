import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from "../shared/shared.service"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  haveUnseenNotifs: boolean = false;
  constructor(
    public shared: SharedService,
    private http : HttpClient) { }

    checkUnseenNotifs() {
      this.http.get('https://pti.com.ro/notification/get-seen/'+ this.shared.getEmail(), {
      }).subscribe(data => {
        console.log(data);
        if (JSON.parse(JSON.stringify(data)).length != 0) {
          this.haveUnseenNotifs = true;
        }
      })
    }

  ngOnInit(): void {
      this.checkUnseenNotifs();
  }

}
