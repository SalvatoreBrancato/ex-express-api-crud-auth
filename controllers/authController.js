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

module.exports = {
    register
}