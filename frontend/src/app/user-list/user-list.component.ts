import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  @Input() id: string = '';

  constructor(
    private http: HttpClient,
    public shared: SharedService
  ) { }

  ngOnInit(): void {
  }

}
