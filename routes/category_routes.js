import express from 'express'
import { CategoryModel } from "../db.js"

const router = express.Router()

router.get('/', async (req, res) => res.send(await CategoryModel.find()))

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

export default router
