const asyncHandler = require("express-async-handler");
const { type } = require("os");
const Stats = require("../models/statsModel");

exports.getAllStats = asyncHandler(async (req, res, next) => {
    const stats = await Stats.findAll();
    return res.status(200).json(stats);
  });


exports.getStatsByUserID = asyncHandler(async (req,res, next)=>{
    const id = parseInt(req.params.id);
    console.log(id);
    const stats = await Stats.findByPk(id);
    console.log(stats);
    if (stats == null){
        res.send("User not found or does not exist");
    }
    return res.status(200).json(stats);
});

exports.updateUserStat = asyncHandler(async (req,res, next)=>{
    const {stat_type, stat_val} = req.body;

    const val = parseInt(req.body.stat_val);
    const id = parseInt(req.params.id)
    console.log(id);
    const stats = await Stats.update(
        {[stat_type]: val},
        { where: { user_id: id } }
      )
    //handleResult(stats)
    return res.status(200).json({"status":"success"});
});

exports.initStats = asyncHandler(async (user_id)=>{
  const newStats = await Stats.create({
    user_id: user_id,
    wpm_pb_15_time:0,
    wpm_pb_30_time:0,
    wpm_pb_60_time:0,
    wpm_pb_10_words:0,
    wpm_pb_25_words:0,
    wpm_pb_50_words:0,
    acc_pb_15_time:0,
    acc_pb_30_time:0,
    acc_pb_60_time:0,
    acc_pb_10_words:0,
    acc_pb_25_words:0,
    acc_pb_50_words:0
  })
  return newStats;
})