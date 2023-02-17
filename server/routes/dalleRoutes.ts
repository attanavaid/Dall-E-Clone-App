import express, { request } from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const router = express.Router()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((request: express.Request, response: express.Response) => {
    response.send('This is the DALL-E Route!')
})

router.route('/').post(async (request: express.Request, response: express.Response) => {
    try {
        const { prompt } = request.body

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })

        const image = aiResponse.data.data[0].b64_json
        response.status(200).json({ photo: image })
    }

    catch (error) {
        console.log(error)
        response.status(500).send(error?.response.data.error.message || 'Something went wrong')
    }
})


export default router