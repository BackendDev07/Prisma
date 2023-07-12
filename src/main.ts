import express from 'express'
import cors from 'cors'
import { engine } from 'express-handlebars'
import { PrismaClient } from '@prisma/client'
import path from 'path' 

const prisma = new PrismaClient()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.engine('handlebars', engine())
app.set("view engine", 'handlebars')
app.set('views', __dirname + '/views')

app.use(express.static(path.join(__dirname, '../public')))



app.post('/todo', async (req, res) => {

    const { title } = req.body
    await prisma.todo.create({
        data: {
            title,
        }
    })
    res.redirect('/')
})

app.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany()
    res.render('home',  {
        title: 'Hello Server!!!',
        todos,
    })
})

app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params
    await prisma.todo.delete({
        where: {
            id: +id
        }
    })
    res.redirect('/')
})

app.listen(3000, () => console.log("Server is running"))