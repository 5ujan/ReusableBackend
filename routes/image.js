const {
  getImageUrl,
  finalImageUrl,
  emptyTempDirectory,
} = require("../controllers/image");


const imageRouter = require('express').Router()


imageRouter.route("/image/getUrl").post(getImageUrl)
imageRouter.route("/image/cleanup").get(emptyTempDirectory)
imageRouter.route("/image/finalUrl:url").get(finalImageUrl)


module.exports = imageRouter