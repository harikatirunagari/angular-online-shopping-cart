import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['listProducts'],{relativeTo:this.activatedRoute});
  }

  logout(){
    this.router.navigate(['logout','admin']);
  }

}
