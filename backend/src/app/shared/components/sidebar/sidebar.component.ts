import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interface/menu.interface';
import { Global } from '../../services/global';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  logoImage: string = 'assets/images/dashboard/SahosoftMallBachend-logo.png';
  // userImage : string = "assets/images/dashboard/narendra's.jpg";
  userImage: string = 'assets/images/user.png';
  fullName: string = "";
  emailId: string = "";

  menuItems: Menu[] = [];

  constructor(private _menuService: MenuService) {}

  ngOnInit(): void {
    this.menuItems = this._menuService.MENUITEMS;

    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    this.userImage = (userDetails.imagePath == "" || userDetails.imagePath == null ) ? 
    "assets/images/user.png" 
    : Global.BASE_USERS_IMAGES_PATH + userDetails.imagePath ;
    this.fullName = ` ${userDetails.firstName} ${userDetails.lastName}`;
    this.emailId = userDetails.email;
  }

  toggleNavActive(item : Menu){
    item.active=!item.active;
  }
}
