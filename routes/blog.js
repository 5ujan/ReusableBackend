const viewRouter = require("express").Router()
const modifyRouter = require("express").Router()
const {modifyBlog, createBlog, getAllBlogs, getBlog, deleteBlog, uploadImage, getImage } = require("../controllers/blogs")


viewRouter.route("/blogs/all").get(getAllBlogs)
viewRouter.route("/blogs/:id").get(getBlog)


modifyRouter.route("/blogs/new").post(createBlog)
modifyRouter.route("/blogs/:id").patch(modifyBlog).delete(deleteBlog)

module.exports = {viewRouter, modifyRouter}