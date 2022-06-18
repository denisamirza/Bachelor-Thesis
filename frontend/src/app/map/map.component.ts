/// <reference types="@types/googlemaps" />
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import { HttpClient } from '@angular/common/http';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnDestroy {
  latitude!: number;
  longitude!: number;
  zoom!: number;
  isLocationEnabled: boolean = false;
  googleMapType = 'satellite';
  icon = {
    url: './assets/images/turkey.png',
    scaledSize: {
      width: 40,
      height: 40
    },
    anchoriconAnchor: {
      width: 7,
      height: 7
    },
  }
  public renderOptions = {
    suppressMarkers: true,
    preserveViewport: false
}

public markerOptions = {
    origin: {
        icon: './assets/images/transparent.png',
    },
    destination: {
        icon: './assets/images/dest.png',
    },
}
  public origin: any;
  public destination: string = 'Bucuresti, Romania';
  private heading: any;
  map: any;
  users: any = [];

  setOptions(map: any) {
    this.getDirection();
    this.map = map;

    let dest = new google.maps.LatLng(44.439663, 26.096306);
    console.log(this.origin.toJSON())
    this.heading = google.maps.geometry.spherical.computeHeading(this.origin, dest);
    console.log(this.heading)
    if (map.getTilt()) {
      console.log(map.getTilt())
      map.setTilt(45);
  }
    this.map.setHeading(334);
    this.map.setOptions({
      tilt: 45,
      zoom: 20,
      heading: 999,
      mapTypeControl: 'true',
      mapTypeControlOptions: {
        mapTypeIds: ['hybrid'],
        position: google.maps.ControlPosition.TOP_LEFT,
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
      },
      fullscreenControl: true,
      streetViewControl: true,
      center: this.origin,
      position: 46
    });
  }

  getDirection() {
    // Location within a string
    this.origin = new google.maps.LatLng(this.latitude,this.longitude);
    this.destination = 'Bucuresti, Romania';
  }
  targetLocation: String | undefined;

  constructor(
    public shared: SharedService,
    private http: HttpClient) {}

  ngOnDestroy(): void {
    this.http.delete('http://code.pti.com.ro:8000/location/delete-location/' + this.shared.getEmail(), {
    }).subscribe(data => {
      console.log("deteled");
    })
  }

  ngOnInit() {
    this.targetLocation="sdfw"
    this.setCurrentLocation();
    this.shared.setMaplogo();
  }

    // Get Current Location Coordinates
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition((position) => {
       // navigator.geolocation.getCurrentPosition((position) => {
          this.isLocationEnabled = true;
          if (this.latitude != position.coords.latitude ||
            this.longitude != position.coords.longitude) {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.updateLocation();
            }
          console.log(this.latitude + " " + this.longitude)
        }, error=> {}, {
          enableHighAccuracy: true
        });
      }
    }


    private updateLocation() {
      console.log("wed")
      this.http.put('http://code.pti.com.ro:8000/location/update-location/' + this.shared.getEmail(), {
        email: this.shared.getEmail(),
        latitude: this.latitude,
        longitude: this.longitude
      }).subscribe(data => {
        console.log("wed")
        this.getUsersOnTheMap();
      })
    }

    public onResponse(event: any){
      console.log(event);
      console.log(event.request.origin.location.toJSON());
    }

    onAutocompleteSelected(result: PlaceResult) {
      console.log('onAutocompleteSelected: ', result);
    }

    onLocationSelected(location: Location) {
      console.log('onLocationSelected: ', location);
      let latitude = location.latitude;
      let longitude = location.longitude;
    }

    getUsersOnTheMap() {
      this.users = [];
      this.http.get('http://code.pti.com.ro:8000/location/', {
      }).subscribe(data => {
        console.log(JSON.stringify(data));
        let userCoordinates = JSON.parse(JSON.stringify(data));
        for (let json of userCoordinates) {
          console.log(json);
            this.http.get('http://code.pti.com.ro:8000/user/get-user/' + json.email, {}).subscribe(data => {
              let user = JSON.parse(JSON.stringify(data));
              console.log(user);
              let url = "http://code.pti.com.ro:8000/user/" ;
              url = url + user.imgPath;
              url = url.replace("\\", "/");
              json.userImg = url;
              json.name = user.name;
              json.surname = user.surname;
            });
            this.users.push(json);
        }
       // console.log("success" +  JSON.stringify(this.favouriteMovies[0]));
      })
    }
}
