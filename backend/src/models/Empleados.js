/*
  Campos:
  nombre
  correo
  password 
  telefono
  direccion
  puesto
  fecha_contratacion
  salario
  DUI
 */
  import {Schema} from "mongoose"
  import {model} from "mongoose"
  
  const EmpleadosSchema = new Schema({
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
      type: String,
      require:true
   },
   puesto:{
       type: String,
       require: true
   },
   fecha_contratacion:{
       type: Date,
       require: true
   },
   salario:{
       type: Number,
       require: true
   },
   DUI:{
    type: String,
    require: true
   }

},{
   timestamps : true,
   strict: false
}
);

export default model("Empleados", EmpleadosSchema);