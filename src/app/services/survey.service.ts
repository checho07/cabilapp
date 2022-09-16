import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AnswerSurvey } from '../interfaces/answer-survey';
import { mainForm } from '../interfaces/mainForm';
import { DbService } from './db.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  _surveysFromDB;

  private url: string;

  // _surveysFromDB = [
  //   {
  //     name:'Encuesta de Violencia de genero en pandemia - Contexto',
  //     id: 1,
  //     preguntas:[
  //       {id:1, text:"¿Considera que como mujer ha ganado menos dinero frente a los hombres en una mismas actidad laboral?",options:['La mayoría de las veces considero que por ser mujer he ganado menos dinero','Algunas veces considero que por ser mujer he ganado menos dinero','No considero que por ser mujer he ganado menos'] }, 
  //       {id:2, text:"¿En que lugares de municipio se siente más insegura?", options:['En las veredas del municipio','En la zona centro del municipio', 'Otros lugares']},
  //       {id:3, text:"¿Con que frecuencia por ser mujer, siente que sus solicitudes ante instituciones públicas y/o privadas, no son atendidas con la misma celeridad que a otras personas?", options:['La mayoría de las veces','Algunas vecces','Pocas veces']},
  //       {id:4, text:"Por cuál de las siguientes razones se ha sentido limitada a vestirse de la forma que le gusta ", options:['La critica de otras personas', 'La forma de mi cuerpo', 'No me he sentido limitada']},
  //       {id:5, text:"Por cual de las siguientes razones se ha sentido más incomoda en la calle", options: ['Por silvidos y piropos incómodos','Por miradas lascivas (degeneradas)', 'Por acercamientos intimidantes']},
  //       {id:6, text:"Como mujer, ¿Cuál cree que ha sido su mayor dificultad en su desarrollo personal? ", options:['La falta de recursos económicos','El acceso a la formación educativa', 'La cultura que hace que las mujeres sean las responsables de cuidado de los otros']},
  //       {id:7, text:"¿Con que frecuencia siente que por ser mujer debe asumir los quehaceres domésticos? ", options:['Muy Frecuente, porque nadie más lo puede hacer', 'Frecuente, porque es mi deber y las demás personas no hacen de la forma adecuada', 'Poco Frecuente, porque nos dividimos las tareas']},
  //       {id:8, text:"¿Con que frecuencia siente que otras personas la corrigen, la interrunpen o le impiden expresar sus ideas?", options:['Muy frecuente', 'Frecuentemente', 'Poco frecuente']},
  //       {id:9, text:"¿Siente que por ser mujer es más frecuente que invaliden sus proyectos o propuestas?", options:['La mayoria de veces', 'Algunas veces', 'Pocas veces']},
  //       {id:10, text:"¿Siente que por ser mujer es más frecuente que invaliden sus opiniones en las relaciones de pareja?", options:['La mayoria de veces', 'Algunas veces', 'Pocas veces']},
  //       {id:11, text:"¿Cuáles han sido los mayores obstaculos a la hora del uso de métodos de anticoncepción?", options:['La opnión de mi pareja/mis parejas', 'La falta de acceso a los mismos (por falta recursos económicos o porque no son de fácil acceso)', 'Desconocimiento del uso de los métodos de anticoncepción']},
  //       {id:12, text:"¿Con que frecuencia usted guarda silencio a la hora de sentirse agredida, humillada o violentada ?",options:['Muy frecuente', 'Frecuentemente', 'Poco frecuente'] } 
  //     ]
  //   }
    
  //  ]

  constructor( private toastController: ToastController, private httpClient: HttpClient, private fb: AngularFirestore) {

    this.url = localStorage.getItem('url');

      this.getSurveysFromDb();


   }



  // async updateSurveysFromDB(){

  //   var surveysFromDb =  this._surveysFromDB;

  //   localStorage.setItem('surveysFromDb', JSON.stringify(surveysFromDb)); 

    
  //   this.presentToast(`Encuestas cargadas (${surveysFromDb.length}) `)
  // }


  getSurveysFromDb(){

    if(this.url == null ){
      this.fb.collection('config').doc('0').valueChanges().subscribe((res:any) => {

        localStorage.setItem('url',res.url);
        this.url = res.url
      })
    }

    this.httpClient.get(`${this.url}survey`).subscribe(surveys => {

      this._surveysFromDB = surveys;
      localStorage.setItem('surveysFromDb', JSON.stringify(this._surveysFromDB)); 

      this.presentToast(`Encuestas cargadas (${this._surveysFromDB.length}) `)
    })
  
  }
  

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color:'primary'
    });
    toast.present();
  }

}
