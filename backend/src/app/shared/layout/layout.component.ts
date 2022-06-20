import { Component, OnInit } from '@angular/core';

import { CollapseService } from '../services/collapse.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public _collapseService:CollapseService) { }

  ngOnInit(): void {
  }

}
