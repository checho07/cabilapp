import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { AnswerSurvey } from '../interfaces/answer-survey';
import { DbService } from '../services/db.service';

import { SubjectsService } from '../services/subjects.service';
import { SurveyService } from '../services/survey.service';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage   {

  @ViewChild(IonModal) modal: IonModal;

  surveysAnswered:any = [];
  showSync:boolean = true;

  surveysAnsweredObj = {
    length : 0,
    items : [],
    showSync: false
  };

  isModalOpen = false;
  surveysTotal:any = 0;

  constructor(
    private surveyService: SurveyService, 
    private subjectService: SubjectsService,
    private router: Router,
    private alertController: AlertController,
    private db: DbService,
    ) {

    this.subjectService.getSubject('homeSurveysCount').subscribe((res) => {   

      debugger
      this.surveysTotal = localStorage.getItem('surveysTotal') == 'null' ? 0 :  localStorage.getItem('surveysTotal') ;   
    })

  }

  ngOnInit() {    
 
  }

  openModal(isOpen: boolean){

    debugger
    this.isModalOpen = isOpen;

    if(isOpen){
      this.getAllSurveys();
    }
  }

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

  checkStartSurvey(){
    var surveysloaded = localStorage.getItem('surveysFromDb');

    if (surveysloaded == null) {
        this.presentAlert('Selecciona "Sincronizar encuestas", para poder iniciar')
    }else{
      this.router.navigateByUrl('survey')
    }

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.openModal(false)
  }

  confirm() {
    this.syncAllAnsweredSurveys();
    this.openModal(false)
    this.modal.dismiss('', 'confirm');
  }

 

  showInfoSaved(){
    var data = localStorage.getItem('mainForm');
    console.log(JSON.parse(data))
    alert(data);
  }

  updateSurveys(){

    this.surveyService.updateSurveysFromDB();
  }
  async presentAlert(text) {
    const alert = await this.alertController.create({
      subHeader:'No tienes encuestas sincronizadas.',
      header: 'Error',
      message: text,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  syncAllAnsweredSurveys(){
    if(this.showSync){
      this.surveysAnsweredObj.items[0].date_created = new Date(this.surveysAnsweredObj.items[0].date_created);
      this.db.syncSurvey(this.surveysAnsweredObj.items);
    }

  }



  



}
