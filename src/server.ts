import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './data-source'
import { routes } from './routes';


const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
.then(() => {
    console.log("Conexão com o banco de dados (PG) estabelecida.")
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    })
}).catch((err) => {
    console.log("Erro ao conectar com o banco de dados: ", err)
})
