import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  img: any
  imgSrc: any;
  contentType: any;
  email: any;
  name: any;
  surname: any;
  drivingMode!: string;
  feedlogo: string = 'assets/images/home2.png';
  profilelogo: string = 'assets/images/user.png';
  notifslogo: string = 'assets/images/bell.png';
  maplogo: string = 'assets/images/map.png';

  constructor() { }

  setContentType(contentType: string) {
    this.contentType = contentType;
    localStorage.setItem("contentType", this.contentType);
  }

  getContentType() {
    if (this.contentType == undefined) {
      return localStorage.getItem("contentType");
    }
    return this.contentType;
  }

  setDrivingMode(drivingMode: string) {
    this.drivingMode = drivingMode;
    localStorage.setItem("drivingMode", this.drivingMode);
  }

  getDrivingMode() {
    if (this.drivingMode == undefined) {
      return localStorage.getItem("drivingMode");
    }
    return this.drivingMode;
  }

  setImgSrc(imgSrc: any) {
    this.imgSrc = imgSrc;
    localStorage.setItem("imgSrc", this.imgSrc);
  }

  getImgSrc() {
    if (this.imgSrc == undefined) {
      return localStorage.getItem("imgSrc");
    }
    return this.imgSrc;
  }

  setImg(img: any) {
    this.img = img;
    localStorage.setItem("img", this.img);
  }

  getImg() {
    if (this.img == undefined) {
      return localStorage.getItem("img");
    }
    return this.img;
  }

  setEmail(email: any) {
    this.email = email;
    localStorage.setItem("email", this.email);
  }

  getEmail() {
    if (this.email == undefined) {
      return localStorage.getItem("email");
    }
    return this.email;
  }

  setName(name: any) {
    this.name = name;
    localStorage.setItem("name", this.name);
  }

  getName() {
    if (this.name == undefined) {
      return localStorage.getItem("name");
    }
    return this.name;
  }

  setSurname(surname: any) {
    this.surname = surname;
    localStorage.setItem("surname", this.surname);
  }

  getSurname() {
    if (this.surname == undefined) {
      return localStorage.getItem("surname");
    }
    return this.surname;
  }


  deselectIcon() {
    this.feedlogo = this.feedlogo.replace('2', '');
    this.profilelogo = this.profilelogo.replace('2', '');
    this.notifslogo = this.notifslogo.replace('2', '');
    this.maplogo = this.maplogo.replace('2', '');

    localStorage.setItem("feedlogo", this.feedlogo);
    localStorage.setItem("profilelogo", this.profilelogo);
    localStorage.setItem("notifslogo", this.notifslogo);
    localStorage.setItem("maplogo", this.maplogo);
  }

  setNotifslogo() {
    this.deselectIcon();
    if (this.notifslogo.slice(-5).charAt(0) != '2') {
      this.notifslogo = this.notifslogo.slice(0, -4) +"2"+this.notifslogo.slice(-4);
      localStorage.setItem("notifslogo", this.notifslogo);
    }
  }

  getNotifslogo() {
    if (this.notifslogo == undefined) {
      return localStorage.getItem("notifslogo");
    }
    return this.notifslogo;
  }

  setFeedlogo() {
    this.deselectIcon();
    if (this.feedlogo.slice(-5).charAt(0) != '2') {
      this.feedlogo = this.feedlogo.slice(0, -4) +"2"+this.feedlogo.slice(-4);
      localStorage.setItem("feedlogo", this.feedlogo);
    }
  }

  getFeedlogo() {
    if (this.feedlogo == undefined) {
      return localStorage.getItem("feedlogo");
    }
    return this.feedlogo;
  }

  setProfilelogo() {
    this.deselectIcon();
    if (this.profilelogo.slice(-5).charAt(0) != '2') {
      this.profilelogo = this.profilelogo.slice(0, -4) +"2"+this.profilelogo.slice(-4);
      localStorage.setItem("profilelogo", this.profilelogo);
    }
  }

  getProfilelogo() {
    if (this.profilelogo == undefined) {
      return localStorage.getItem("profilelogo");
    }
    return this.profilelogo;
  }

  setMaplogo() {
    this.deselectIcon();
    if (this.maplogo.slice(-5).charAt(0) != '2') {
      this.maplogo = this.maplogo.slice(0, -4) +"2"+this.maplogo.slice(-4);
      localStorage.setItem("maplogo", this.maplogo);
    }
  }

  getMaplogo() {
    if (this.maplogo == undefined) {
      return localStorage.getItem("maplogo");
    }
    return this.maplogo;
  }

  toggleDiv(id: any): void {
    console.log(id)
    var x = document.getElementById(id);
    console.log(x?.style.display)
    if (x!.style.display === "none" || x!.style.display === "" || x!.style.display === undefined) {
      x!.style.display = "block";
      console.log(x?.style.display)
    }
    else {
      x!.style.display = "none";
    }
  }

}
