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
    const job =
      (await PaidJob.findById(req.params.jobID)) ||
      (await CommunityJob.findById(req.params.jobID));
    res.json(job);
  } catch (err) {
    next(err);
  }
};

const createJob = async (req, res, next) => {
  const user = await User.findById(req.body.user.userID);
  let newJob;
  if (user) {
    if (user.isOrg === true) {
      const { title, desc, image, pay, location } = req.body;
      newJob = await CommunityJob.create({ title, desc, createdBy: user._id, image, pay, location });
    } else {
      const { title, desc, pay, image, location } = req.body;
      newJob = await PaidJob.create({ title, desc, pay, createdBy: user._id, image, pay, location});
    }

    res.status(200).json({
      msg: "job Created",
      id: newJob._id,
    });
  } else {
    res.status(404).json({ msg: "not found" });
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
        { $push: { volunteers: req.body.user.userID } },
        { new: true }
      )) ||
        PaidJob.findByIdAndUpdate(
          jobID,
          { $push: { applications: req.body.user.userID } },
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
    const { rating, isComplete } = req.body;

    const job =
      (await PaidJob.findById(jobID)) || (await CommunityJob.findById(jobID));
    if (!job) next(new NotFoundError("Could not find job"));
    else {
      if (isComplete) {
        const userID = job.assignedTo;
        if (job.createdBy !== req.body.user.userID) {
          next(new UnauthenticatedError("Not authorized to delete"));
        } else {
          const paid = await PaidJob.findOneAndDelete({ _id: jobID });
          await CommunityJob.findOneAndDelete({ _id: jobID });
          if (paid) {
            await User.findByIdAndUpdate(
              userID,
              {
                $push: { ratings: rating },
                $push: { totalPaid: totalPaid + 1 },
              },
              { new: true }
            );
          } else {
            await User.findByIdAndUpdate(
              userID,
              {
                $push: { ratings: rating },
                $push: { totalCommunity: totalPaid + 1 },
              },
              { new: true }
            );
          }
        }
        res.status(200).json({ msg: "Job closed" });
      } else {
        if (job.createdBy !== req.body.user.userID) {
          next(new UnauthenticatedError("Not authorized to delete"));
        } else {
          (await PaidJob.findOneAndDelete({ _id: jobID })) ||
            (await CommunityJob.findOneAndDelete({ _id: jobID }));
        }
        res.json({ msg: "job deleted" });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCommunityJobs,
  getPaidJobs,
  createJob,

  getJob,

  applyToJob,
  closeJob,
};
