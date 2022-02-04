const notesRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blog");

notesRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

notesRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

notesRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (next) {
    next(exception);
  }
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
  });

  try {
    if (!(blog["title"] === undefined) || !(blog["url"] === undefined)) {
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog.toJSON());
    } else {
      response.status(400).json({ error: error.message });
    }
    // const savedBlog = await blog.save();
    // response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

notesRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const newBlog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      newBlog,
      { new: true }
    );
    response.json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = notesRouter;
