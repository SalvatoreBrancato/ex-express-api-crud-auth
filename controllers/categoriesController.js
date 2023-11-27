const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function create(req, res){
    const datiInIngresso = req.body

    const newCategory = await prisma.category.create({
        data: {
            name: datiInIngresso.name,
        }

    }) 
    return res.json(newCategory);
}

//UPDATE
async function update(req, res){
    const id = req.params.id;
    const datiInIngresso = req.body
    

    //controllo se la categoria esiste
    const category = await prisma.category.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!category){
        throw new Error('not found');
    }

    const categoryAggiornata = await prisma.category.update({
        data: datiInIngresso,
        where: {
            id: parseInt(id)
        }
    })
    return res.json(categoryAggiornata)
}


//DESTROY
async function destroy(req, res){
    const id = req.params.id
    await prisma.category.delete({
        where: {
            id: parseInt(id)
        }
    })

    return res.json({message: "Categoria eliminata"})
}


module.exports= {
    create,
    update,
    destroy
}