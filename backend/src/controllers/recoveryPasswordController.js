import jsonwebtoken from "jsonwebtoken"; //Token
import bcrypt from "bcryptjs";

import ClientesModel from "../models/Clientes.js";
import EmpleadosModel from "../models/Empleados.js"

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js"
import	{config} from "../config.js";

//Crear una arrya de funciones
const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async(req, res)=> {
    const {email} = req.body;

    try {
        let userFound;
        let userType;

        userFound = await ClientesModel.findOne({email});
        if(userFound){
            userType = "cliente";
        }else{
            userFound = await EmpleadosModel.findOne({email});
            if (userFound){
                userType = "empleado";
            }
        }

        if (!userFound){
            res.json ({message: "Usuario no encontrado"})
        }
 
        const code = Math.floor(10000+Math.random()*90000).toString()
 
        const token = jsonwebtoken.sign(
 
            {email, code, userType, verified: false},
 
            config.JWT.secret,
 
            {expiresIn: "20m"}
        )
 
        res.cookie("tokenRecoveryCode", token, {maxAge: 20*60*1000})
 
        await sendEmail(
            email,
            "Your verification code",
            "Hello! Remember don't forget your pass",
            HTMLRecoveryEmail(code)
        );

        res.json({message : "Codigo de recuperación enviado"})

        
    } catch (error) {
        console.log("error" + error);
    }
};
// FUNCION PARA VERIFICAR CÓDIGO
recoveryPasswordController.verifyCode = async (req, res) => {
    const { code } = req.body;
  
    try {
      //Extraer el token de las cookies
      const token = req.cookies.tokenRecoveryCode;
  
      //Extraer la información del token
      const decoded = jsonwebtoken.verify(token, config.JWT.secret);
      //Comprobar si el codigo fue verificado
      if (decoded.code !== code) {
        return res.json({ message: "Invalid code" });
      }
  
      //Marcar el token como verificado
      const newToken = jsonwebtoken.sign(
        //1-¿Que vamos a guardar?
        {
          email: decoded.email,
          code: decoded.code,
          userType: decoded.userType,
          verified: true,
        },
        //2- Secret key
        config.JWT.secret,
        //3- ¿Cuando expira?
        { expiresIn: "20m" }
      );
  
      res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });
  
      res.json({ message: "Code verified successfully" });
    } catch (error) {
      console.log("error" + error);
    }
  };
  //FUNCIÓN PARA ASIGNAR NUEVA CONTRASEÑA
  recoveryPasswordController.newPassword = async(req,res)=>{

    const { newPassword } = req.body;
  
    try{
      //Extraer el token de las cookies
      const token = req.cookies.tokenRecoveryCode;
  
      //Extraer la informacion del token
      const decoded = jsonwebtoken.verify(token, config.JWT.secret)
  
      //Comprobar si el codigo fue verificado
      if(!decoded.verified) {
      return res.json({message: "Code not verified"});
    }
  
    //Extraer el email y el userType del token 
    const {email, userType} = decoded;
  
  
    //encriptar la contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10)
  
    //Actualizar la contraseña del usuario en la base de datos
    let updateUser;
  
    if(userType === "cliente"){
      updateUser = await ClientesModel.findOneAndUpdate(
        {email},
        {password: hashedPassword},
        {new: true}
      );
    } else if (userType === "empleado"){
      updateUser = await EmpleadosModel.findOneAndUpdate(
        {email},
        {password: hashedPassword},
        {new: true}
      );
    }
  
    //Quitamos el token
    res.clearCookie("tokenRecoveryCode")
  
    res.json({ message : "Password updated"})
  
    }catch (error){
      console.log("error" + error);
    }
  
  };


export default recoveryPasswordController