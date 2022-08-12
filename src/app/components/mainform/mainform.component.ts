import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { EDAD, GENERO, GRUPO_ETNICO, SEXO, ZONA } from 'src/app/constants/main-form';
import { MUNICIPIOS } from 'src/app/constants/municipios';
import { mainForm } from 'src/app/interfaces/mainForm';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AppComponent } from 'src/app/app.component';
import { HomePage } from 'src/app/home/home.page';
import { DbService } from 'src/app/services/db.service';
import { SurveyService } from 'src/app/services/survey.service';


@Component({
  selector: 'app-mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.scss'],
})
export class MainformComponent implements OnInit {

  
  private mainData: FormGroup;

  
  public get _mainData() : FormGroup {
    return this.mainData
  }


  

  isSubmitted:boolean;


  municipiosList = MUNICIPIOS;
  sexos = SEXO;
  generos = GENERO;
  edades = EDAD;
  grupos_etnicos = GRUPO_ETNICO;
  zonas = ZONA;


  
  constructor(
     private sqlite: SQLite,
     private camera: Camera,  
     private formBuilder: FormBuilder, 
     private subjectService: SubjectsService, 
     private alertController: AlertController,
     private dbService: DbService,
     private loadingController: LoadingController,
     private surveyService: SurveyService
     ) {


  



    this.mainData = this.formBuilder.group({
      NumeroIdentificacion: ["",Validators.required],
      sexo:["", Validators.required],
      IntervaloEdad:["", Validators.required],
      Genero:["",Validators.required],
      GrupEtnico:["",Validators.required],
      id_MarquesasApp_Municipio_id:["",Validators.required],
      Zona:["", Validators.required],
      condicion_discapacidad:["", Validators.required],
      conflicto_armado:["", Validators.required],
      img:["",]
    })

  

   }

  ngOnInit() {

    this.municipiosList.sort((a,b) => a.name.localeCompare(b.name));


  }

  saveInfo(){

    this.isSubmitted = true;
    var data:mainForm = this.mainData.value; 

    if (!this.mainData.valid) {
      
      this.presentAlert('Porfavor llena los campos requeridos.')
      return false;

    } else {
       
     this.presentLoading();

      var testsql :SQLiteObject = this.dbService.sqlInstance;
      testsql.executeSql(`
      INSERT INTO mainForm 
      VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        data.NumeroIdentificacion, 
        data.sexo, 
        data.IntervaloEdad,
        data.Genero,
        data.GrupEtnico,
        data.id_MarquesasApp_Municipio_id,
        data.Zona,
        data.condicion_discapacidad,
        data.conflicto_armado,
        data.img
      ])
      .then(res => {
        
        this.surveyService.presentToast('Guardado.')
        this.loadingController.dismiss();
     
      }).catch(err => {
          this.dbService.dismissLoading();
         alert(err)
    
      })    

      // localStorage.setItem('mainForm', JSON.stringify(data));
      this.subjectService.setSubject('surveyPath',2);
    }

  
  

  }

  get errorControl() {
    return this.mainData.controls;
  }

async presentAlert(text) {
  const alert = await this.alertController.create({
    header: 'Error ',
    message: text,
    buttons: ['OK']
  });

  await alert.present();
}

takepicture(){

  const options: CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.mainData.controls.img.setValue(base64Image);
   }, (err) => {
  this.presentAlert(err);
   });
}


async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Cargando...',
    spinner: 'bubbles',
    duration: 1000
  });
  await loading.present();
}


}
