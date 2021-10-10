import { Component, OnInit } from '@angular/core';
import { ComunicateComponentsService } from '../../comunicate-components.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor( 
	  private _comunication : ComunicateComponentsService
   ) { }

  ngOnInit(): void {
	  this._comunication.onChangeUser().subscribe(e=>{
		  console.log("Usuarios desde landing", e);
		  
	  });
  }

}
