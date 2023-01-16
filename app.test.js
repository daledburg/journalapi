import app from './app.js'
import request from 'supertest'

describe("App tests", () => {
    test('GET /', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toBe('/json')
        expect(res.body.info).toBeDefined()
        expect(res.body.info).toBe('Journal API')
    })

    test('GET /categories', async () => {
        const res = await request(app).get('/categories')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBe(4)
    })
})