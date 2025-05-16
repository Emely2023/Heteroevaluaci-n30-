/*
Campos
  nombre
  email
  password
  telefono
  direccion
  DUI
 */
  import {Schema} from "mongoose"
  import {model} from "mongoose"
  
  
  const ClientesSchema = new Schema({
    nombre: {
          type: String,
          require: true
        },
    email: {
          type: String,
          require: true
      },
    password:{
          type: String,
          require: true
      },
    telefono:{
         type: String,
         require: true
      },
    direccion:{
          type:String,
          require: true,
      },
    DUI:{
       type: String,
       require: true,
      }
  
  },{
      timestamps : true,
      strict: false
  }
  );
  
  export default model("Clientes", ClientesSchema);