import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  postId = 'settingsId';
  constructor(
    private http: HttpClient,
    public shared: SharedService
  ) { }

  ngOnInit(): void {
  }

  clearLocalStorage() {
    localStorage.clear();
  }

}
