import sendMailToRegister from "../config/nodemailer.js";
import Jugadores from "../models/Jugador.js"

const registro = async (req,res)=>{
    const {email,password} = req.body

    if (Object.values(req.body).includes("")) return res.status(400).json({
        msg:"Lo sentimos, debes llenar todos los campos"
    })

    const verificarEmailBDD = await Jugadores.findOne({ email });
    if (verificarEmailBDD) {
        return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" });
    }

    const nuevojugador = new Jugadores(req.body)
    nuevojugador.password = await nuevojugador.encrypPassword(password)

    const token = nuevojugador.crearToken()
    await sendMailToRegister(email,token)
    await nuevojugador.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}

const confirmarEmail = async (req,res)=>{
    if(!(req.params.token)) 
        return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"
    })

    const jugadorBDD = await Jugadores.findOne({token:req.params.token});

    if(!jugadorBDD?.token) 
        return res.status(404).json({msg:"La cuenta ya ha sido confirmada"
    })

    jugadorBDD.token = null
    jugadorBDD.confirmEmail=true

    await jugadorBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
}


export {
    registro,
    confirmarEmail,
}