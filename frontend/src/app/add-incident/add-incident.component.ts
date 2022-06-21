import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.scss']
})
export class AddIncidentComponent implements OnInit {
  incidentId : String = 'incidentId';
  incidents: any = [];
  constructor(
    private http: HttpClient,
    public shared: SharedService) { }

  ngOnInit(): void {
  }

  sendData(): void {

    this.http.post('https://pti.com.ro/user/login', {

          }).subscribe(data => {

          })
}

}
