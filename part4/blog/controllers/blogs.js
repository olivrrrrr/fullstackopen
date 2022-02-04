const notesRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blog");

notesRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

notesRouter.get("api/blogs/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
  });

  // const blog = blog.save().then((result) => {
  //   response.status(201).json(result);
  // });

  // console.log(blog["author"] === undefined);

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

// const errorHandler = (error, request, res, next) => {
//   console.error(error.message);

//   if (error.name === "CastError") {
//     return res.status(400).send({ error: "malformatted id" });
//   }

//   next(error);
// };

// app.use(errorHandler);

module.exports = notesRouter;
