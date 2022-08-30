import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { AnswerSurvey } from '../interfaces/answer-survey';
import { DbService } from '../services/db.service';

import { SubjectsService } from '../services/subjects.service';
import { SurveyService } from '../services/survey.service';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


/**
 * Pagina principal que muesta los botones de acccion y la modal de respuestas guardadas localmente
 */

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage   {

  @ViewChild(IonModal) modal: IonModal;

  /**
   * Listado de encuestas resueltas obtenidas de SQLite
   */
  surveysAnswered:any = [];

  /**
   * Validacion para mostrar el botono sincornizar solamente si hay respuestas
   */
  showSync:boolean = true;



  surveysAnsweredObj = {
    length : 0,
    items : [],
    showSync: false
  };

  /**
   * Variable de control para abrir o cerrar ventana modal
   */
  isModalOpen = false;

  /**
   * Varaibel contadora de encuestas
   */
  surveysTotal:any = 0;

  /**
   * @ignore
   */
  constructor(
    private surveyService: SurveyService, 
    private subjectService: SubjectsService,
    private router: Router,
    private alertController: AlertController,
    private db: DbService,
    ) {

    this.subjectService.getSubject('homeSurveysCount').subscribe((res) => {   

      this.surveysTotal = localStorage.getItem('surveysTotal') == 'null' ? 0 :  localStorage.getItem('surveysTotal') ;   
    })

  }

 
  /**
   * Funcion para abrir modal de respuestas de encuestas
   * @param {boolean} isOpen variable para determinar si se abre o se cierra la modal
   */
  openModal(isOpen: boolean){

    this.isModalOpen = isOpen;

    if(isOpen){
      this.getAllSurveys();
    }
  }

  /**
   * Funcion que hace una llamada a SQLite para obtener las respuestas guardadas localmente
   */
  async getAllSurveys(){

    this.surveysTotal = localStorage.getItem('surveysTotal') == 'null' ? 0 :  localStorage.getItem('surveysTotal') ;  

    this.surveysAnsweredObj.items = [];

    this.surveysAnswered =   await this.db.selectSql('surveys');

    this.surveysAnsweredObj.length = this.surveysAnswered?.rows.length;
    this.surveysAnsweredObj.showSync = this.surveysAnswered?.rows.length > 0 ? true: false;

    for (let index = 0; index < this.surveysAnsweredObj.length; index++) {

      let surveyData = this.surveysAnswered.rows.item(index);

      this.surveysAnsweredObj.items.push(surveyData);
    }
  }

  /**
   * Funcion que valida si se han cargado encuestas desde la nube para poder iniciar una encuesta
   */
  checkStartSurvey(){
    var surveysloaded = localStorage.getItem('surveysFromDb');

    if (surveysloaded == null) {
        this.presentAlert('Selecciona "Sincronizar encuestas", para poder iniciar')
    }else{
      this.router.navigateByUrl('survey')
    }

  }

  /**
   * Funcion para cerrar ventana modal de respuestas
   */
  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.openModal(false)
  }

  /**
   * Metodo que ejecuta una funcion para sincronizar las respuestas previamente cargadas a la nube
   */
  confirm() {
    this.syncAllAnsweredSurveys();
    this.openModal(false)
    this.modal.dismiss('', 'confirm');
  }

 
  // /**
  //  * 
  //  */
  // showInfoSaved(){
  //   var data = localStorage.getItem('mainForm');
  //   console.log(JSON.parse(data))
  //   alert(data);
  // }

  /**
   * Funcion para hacer una llamada a API y obtener las ultimas encuestas
   */
  updateSurveys(){

    this.surveyService.getSurveysFromDb();
  }

  /**
   * Funcion para presentar un aalerta con texto determinado
   * @param {string} text texto para mostrar en la alerta
   */
  async presentAlert(text) {
    const alert = await this.alertController.create({
      subHeader:'No tienes encuestas sincronizadas.',
      header: 'Error',
      message: text,
      buttons: ['OK']
    });
  
    await alert.present();
  }


  /**Funcion que sincroniza todas las respuestas guardadas localmente a la nube */
  syncAllAnsweredSurveys(){
    if(this.showSync){
      this.surveysAnsweredObj.items[0].date_created = new Date(this.surveysAnsweredObj.items[0].date_created);
      this.db.syncSurvey(this.surveysAnsweredObj.items);
    }

  }


  



}
