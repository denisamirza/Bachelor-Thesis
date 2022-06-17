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

  ngOnInit(): void {
    this.shared.setNotifslogo();
  }

}
