import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {



  mainPath = 1;

  objSurvey = {};

  statusSurveyHome :boolean = true;;

  private mainPathSubject = new BehaviorSubject(this.mainPath);
  
  private surveySelectedSubject = new BehaviorSubject( this.objSurvey);

  private updateHomeSurveyes = new BehaviorSubject( this.statusSurveyHome);

  private _mainPathsubject = this.mainPathSubject.asObservable();

  private _surveySelectedSubject = this.surveySelectedSubject.asObservable();

  private _updateHomeSurveyes = this.updateHomeSurveyes.asObservable();


  private subjects = {
    'surveyPath': [this._mainPathsubject, this.mainPathSubject],
    'surveySelected': [this._surveySelectedSubject, this.surveySelectedSubject],
    'homeSurveysCount': [this._updateHomeSurveyes, this.updateHomeSurveyes]
  };

  constructor() { }

  getSubject(_subject):Observable<any>{
    
    return this.subjects[_subject][0] ;
  }

  setSubject(subject, value){

    return this.subjects[subject][1].next(value); 
  }
}
