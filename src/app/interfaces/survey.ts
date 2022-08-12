export interface Survey {

    id:Number,
    name:String,
    preguntas:[{
        id:Number,
        text:String,
        options:[String]
    }]

}
