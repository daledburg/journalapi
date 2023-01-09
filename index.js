import express from 'express'
import mongoose from 'mongoose'

const categories = ['Food', 'Coding', 'Work', 'Other']

// const entries = [
//     { category: 'Food', content: 'Hello!'},
//     { category: 'Coding', content: 'Express is cool!'},
//     { category: 'Work', content: 'Another day at the office'}
// ]

// Connect to a MongoDB via Mongoose
mongoose.connect('mongodb+srv://Dale:Xiphos129@cluster0.5h96mns.mongodb.net/journal?retryWrites=true&w=majority')  
    .then((m) => console.log(m.connection.readyState === 1 ? 'Mongoose Connected!' : 'Mongoose failed to connect'))
    .catch((err) => console.log(err))

// Create a Mongoose schema to define the structure of a model
const entrySchema = new mongoose.Schema({
    category: { type: String, required: true },
    content: { type: String, required: true }
})

// Create a Mongoose model based on the schema
const EntryModel = mongoose.model('Entry', entrySchema)

// Create a Mongoose schema to define categories model
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
})

// Create a Mongoose model based on the schema
const CategoryModel = mongoose.model('Category', categorySchema)

const app = express()
const port = 4001

app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'Journal API'}))

app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

app.get('/categories/:id', async (req, res) => {
    try {
       const entry = await CategoryModel.findById(req.params.id)
        if (entry) {
            res.send(entry)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        } 
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    } 
})

app.get('/entries', async (req, res) => res.send(await EntryModel.find()))

app.get('/entries/:id', async (req, res) => {
    try {
       const entry = await EntryModel.findById(req.params.id)
        if (entry) {
            res.send(entry)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        } 
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    } 
})

// Update
app.put('/entries/:id', async (req, res) => {
    const { category, content } = req.body
    const newEntry = { category, content }

    try {
       const entry = await EntryModel.findByIdAndUpdate(req.params.id, newEntry, { returnDocument: 'after'})
        if (entry) {
            res.send(entry)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        } 
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    } 
})

// Delete
app.delete('/entries/:id', async (req, res) => {
    try {
       const entry = await EntryModel.findByIdAndDelete(req.params.id)
        if (entry) {
            res.sendStatus(204)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        } 
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    } 
})

app.post('/entries', async (req, res) => {
    try {
        // 1. create new entry object with values passed in from the request
        const { category, content } = req.body
        const newEntry = { category, content}
        // 2. push the new entry to the entries array
        const insertedEntry = await EntryModel.create(newEntry)
        // 3. send the new entry with 201 status
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

app.post('/categories', async (req, res) => {
    try {
        // 1. create new entry object with values passed in from the request
        const { name } = req.body
        const newCategory = { name }
        // 2. push the new entry to the entries array
        const insertedCategory = await CategoryModel.create(newCategory)
        // 3. send the new entry with 201 status
        res.status(201).send(insertedCategory)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

app.listen(port, () => console.log(`App Running at http://localhost:${port}/`))


