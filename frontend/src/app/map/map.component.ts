/// <reference types="@types/googlemaps" />
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Location } from '@angular-material-extensions/google-maps-autocomplete';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit, OnDestroy {
  drivingMode: boolean = false;
  latitude!: number;
  longitude!: number;
  zoom!: number;
  duration: any = '';
  distance: any = '';
  dest: any = '';

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
  @Output() public destination: any;
  private heading: any;
  map: any;
  users: any = [];

  resetMap() {
    this.drivingMode = true;
    this.destination = '';
  }

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
    console.log(this.origin)
    const geocoder = new google.maps.Geocoder();
      geocoder
      .geocode({location: this.origin},
      (results) => {
        console.log(results);
      });
  //  this.destination = 'Bucuresti, Romania';
  }
  targetLocation: String | undefined;

  constructor(
    public shared: SharedService,
    private http: HttpClient,
    private router: ActivatedRoute) {
      console.log(this.shared.getDrivingMode())
    }

  ngOnDestroy(): void {
    this.http.delete('https://pti.com.ro/location/delete-location/' + this.shared.getEmail(), {
    }).subscribe(data => {
      console.log("deteled");
    })
  }

  goToProfile(email: any) {
    console.log(email)
    this.shared.toggleDiv(email)
  }

  ngOnInit() {
    console.log("dsdce")
    this.router.params.subscribe((params) => {
      console.log(params)
      if (params.dest != 'false') {
        console.log(params.dest)
        this.destination = params.dest;
      }
    })
    this.setCurrentLocation();
    this.shared.setMaplogo();
  }

  getcoords(event: any) {
    let coords=JSON.stringify(event);
    let coords3=JSON.parse(coords);

    console.log("updated latitude :: "+coords3);
    console.log("updated longitude :: "+coords3.lng);
    console.log("updated longitude :: "+event.routes[0]);
  }

  public getStatus(status: any){
    console.log(status);
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
              this.origin = new google.maps.LatLng(this.latitude,this.longitude);
              this.updateLocation();
            }
            this.origin = new google.maps.LatLng(this.latitude,this.longitude);
            this.updateLocation();
            this.getDistance();
          console.log(this.latitude + " " + this.longitude)
        }, error=> {}, {
          enableHighAccuracy: true,

        });
      }
    }

    private updateLocation() {
      console.log("wed")
      this.http.put('https://pti.com.ro/location/update-location/' + this.shared.getEmail(), {
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
      this.dest = result.formatted_address;
    }

    toPlace() {
      this.destination = this.dest;
      this.drivingMode = false;
      this.getDistance()
    }

    onLocationSelected(location: Location) {
      console.log('onLocationSelected: ', location);
      let latitude = location.latitude;
      let longitude = location.longitude;
    }

    getUsersOnTheMap() {
      this.users = [];
      this.http.get('https://pti.com.ro/location/', {
      }).subscribe(data => {
        console.log(JSON.stringify(data));
        let userCoordinates = JSON.parse(JSON.stringify(data));
        for (let json of userCoordinates) {
          console.log(json);
            this.http.get('https://pti.com.ro/user/get-user/' + json.email, {}).subscribe(data => {
              let user = JSON.parse(JSON.stringify(data));
              console.log(user);
              let url = "https://pti.com.ro/user/" ;
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

    public getDistance() {
      console.log("deni")
      const matrix = new google.maps.DistanceMatrixService();
      return new Promise((resolve, reject)=>{
        matrix.getDistanceMatrix({
        origins: [this.origin],
        destinations: [this.destination],
        travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
          if(status === 'OK'){
            resolve(response)
            console.log(response)
            this.distance = response.rows[0].elements[0].distance.text;
            this.duration = response.rows[0].elements[0].duration.text;
          }else{
            reject(response);
          }
        });
      })
    }
}
