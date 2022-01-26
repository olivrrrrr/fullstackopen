const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', (request, response)=>{
    Blog
        .find({})
        .then(blogs=>{
            response.json(blogs)
        })
})

notesRouter.post('/', (request, response, next)=>{
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result =>{
            response.status(201).json(result)
        })

})

module.exports = notesRouter