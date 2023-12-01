const mainRouter = require('express').Router()
const {getCommunityJobs, getPaidJobs, getJob, createJob, deleteJob, modifyJob, applyToJob, closeJob}= require('../controllers/posts')
const {
  modifyUser,
  deleteUser,
  getUser,
  assignApplicant,
  listApplicants,
} = require("../controllers/user");


mainRouter.route('/paid').get(getPaidJobs).post(createJob)
mainRouter.route('/community').get(getCommunityJobs).post(createJob)
mainRouter.route("/paid/:jobID").delete(deleteJob).patch(modifyJob).patch(applyToJob).get(getJob)
mainRouter.route("/paid/:jobID/assign").get(listApplicants).post(assignApplicant)
mainRouter.route("/community/:jobID").delete(deleteJob).patch(modifyJob).patch(applyToJob).delete(closeJob).get(getJob)
mainRouter.route("/community/:jobID/assign").get(listApplicants).post(assignApplicant)

module.exports = mainRouter