const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

async function register(req, res){
    //Estraggo i dati validati dal middleware checkValidity
    //scartando qualsiasi altra chiave non prevista
    //const sanitizedData = matchedData(req)
    const sanitizedData = req.body
    console.log(sanitizedData)
    // devo criptare la password in ingresso prima di salvarla nel db
    // il secondo (salt) paramentro indica quante volte che crypto la password 
  sanitizedData.password = await bcrypt.hash(sanitizedData.password, 10);

    //salvo i dati ricevuti nel database
    const user = await prisma.user.create({
        data:{
            ...sanitizedData
        },
        select:{
            id: true,
            name: true,
            email: true,
            role: true
        }
    });


    //genero il token
    const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })

    res.json({user, token})
}


async function login(req, res){
    //recupero i dati inseriti dall'utente
    const {email, password} = req.body

    //controllo che ci sia l'utente con quella email
    const user = await prisma.user.findUnique({
        where : {
            email
        }
    });

    //controllare che la password sia corretta
    const passMatch = await bcrypt.compare(password, user.password)
    const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
        expiresIn: "2h"
    })

    //rimuovo la password dall'oggetto che restituisco (non dal database) per evitare di restituirla in chiaro
    delete user.password
    
    res.json({user, token})
}



module.exports = {
    register,
    login
}