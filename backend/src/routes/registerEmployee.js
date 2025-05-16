import express from "express";
import registerEmployeeController from "../controllers/registerEmployeeController.js";
//Router() nos ayuda a color ls métodos
//que tendrá mi ruta
const router = express.Router();

router.route("/").post(registerEmployeeController.register)


export default router;