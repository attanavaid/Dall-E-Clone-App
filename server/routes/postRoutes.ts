import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import Post from '../mongodb/models/post'

dotenv.config()

const router = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Get post route
router.route('/').get(async (request: express.Request, response: express.Response) => {
    try {
        const posts = await Post.find({})
        response.status(201).json({ success: true, data: posts })
    }

    catch (error) {
        console.log(error)
        response.status(500).send(error?.response.data.error.message || 'Something went wrong')
        response.status(500).json({ success: false, message: error })
    }
})

// Create post route
router.route('/').post(async (request: express.Request, response: express.Response) => {
    try {
        const { name, prompt, photo } = request.body
        const photoURL = await cloudinary.uploader.upload(photo)

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoURL.url
        })

        response.status(201).json({ success: true, data: newPost })
    }

    catch (error) {
        console.log(error)
        response.status(500).send(error?.response.data.error.message || 'Something went wrong')
        response.status(500).json({ success: false, message: error })
    }
})

export default router