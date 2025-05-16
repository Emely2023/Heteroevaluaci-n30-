import EmpleadosModel from "../models/Empleados.js"
import bcrypyjs from "bcryptjs" ; //Encriptar
import Jsonwebtoken from "jsonwebtoken"; //Token
import {config} from "../config.js";
import empleadosController from "./empleadosController.js";

// creamos una array de funciones
const registerEmployeeController = {};

registerEmployeeController.register = async(req,res) =>{
    //Ask for data
    const {
        nombre,
        email,
        password ,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        DUI
    } = req.body;

    try{
        // 1 -Verificamos que el empleado existe
        const existsEmployee = await EmpleadosModel.findOne({email})
        if(existsEmployee)
        {
            return res.json({message: "Employee ya existe"})
        }

        //Encriptamos la constraseña

        const passwordHash = await bcrypyjs.hash(password, 10)

        //save the employee
        const newEmployee = new EmpleadosModel({nombre, email, password: passwordHash,telefono, direccion, puesto,fecha_contratacion, salario, DUI})

        await newEmployee.save();

        //TOKEN
        Jsonwebtoken.sign(
             //1- que voy a guardar
             {id: newEmployee._id},
             //2- secreto
             config.JWT.secret,
             //Cuando Expira
             {expiresIn: config.JWT.expiresIn},
             //4 función 
             (error, token) =>{
                if (error)console.log ("error"+error)
                    res.cookie("authToken", token)


                res.cookie("authToken", token)
                res.json({message: "empleado guardado"})
             }
        )
           

        
    }
    catch(error)
    {
        console.log("error" + error)
        res.json({message: "Error saving employee"})
    }
}

export default registerEmployeeController;


