import { Injectable } from '@angular/core';
import { Menu } from '../interface/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }
  MENUITEMS: Menu[] = [
    { title: 'Dashboard', path: 'dashboard/default', icon: 'home', type: 'link', active: true },
    {
      title: 'Products', icon: 'box', type: 'sub', active: false, children: [
        {
          title: 'Physical', type: 'sub', children: [
            { title: 'Product List', path: 'products/physical/product-list', type: 'link' },
            { title: 'Add Product', path: 'products/physical/add-product', type: 'link' }
          ]
        }
      ]
    },
    {
      title: 'Sales', icon: 'dollar-sign', type: 'sub', active: false, children: [
        { title: 'Orders', path: 'sales/orders', type: 'link' },
        { title: 'Transactions', path: 'sales/transactions', type: 'link' }
      ]
    },
    {
      title: 'Masters', icon: 'clipboard', type: 'sub', active: false, children: [
        { title: 'Brandlogo', path: 'masters/brandlogo', type: 'link' },
        { title: 'Category', path: 'masters/category', type: 'link' },
        { title: 'Color', path: 'masters/color', type: 'link' },
        { title: 'Tag', path: 'masters/tag', type: 'link' },
        { title: 'Size', path: 'masters/size', type: 'link' },
        { title: 'User Type', path: 'masters/usertype', type: 'link' }
      ]
    },
    {
      title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
        { title: 'User List', path: 'users/list-user', type: 'link' },
        { title: 'Add User', path: 'users/add-user', type: 'link' }
      ]
    },
    { title: 'Reports', path: 'reports', icon: 'bar-chart', type: 'link', active: false },
    {
      title: 'Settings', icon: 'settings', type: 'sub', active: false, children: [
        { title: 'Profile', path: 'settings/profile', type: 'link' }
      ]
    },
    { title: 'Invoice', path: 'invoice', icon: 'archive', type: 'link', active: false },
    { title: 'Logout', path: 'auth/login', icon: 'log-out', type: 'link', active: false },
  ];

  
}
