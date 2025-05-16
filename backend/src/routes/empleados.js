import express from "express";
import empleadosController from "../controllers/empleadosController.js"
//Router que nos ayuda a color métodos
// que tendrá mi ruta


//Router nos ayuda a colar los métodos que tendrá mi ruta
const router = express.Router();


router
.route("/")
.get(empleadosController.getEmpleados)
.post(empleadosController.createEmpleados)

router
.route("/:id")
.put(empleadosController.updateEmpleados)
.delete(empleadosController.deleteEmpleados);

export default router;