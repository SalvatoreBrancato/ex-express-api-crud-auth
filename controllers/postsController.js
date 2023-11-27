const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create
async function create(req, res){
    const datiInIngresso = req.body;

    const newPost = await prisma.post.create({
        data: {
            title: datiInIngresso.title,
            slug: datiInIngresso.slug,     
            image: datiInIngresso.image,    
            content: datiInIngresso.content,  
            published: datiInIngresso.published,
            categoryId: datiInIngresso.categoryId,
            tags: {
                connect: datiInIngresso.tags.map((elem)=>{
                    return {id: elem}
                })
            }
        }

    }) 
    return res.json(newPost);
}

//show
async function show(req, res){
    const slug = req.params.slug
    
    const data = await prisma.post.findUnique({
        where: {
            slug: slug
        },
        include: {
            category: {
                select:{
                    name:true
                }
            },
            tags: true
        }
    })

    if (!data) {
        throw new Error("Not found");
        console.log('errore')
      }

    return res.json(data)
}

//show all
async function showAll(req, res){

    //filtro published
    const filtroPublished = req.query.published
    
    if(filtroPublished == "true"){
        const data = await prisma.post.findMany({
            where: {
                published: true
            },
            include: {
                category: {
                    select:{
                        name : true
                    }
                },
                tags: true
            }

        })
        return res.json(data)
    }

    //filtro contenuto
    const {title, content} = req.query
    if(title || content){
        const data = await prisma.post.findMany({
            where:{
                title:{
                    contains: title
                },
                content:{
                    contains: content
                }
            }
        })
        return res.json(data)
    }

    //nessun filtro
    const data = await prisma.post.findMany();

    return res.json(data)
}

//update
async function update(req, res){
    const slug = req.params.slug;
    const datiInIngresso = req.body
    

    //controllo se il post esiste
    const post = await prisma.post.findUnique({
        where: {
            slug: slug
        }
    })

    if(!post){
        throw new Error('not found');
    }

    const postAggiornato = await prisma.post.update({
            where: {
                slug: slug
            },
            data: {
                ...datiInIngresso,
            tags: {
                set: datiInIngresso.tags.map((elem)=>{
                    return {id: elem}
                })
            }
        }
    })
    return res.json(postAggiornato)
}

//destroy
async function destroy(req, res){
    const slug = req.params.slug
    await prisma.post.delete({
        where: {
            slug: slug
        },
    })

    return res.json({message: "Post eliminato"})
}

module.exports = {
    create,
    show,
    showAll,
    update,
    destroy
  };