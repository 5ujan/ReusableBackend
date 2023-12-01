const PaidJob = require("../models/PaidJobs");
const CommunityJob = require("../models/CommunityJobs");
const User = require("../models/User");
const {
  UnauthenticatedError,
  NotFoundError,
} = require("../middleware/handleErrors");

const getCommunityJobs = async (req, res, next) => {
  try {
    const jobs = await CommunityJob.find({});
    res.json({ jobs });
  } catch (err) {
    next(err);
  }
};

const getPaidJobs = async (req, res, next) => {
  try {
    const jobs = await PaidJob.find({});
    res.json({ jobs });
  } catch (err) {
    next(err);
  }
};
const getJob = async (req, res, next) => {

  try {
    const job = await PaidJob.findById(req.params.jobID)|| await CommunityJob.findById(req.params.jobID);
    res.json(job);
  } catch (err) {
    next(err);
  }
};

const createJob = async (req, res, next) => {
    console.log(req.user)
    const user = await User.findById(req.user.userID);
    console.log(user)
    let newJob; 
    if(user){

      if (user.isOrg === true) {
        const { title, desc } = req.body;
        newJob = await CommunityJob.create({ title, desc, createdBy: user._id });
      } else {
        const { title, desc, pay } = req.body;
        newJob = await PaidJob.create({ title, desc, pay, createdBy: user._id });
      }
      
      res.status(200).json({
        msg: "job Created",
        id: newJob._id,
      });
    }else{
      res.status(404).json({msg:"not found"})
    }
 
};

const deleteJob = async (req, res, next) => {
  try {
    const { jobID } = req.params;
    const job =
      (await PaidJob.findOne({ _id: jobID })) ||
      (await CommunityJob.findOne({ _id: jobID }));
    if (job.createdBy !== req.user.userID) {
      next(new UnauthenticatedError("Not authorized to delete"));
    } else {
      (await PaidJob.findOneAndDelete({ _id: jobID })) ||
        (await CommunityJob.findOneAndDelete({ _id: jobID }));
    }
    res.json({ msg: "job deleted" });
  } catch (err) {
    next(err);
  }
};
const modifyJob = async (req, res, next) => {
  try {
    const { jobID } = req.params;

    let job = await PaidJob.findOne({ _id: jobID });
    if (!job) job = await CommunityJob.findOne({ _id: jobID });

    if (job) {
      if (job.createdBy !== req.user.userID) {
        next(new UnauthenticatedError("Not authorized to modify"));
      } else {
        await PaidJob.findByIdAndUpdate(jobID, req.body);
        await CommunityJob.findByIdAndUpdate(jobID, req.body);
        res.json({ msg: "job updated" });
      }
    } else {
      next(new NotFoundError("Job not found"));
    }
  } catch (err) {
    next(err);
  }
};

const applyToJob = async (req, res, next) => {
  try {
    const { jobID } = req.params;
    let job =
      (await PaidJob.findOne({ _id: jobID })) ||
      (await CommunityJob.findOne({ _id: jobID }));
    if (!job) next(new NotFoundError("invalid job id"));
    else {
      (await CommunityJob.findByIdAndUpdate(
        jobID,
        { $push: { applications: req.user.userID } },
        { new: true }
      )) ||
        PaidJob.findByIdAndUpdate(
          jobID,
          { $push: { applications: req.user.userID } },
          { new: true }
        );
      res.status(200).json({ msg: "Applied to job" });
    }
  } catch (err) {
    next(err);
  }
};

const closeJob = async (req, res, next) => {
  try {
    const { jobID } = req.params;
    const rating = req.body.rating;
    const job =
      (await PaidJob.findById(jobID)) || (await CommunityJob.findById(jobID));
    if (!job) next(new NotFoundError("Could not find job"));
    else {
      const userID = job.assignedTo;
      await User.findByIdAndUpdate(
        userID,
        { $push: { ratings:  rating  } },
        { new: true }
      );
      res.status(200).json({ msg: "Job closed" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCommunityJobs,
  getPaidJobs,
  createJob,
  deleteJob,
  getJob,
  modifyJob,
  applyToJob,
  closeJob,
};
