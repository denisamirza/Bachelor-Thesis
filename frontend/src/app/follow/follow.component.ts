import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from "../shared/shared.service"

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  @Input() users: any = [];
  @Input() id: any;
  constructor(
    private http: HttpClient,
    public shared: SharedService
  ) { }

  ngOnInit(): void {
  }

}
