
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
import { AnswerSurvey } from '../interfaces/answer-survey';
import { SurveyService } from './survey.service';
import { Router } from '@angular/router';
import { SubjectsService } from './subjects.service';
import { LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { mainForm } from '../interfaces/mainForm';

/**
 * Servicio que manipula SQLite y hace llamados a la API
 */

@Injectable({
  providedIn: 'root'
})
export class DbService {

  /**
   * Objeto de instancia para SQLite
   */
  private _sqlInstance: SQLiteObject;

  /**
   * Objeto para guardar temporalmente las respuestas de las encuestas
   */
  private answeredSurvey = {} as AnswerSurvey;

    /**
     * @ignore
     */
    constructor(
      private httpClient: HttpClient, 
      private router: Router,
      private subjectService: SubjectsService,
      private loadingController: LoadingController,
      private sqlite: SQLite,
      private surveyservice: SurveyService
       ) { }
    
  

    /**
     * Funcion que hace llamada a la API para guardar las 
     * respuestas en la nube, luego limpia la BD SQLlite
     * @param {Array<AnswerSurvey>} surveys Lista de respuestas de encuesta
     */   
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


    /**
     * Funcion para limpiar base de datos SQLlite, luego redirecciona al HOME
     */
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

   /**
 * Funcion que presenta una anuimacion de cargando durante 1 segundo
  */
    async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'Sincronizando',
        spinner: 'bubbles'
      });
      await loading.present();
    }


    /**
     * Funcion para cerrar animacion de cargando
     */
    dismissLoading(){
      this.loadingController.dismiss();
    }

    /**
     * Funcion SETTER para asignar instancia de SQLlite
     */
    public set sqlInstance(v : SQLiteObject) {
      this._sqlInstance = v;
    }
  
    
    /**
     * Funcion GETTER obtener instancia de SQLite
     */
    public get sqlInstance() : SQLiteObject {
      return this._sqlInstance
    }


    /**
     * Funcion que crea las tablas de SQLite localmente: mainForm y surveys
     */
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

    /**
     * Funcion para realizar sentencia SELECT en SQLite de una tabla
     * @param {string} table  Nombre de la tabla a seleccionar
     * @returns retorna la respuesta de la sentencia SQL
     */
    async selectSql(table: string):Promise<any>{

      var testsql :SQLiteObject = this.sqlInstance;
     return  testsql.executeSql(`SELECT * FROM ${table} `,[])
     
    }


    /**
     * Funcion para realizar sentencia DELETE en SQLite de una tabla
     *@param {string} table  Nombre de la tabla a seleccionar
     */
    deleteSql(table?:string){

      var testsql :SQLiteObject = this.sqlInstance;
      testsql.executeSql('DELETE FROM mainForm ',[])
      .then(res => {

        console.log('Table deleted')
      }).catch(err => {

        console.error(err)
      })
    }

      /**
     * Funcion para realizar sentencia DELETE en SQLite de una tabla
     *@param {string} table  Nombre de la tabla a seleccionar
     */
    deleteSurveysSql(){
      var testsql :SQLiteObject = this.sqlInstance;
      testsql.executeSql('DELETE FROM surveys ',[])
      .then(res => {

        console.log('Table surveys deleted')
      }).catch(err => {

        console.error(err)
      })
    }

    /**
     * Funcion que toma las respuestas de una encuesta, agruega un campo unica para cada respuesta
     * luego se ejecuta una sentencia SQL INSERT, para guardar la respuesta de forma local en SQLite
     * @param surveyAnswered Objecto con la encuesta respondida y tipada para guardar
     * @returns retorna respuesta de Sentencia SQL
     */
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


    /**
     * Funcion que hace llamado a una seentencia SQL para obtener todas las encuestas respondidas
     * @returns retorna lista de encuestas respondidas
     */
   async getAllAnsweredSurveys(){

    let surveys = await this.selectSql('surveys');   

      return  surveys.rows;
    };

    /**
     * Funcion para mapear y posteriormente guardar una encuesta en SQLite, que se respondio previamente.
     * @param surveyAnswered 
     * @param {string} _surveyName 
     * @param {any} _surveyId 
     * @param {Date} _date 
     * @returns 
     */
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

