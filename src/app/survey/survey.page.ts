import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  pageToShow: any;

  constructor(private subjectService: SubjectsService) {

    this.subjectService.getSubject('surveyPath').subscribe(res => {
      this.pageToShow = res;
    })

   }

  ngOnInit() {
  }

}
