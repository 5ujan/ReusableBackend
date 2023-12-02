const User = require("../models/User");
const PaidJob = require("../models/PaidJobs");
const CommunityJob = require("../models/CommunityJobs");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../middleware/handleErrors");

const modifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.user.userID });
    if (!user) next(new NotFoundError("user not found"));
    else {
      await User.findByIdAndUpdate(req.body.user.userID, req.body);
      res.status(200).json({ msg: "modified user" });
    }
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await User.findOne({ _id: userID });
    if (!user) next(new NotFoundError("No such user"));
    else res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.user.userID });
    if (!user) next(new NotFoundError("user not found"));
    else {
      await User.findByIdAndDelete(req.body.user.userID, req.body);
      res.status(200).json({ msg: "Successfully deleted" });
    }
  } catch (err) {
    next(err);
  }
};

const listApplicants = async (req, res, next) => {
  try {
    const jobID = req.params.jobID.toString();
    const userIDArr = await PaidJob.findbyId(jobID).applications;
    const userArr = userIDArr.map(async (id) => await User.findById(id));
    res.status(200).json(userArr);
  } catch (err) {
    next(err);
  }
};

const assignApplicant = async (req, res, next) => {
  try {
    const { jobID } = req.params;

    const { applicantID } = req.body;
    await User.findByIdAndUpdate(
      applicantID,
      { $push: { incompleteJobs: jobID } },
      { new: true }
    );
    await PaidJob.findByIdAndUpdate(
      jobID,
      { assignedTo: applicantID, applications: [] },
      { new: true }
    );

    res.status(200).json({ msg: "job assigned" });
  } catch (err) {
    next(err);
  }
};

const recruit = async (req, res, next) => {
  try {
    const { jobID } = req.params;

    const { applicantID } = req.body;
    await User.findByIdAndUpdate(
      applicantID,
      { $push: { incompleteJobs: jobID } },
      { new: true }
    );
    await CommunityJob.findByIdAndUpdate(
      jobID,
      { $push: { volunteers: applicantID } },
      { new: true }
    );

    res.status(200).json({ msg: "job assigned" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  modifyUser,
  deleteUser,
  getUser,
  assignApplicant,
  listApplicants,
  recruit,
};
