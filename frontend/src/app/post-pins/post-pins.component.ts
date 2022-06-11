import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from "../shared/shared.service"

@Component({
  selector: 'app-post-pins',
  templateUrl: './post-pins.component.html',
  styleUrls: ['./post-pins.component.scss']
})
export class PostPinsComponent implements OnInit {
  @Input() id: string = '';

  constructor(
    private router: Router,
    public shared: SharedService
  ) { }

  ngOnInit(): void {
  }

}
