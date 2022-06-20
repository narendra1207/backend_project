import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollapseService {

  openNav : boolean = false;
  constructor() { }
}
