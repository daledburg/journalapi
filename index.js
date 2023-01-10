import express from 'express'
import entryRoutes from './routes/entry_routes.js'
import categoryRoutes from './routes/category_routes.js'

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'Journal API'}))

app.use('/categories', categoryRoutes)

app.use('/entries', entryRoutes)

app.listen(port, () => console.log(`App Running at http://localhost:${port}/`))
