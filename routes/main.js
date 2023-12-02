const mainRouter = require('express').Router()
const {getCommunityJobs, getPaidJobs, getJob, createJob, deleteJob, modifyJob, applyToJob, closeJob}= require('../controllers/posts')
const {
  assignApplicant,
  recruit,
  listApplicants,
} = require("../controllers/user");


mainRouter.route('/paid').get(getPaidJobs).post(createJob)
mainRouter.route('/community').get(getCommunityJobs).post(createJob)
mainRouter.route("/paid/:jobID").patch(applyToJob).get(getJob).delete(closeJob)
mainRouter.route("/paid/:jobID/assign").get(listApplicants).patch(assignApplicant)
mainRouter.route("/community/:jobID").patch(applyToJob).delete(closeJob).get(getJob)
mainRouter.route("/community/:jobID/assign").get(listApplicants).patch(recruit)

module.exports = mainRouter