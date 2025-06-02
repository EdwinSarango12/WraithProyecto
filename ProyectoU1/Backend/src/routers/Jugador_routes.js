import {Router} from 'express'
import {confirmarEmail, registro } from '../controllers/Jugador_controller.js'
const router = Router()


router.post('/registro',registro)
router.get('/confirmar/:token',confirmarEmail)

export default router