import { Component } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { DbService } from './services/db.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

 

  constructor(
    private screenOrientation: ScreenOrientation, 
    private dbService: DbService,
    private platform: Platform ) {

    

    this.platform.ready().then(res => {
      this.dbService.initSql();
      console.log(res)
    })

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
 
  }

  

  
  

  
}
