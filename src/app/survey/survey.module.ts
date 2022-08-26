import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyPageRoutingModule } from './survey-routing.module';

import { SurveyPage } from './survey.page';
import { MainformComponent } from '../components/mainform/mainform.component';
import { SurveyComponent } from '../components/survey/survey.component';
import { BrowserModule } from '@angular/platform-browser';
import { SurveyListComponent } from '../components/survey-list/survey-list.component';
import { OnlynumbersDirective } from '../directives/onlynumbers.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SurveyPageRoutingModule, 
  ],
  declarations: [SurveyPage,MainformComponent, SurveyComponent, SurveyListComponent,OnlynumbersDirective]
})
export class SurveyPageModule {}
