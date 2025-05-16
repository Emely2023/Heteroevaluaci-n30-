/*
Campos
  nombre
  correo
  contrasenia
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
    correo: {
          type: String,
          require: true
      },
    contrasenia:{
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
    dui:{
       type: String,
       require: true,
      }
  
  },{
      timestamps : true,
      strict: false
  }
  );
  
  export default model("Clientes", ClientesSchema);