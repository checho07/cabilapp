import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import { SurveyService } from 'src/app/services/survey.service';

/**
 * Componente que muestra el listado de encuestas disponibles
 */

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent  {

  /**
   * Listado de encuestas que se toma de base de datos previamente cargada
   */
  surveylist: Array<any>;

  /**
   * 
   * @ignore
   */
  constructor( private subjectService: SubjectsService ) {

    this.surveylist = JSON.parse(localStorage.getItem('surveysFromDb'));

   }

   /**
    * Funcion que permite navegar hacia la encuesta seleccionada
    * @param surveyInfo Datos de la encuesta seleccionada
    */
  gotToSurvey(surveyInfo){

    this.subjectService.setSubject('surveySelected', surveyInfo);
    this. subjectService.setSubject('surveyPath', 3);

  }
 

}
