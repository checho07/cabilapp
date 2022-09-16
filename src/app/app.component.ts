import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { DbService } from './services/db.service';



/**
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

 

  constructor(
    private screenOrientation: ScreenOrientation, 
    private dbService: DbService,
    private fb : AngularFirestore,
    private platform: Platform ) {

    
      this.fb.collection('config').doc('0').valueChanges().subscribe((res:any) => {

        localStorage.setItem('url',res.url);
      })
    

    this.platform.ready().then(res => {
      this.dbService.initSql();
      console.log(res)
    })

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
 
  }

  

  
  

  
}
