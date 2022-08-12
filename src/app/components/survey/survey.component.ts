import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { Survey } from 'src/app/interfaces/survey';
import { DbService } from 'src/app/services/db.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-surveyC',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {

  pregunta = 0;

  encuesta: Survey;

  respuestas = ['Nunca', 'Casi siempre', 'Siempre'];

  respuestasUsuario = []


  constructor(
    private router: Router, 
    private subjectService: SubjectsService, 
    private dbService: DbService,
    private surveyService: SurveyService) { 

    this.subjectService.getSubject('surveySelected').subscribe(res => {
      this.encuesta = res;
      
    })

  }

  ngOnInit() {

  

  }

  next(value){
    // var res = {id:this.encuesta['preguntas'][this.pregunta].id, value}
    
    // this.respuestasUsuario.push(value);
    this.respuestasUsuario[this.pregunta] = value;

    if (this.pregunta == 11) {

        this.dbService.presentLoading();     
        var date = new Date();
        this.subjectService.setSubject('surveyPath',1);
        this.dbService.saveSurveyToLocalDB(this.respuestasUsuario,this.encuesta['name'], this.encuesta['id'], date).then(res => {

        let surveyTotal =localStorage.getItem('surveysTotal') == null ? 1 : parseInt(localStorage.getItem('surveysTotal')) +1;
        
        localStorage.setItem('surveysTotal',JSON.stringify(surveyTotal))

         this.dbService.dismissLoading();
         this.surveyService.presentToast('Respuesta guardada local');
         
         this.router.navigateByUrl('home');
         this.subjectService.setSubject('homeSurveysCount',true);
        });
        // localStorage.setItem('surveys',JSON.stringify(encuestasTerminadas)); 
     

    }else{
    
      this.pregunta += 1;
    }

 
  }

  goBack(){
    this.pregunta -= 1;
  }

  

}
