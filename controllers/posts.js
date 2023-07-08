const PaidJob = require('../models/PaidJobs')
const CommunityJob=  require('../models/CommunityJobs')
const User=  require('../models/User')
const { UnauthenticatedError, NotFoundError } = require('../middleware/handleErrors')


const getCommunityJobs=async(req, res, next)=>{
    const jobs = await CommunityJob.find({})
    res.json({jobs})
}

const getPaidJobs=async(req, res, next)=>{
    const jobs= await PaidJob.find({})
    res.json({jobs})
}

const createJob=async(req, res, next)=>{
   const user = await User.findOne({_id:req.user.userID})

   let newJob
    if(user.isOrg===true){
        const {title, desc}= req.body
        newJob = await CommunityJob.create({title, desc, createdBy: user._id})
    }
    else{
        const {title, desc, pay} = req.body
        newJob= await PaidJob.create({title, desc, pay, createdBy: user._id})
    }

    res.status(200).json({
        msg:"job Created", id:newJob._id
    })
}

const deleteJob=async(req, res, next)=>{
    const user = await User.findOne({_id: req.user.userID})
    const {id:jobId}= req.params
    const job  =  await PaidJob.findOne({_id:jobId})|| await CommunityJob.findOne({_id:jobId})
    if(job.createdBy!==req.user.userID){
        next(new UnauthenticatedError('Not authorized to delete'))
    }
    else{
        await PaidJob.findOneAndDelete({_id:jobId})|| await CommunityJob.findOneAndDelete({_id:jobId})
    }
    res.json({msg: "job deleted"})

}
const modifyJob=async(req, res, next)=>{
    const user = await User.findOne({_id: req.user.userID})
    const {id:jobId}= req.params
    
    let job  =  await PaidJob.findOne({_id:jobId})
    if (!job) job=  await CommunityJob.findOne({_id:jobId})
    console.log(job.createdBy, user._id)
    if(job){

        if(job.createdBy!==req.user.userID){
            next(new UnauthenticatedError('Not authorized to modify'))
        }
        else{
            await PaidJob.findByIdAndUpdate(jobId, req.body)
            await CommunityJob.findByIdAndUpdate(jobId,req.body)
            res.json({msg: "job updated"})
        }
    }else{
        next(new NotFoundError('Job not found'))
    }
        
}

module.exports= {getCommunityJobs, getPaidJobs, createJob, deleteJob, modifyJob}




