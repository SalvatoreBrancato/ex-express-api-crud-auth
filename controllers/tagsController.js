const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



//CREATE
async function create(req, res){
    const datiInIngresso = req.body

    const newTag = await prisma.tag.create({
        data: {
            name: datiInIngresso.name,
        }

    }) 
    return res.json(newTag);
}

//UPDATE
async function update(req, res){
    const id = req.params.id;
    const datiInIngresso = req.body
    

    //controllo se il tag esiste
    const tag = await prisma.tag.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!tag){
        throw new Error('not found');
    }

    const tagAggiornato = await prisma.tag.update({
        data: datiInIngresso,
        where: {
            id: parseInt(id)
        }
    })
    return res.json(tagAggiornato)
}

//DESTROY
async function destroy(req, res){
    const id = req.params.id
    await prisma.tag.delete({
        where: {
            id: parseInt(id)
        }
    })

    return res.json({message: "Tag eliminato"})
}



module.exports= {
    create,
    update,
    destroy
}