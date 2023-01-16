import express from 'express'
import entryRoutes from './routes/entry_routes.js'
import categoryRoutes from './routes/category_routes.js'
import cors from 'cors'

const app = express()


app.use(cors())

app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'Journal API'}))

app.use('/categories', categoryRoutes)

app.use('/entries', entryRoutes)

export default app