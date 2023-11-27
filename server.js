const express = require('express');
const postsRouter = require("./routers/postsRouter");
const categoryRouter = require('./routers/categoryRouter');
const tagRouter = require('./routers/tagRouter');
const authRouter = require('./routers/authRouter')

const app = express();

const port = 3000;

// abilitiamo cors
app.use(cors());

app.use(express.json());

app.use('/', postsRouter);
app.use('/category', categoryRouter)
app.use('/tag', tagRouter)
app.use("", authRouter) // registriamo le rotte senza alcun prefisso


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})
