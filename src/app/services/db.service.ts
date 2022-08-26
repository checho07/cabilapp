
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
import { AnswerSurvey } from '../interfaces/answer-survey';
import { SurveyService } from './survey.service';
import { Router } from '@angular/router';
import { SubjectsService } from './subjects.service';
import { LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { mainForm } from '../interfaces/mainForm';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private _sqlInstance: SQLiteObject;
  private answeredSurvey = {} as AnswerSurvey;

    constructor(
      private httpClient: HttpClient, 
      private router: Router,
      private subjectService: SubjectsService,
      private loadingController: LoadingController,
      private sqlite: SQLite,
      private surveyservice: SurveyService
       ) { }
    
  

    syncSurvey(surveys: AnswerSurvey[]){
      this.presentLoading();

      // https://cabilapp.herokuapp.com

      this.httpClient.post<any>('https://cabilapp.herokuapp.com/sync',surveys).subscribe(data => {
        this.cleanLocalDb();

      }, err => {
        this.loadingController.dismiss();
         this.surveyservice.presentToast('Error Sync')

      });
    }


    cleanLocalDb(){
     
      localStorage.clear();
      this.deleteSurveysSql();
      this.surveyservice.presentToast('Resuestas sincronizadas.');
      this.router.navigateByUrl('home');
      this.subjectService.setSubject('homeSurveysCount',true);
      setTimeout(() => {
        this.loadingController.dismiss();
      }, 1000);

    }

    async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'Sincronizando',
        spinner: 'bubbles'
      });
      await loading.present();
    }


    dismissLoading(){
      this.loadingController.dismiss();
    }

    public set sqlInstance(v : SQLiteObject) {
      this._sqlInstance = v;
    }
  
    
    public get sqlInstance() : SQLiteObject {
      return this._sqlInstance
    }

    initSql(){     

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        console.log('sqlite Instance:', db );
        
        this.sqlInstance = db;
        
        //  this.deleteSql();

        db.executeSql(
          `CREATE TABLE  mainForm (
            NumeroIdentificacion  INTEGER,
            sexo  INTEGER,
            IntervaloEdad  INTEGER,
            Genero  INTEGER,
            GrupEtnico  INTEGER,
            id_MarquesasApp_Municipio_id  INTEGER,
            Zona TEXT,
            condicion_discapacidad TEXT ,
            conflicto_armado  TEXT,
            img  TEXT
            )`, [])
          .then(() => {console.log('Executed MAINFORM SQL'); })
          .catch(e => console.log('Error', e));

          db.executeSql(
            
            `CREATE TABLE  surveys (
              NumeroIdentificacion INTEGER, 
              IntervaloEdad INTEGER,
              Genero INTEGER,
              GrupEtnico INTEGER,
              Zona INTEGER,
              Respuesta1 INTEGER,
              Respuesta2 INTEGER,
              Respuesta3 INTEGER,
              Respuesta4 INTEGER,
              Respuesta5 INTEGER,
              Respuesta6 INTEGER,
              Respuesta7 INTEGER,
              Respuesta8 INTEGER,
              Respuesta9 INTEGER,
              Respuesta10 INTEGER,
              Respuesta11 INTEGER,
              Respuesta12 INTEGER,
              date_created TEXT,
              usuario TEXT,
              id_MarquesasApp_Municipio_id INTEGER,
              id_WebTablasBasicasApp_encuesta_id INTEGER,
              sexo INTEGER, 
              condicion_discapacidad TEXT,
              conflicto_armado TEXT,
              surveyName TEXT,
              img TEXT,
              idRespuesta TEXT
              )`, [])
            .then(() => {console.log('Executed SURVEY SQL'); })
            .catch(e => console.log('Error', e));
    
    
      })
      .catch(e => console.log(e));
    }

    async selectSql(table):Promise<any>{

      var testsql :SQLiteObject = this.sqlInstance;
     return  testsql.executeSql(`SELECT * FROM ${table} `,[])
     
    }

    deleteSql(table?){

      var testsql :SQLiteObject = this.sqlInstance;
      testsql.executeSql('DELETE FROM mainForm ',[])
      .then(res => {

        console.log('Table deleted')
      }).catch(err => {

        console.error(err)
      })
    }

    deleteSurveysSql(){
      var testsql :SQLiteObject = this.sqlInstance;
      testsql.executeSql('DELETE FROM surveys ',[])
      .then(res => {

        console.log('Table surveys deleted')
      }).catch(err => {

        console.error(err)
      })
    }

    saveSurveyToSql(surveyAnswered: any){


      var subS = (surveyAnswered.NumeroIdentificacion + " ").substring(0,3)

      var idRespuesta = `${subS}${surveyAnswered.id_MarquesasApp_Municipio_id}${surveyAnswered.img.substring(2500,2503)}`

      var sql: SQLiteObject = this.sqlInstance;

 

      return sql.executeSql(`
      INSERT INTO surveys 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        surveyAnswered.NumeroIdentificacion, 
        surveyAnswered.IntervaloEdad,
        surveyAnswered.Genero,
        surveyAnswered.GrupEtnico,
        surveyAnswered.Zona,
        surveyAnswered.Respuesta1,
        surveyAnswered.Respuesta2,
        surveyAnswered.Respuesta3,
        surveyAnswered.Respuesta4,
        surveyAnswered.Respuesta5,
        surveyAnswered.Respuesta6,
        surveyAnswered.Respuesta7,
        surveyAnswered.Respuesta8,
        surveyAnswered.Respuesta9,
        surveyAnswered.Respuesta10,
        surveyAnswered.Respuesta11,
        surveyAnswered.Respuesta12,
        surveyAnswered.date_created,
        surveyAnswered.usuario,
        surveyAnswered.id_MarquesasApp_Municipio_id,
        surveyAnswered.id_WebTablasBasicasApp_encuesta_id,
        surveyAnswered.sexo, 
        surveyAnswered.condicion_discapacidad,
        surveyAnswered.conflicto_armado,
        surveyAnswered.surveyName,
        surveyAnswered.img,
        idRespuesta
      ]); 

    }


   async getAllAnsweredSurveys(){

    let surveys = await this.selectSql('surveys');   

      return  surveys.rows;
    };

   async saveSurveyToLocalDB(surveyAnswered , _surveyName, _surveyId, _date){     
     
  
       let mainForm = await this.selectSql('mainForm');

  
      this.answeredSurvey = {
        ...mainForm.rows.item(0),
        Respuesta1: surveyAnswered[0],
        Respuesta2: surveyAnswered[1],
        Respuesta3: surveyAnswered[2],
        Respuesta4: surveyAnswered[3],
        Respuesta5: surveyAnswered[4],
        Respuesta6: surveyAnswered[5],
        Respuesta7: surveyAnswered[6],
        Respuesta8: surveyAnswered[7],
        Respuesta9: surveyAnswered[8],
        Respuesta10: surveyAnswered[9],
        Respuesta11: surveyAnswered[10],
        Respuesta12: surveyAnswered[11],
        date_created: _date,
        usuario: 'marquesa',
        id_WebTablasBasicasApp_encuesta_id: _surveyId,
        surveyName: _surveyName
      }
      
       let saveSurveyStatus = await this.saveSurveyToSql(this.answeredSurvey);   
       this.deleteSql();
       
       return saveSurveyStatus;
      
    }
}

