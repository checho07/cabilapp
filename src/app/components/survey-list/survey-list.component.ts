import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {

  surveylist: Array<any>;

  constructor( private subjectService: SubjectsService ) {

    this.surveylist = JSON.parse(localStorage.getItem('surveysFromDb'));

   }

  ngOnInit() {}


  gotToSurvey(surveyInfo){

    this.subjectService.setSubject('surveySelected', surveyInfo);
    this. subjectService.setSubject('surveyPath', 3);

  }
 

}
