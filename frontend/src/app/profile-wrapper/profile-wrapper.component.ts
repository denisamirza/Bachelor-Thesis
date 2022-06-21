import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service"

@Component({
  selector: 'app-profile-wrapper',
  templateUrl: './profile-wrapper.component.html',
  styleUrls: ['./profile-wrapper.component.scss']
})
export class ProfileWrapperComponent implements OnInit {
  @Input() email: any;
  constructor(public shared: SharedService,) { }

  ngOnInit(): void {
  }

}
