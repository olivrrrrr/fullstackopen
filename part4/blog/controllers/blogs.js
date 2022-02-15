const blogsRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (next) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  // const body = request.body;
  // // const token = getTokenFrom(request);
  // console.log(request.token);
  // console.log(`${process.env.SECRET}`);
  // const decodedToken = jwt.verify(request.token, `${process.env.SECRET}`);
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token missing or invalid" });
  // }
  // console.log(`${process.env.SECRET}`);
  // const user = await User.findById(decodedToken.id);
  // const blog = new Blog({
  //   author: body.author,
  //   title: body.title,
  //   url: body.url,
  //   likes: body.likes || 0,
  //   user: user._id,
  // });
  // if (!(blog["title"] === undefined) || !(blog["url"] === undefined)) {
  //   const savedBlog = await blog.save();
  //   console.log(savedBlog);
  //   console.log(savedBlog._id);
  //   console.log(user.blogs);
  //   console.log(user.blog);
  //   user.blog = user.blog.concat(savedBlog._id);
  //   console.log(user.blog);
  //   await user.save();
  //   response.status(201).json(savedBlog.toJSON());
  // } else {
  //   response.status(400).json({ error: error.message });
  // }
  // const savedBlog = await blog.save();
  // response.status(201).json(savedBlog);
  // const user = await User.findById(decodedToken.id);
  // console.log(decodedToken.id);
  // console.log(body);
  // // const user = await User.findById(body.userId);
  // console.log(user);
  // const blog = new Blog({
  //   author: body.author,
  //   title: body.title,
  //   url: body.url,
  //   likes: body.likes || 0,
  //   user: user._id,
  // });
  // try {
  //   if (!(blog["title"] === undefined) || !(blog["url"] === undefined)) {
  //     const savedBlog = await blog.save();
  //     console.log(savedBlog);
  //     console.log(savedBlog._id);
  //     console.log(user.blogs);
  //     console.log(user.blog);
  //     user.blog = user.blog.concat(savedBlog._id);
  //     console.log(user.blog);
  //     await user.save();
  //     response.status(201).json(savedBlog.toJSON());
  //   } else {
  //     response.status(400).json({ error: error.message });
  //   }
  // const savedBlog = await blog.save();
  // response.status(201).json(savedBlog);
  // } catch (exception) {
  //   next(exception);
  // }
  //   const body = request.body;
  //   const decodedToken = jwt.verify(request.token, `${process.env.SECRET}`);
  //   const blog = new Blog({
  //     author: body.author,
  //     title: body.title,
  //     url: body.url,
  //     likes: body.likes || 0,
  //   });
  //   try {
  //     if (!(blog["title"] === undefined) || !(blog["url"] === undefined)) {
  //       const savedBlog = await blog.save();
  //       response.status(201).json(savedBlog.toJSON());
  //     } else {
  //       response.status(400).json({ error: error.message });
  //     }
  //     // const savedBlog = await blog.save();
  //     // response.status(201).json(savedBlog);
  //   } catch (exception) {
  //     next(exception);
  //   }
  // });
  // blogsRouter.put("/:id", async (request, response, next) => {
  //   const body = request.body;
  //   const newBlog = {
  //     author: body.author,
  //     title: body.title,
  //     url: body.url,
  //     likes: body.likes || 0,
  //   };
  //   try {
  //     const updatedBlog = await Blog.findByIdAndUpdate(
  //       request.params.id,
  //       newBlog,
  //       { new: true }
  //     );
  //     response.json(updatedBlog.toJSON());
  //   } catch (exception) {
  //     next(exception);
  //   }
  // const body = request.body;
  // const token = getTokenFrom(request);
  // const decodedToken = jwt.verify(token, `${process.env.SECRET}`);
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token missing or invalid" });
  // }
  // const user = await User.findById(decodedToken.id);
  // const blog = new Blog({
  //   author: body.author,
  //   title: body.title,
  //   url: body.url,
  //   likes: body.likes || 0,
  // });
  // const savedBlog = await blog.save();
  // user.blog = user.blog.concat(savedBlog._id);
  // await user.save();
  // response.json(savedBlog);
});

module.exports = blogsRouter;
