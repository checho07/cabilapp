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


/**
 * 
 * @description 
 * Este componente muestra el formulario principal para presentar encuesta.
 */


@Component({
  selector: 'app-mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.scss'],
})
export class MainformComponent implements OnInit {

  /**
   * Grupo de Formulario que contiene los controladores del formulario
   *
   */
  private mainData: FormGroup;

  
  /**
   * Metodo de acceso GETTER para obtener los datos del Formulario 
   * @returns Retorna el formulario mainData
   */
  public get _mainData() : FormGroup {
    return this.mainData
  }

 /**
  * Propiedad para identificar si se ha enviado el forulario
  * @type {Boolean}
  */
  isSubmitted:boolean;


  /**
   * Lista de municipios en formato [{id, name}] 
   * 
   */
  municipiosList = MUNICIPIOS;

  /**
   *  Listo de sexo en formato [{id, value}]
   */
  sexos = SEXO;

  /**
   * Lista de generos en formato [{id, value}]
   */
  generos = GENERO;

  /**
   * Lista de edades en formato [{id, value}]
   */
  edades = EDAD;

  /**
   * Lista de grupos etnicos en formato [{id, value}]
   */
  grupos_etnicos = GRUPO_ETNICO;

  /**
   * Lista de Zonas en formato {id. value}
   */
  zonas = ZONA;


  /**
   * @ignore
   */
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
      NumeroIdentificacion: ["",[Validators.required, Validators.pattern('[0-9]*$')]],
      sexo:["", Validators.required],
      IntervaloEdad:["", Validators.required],
      Genero:["",Validators.required],
      GrupEtnico:["",Validators.required],
      id_MarquesasApp_Municipio_id:["",Validators.required],
      Zona:["", Validators.required],
      condicion_discapacidad:["", Validators.required],
      conflicto_armado:["", Validators.required],
      img:["",Validators.required]
    })

  

   }

  /**
   * Funcion inicializadora del componente
   * Ejecuta una funcion para ordenar la lista de municipios.
   */
   ngOnInit() {

    this.municipiosList.sort((a,b) => a.name.localeCompare(b.name));


  }


/**
 *  Funcion que guarda la informacion del formulario principal en SQLite de forma local
 * 
 */
  saveInfo(){

    this.isSubmitted = true;
    var data:mainForm = this.mainData.value; 

     data.NumeroIdentificacion = this.convertFloatToInt(data.NumeroIdentificacion);
     debugger

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


/**
 * Funcion que permite eliminar puntos o comas del campo numero de identificacion
 * @param {Number} floatnumber Numero con punto o coma
 * @returns Retorna un numero entero sin puntos ni comas
 * @example convertFloatToInt(123.456)
 */
  convertFloatToInt(floatnumber: number):number{
    var floatToString = floatnumber.toString();
    var withoutPoint = floatToString.replace(/\./g,'');
    return parseInt(withoutPoint);

  }

  /**
   * Funcion GETTER para obtener los errores de validacion de formulario
   * @returns Retorna el listado de errores de validacion
   */
  get errorControl() {
    return this.mainData.controls;
  }


/**
 * Funcion que presenta una Alerta con un texto especifico
 * @param {string} text texto a mostrar en la alerta
 * @example presentAlert(texto de prueba)
 */  
async presentAlert(text: string) {
  const alert = await this.alertController.create({
    header: 'Error ',
    message: text,
    buttons: ['OK']
  });

  await alert.present();
}



/**
 * Funcion que abre la camara y toma una foto y la guarda en formato base64
 */
takepicture(){

  /**
   * Objecto de configuracion para abrir la camara
   */
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

/**
 * Funcion que presenta una anuimacion de cargando durante 1 segundo
 */
async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Cargando...',
    spinner: 'bubbles',
    duration: 1000
  });
  await loading.present();
}


}
