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

exports.updateUserStats = asyncHandler(async (req,res,next)=>{
    const{test_type, wpm, acc,total_time} =req.body;
    const test_types = {
      'words_10':['wpm_pb_10_words','acc_pb_10_words'],
      'words_25': ['wpm_pb_25_words','acc_pb_25_words'],
      'words_50': ['wpm_pb_50_words','acc_pb_50_words'],
      'time_15':['wpm_pb_15_time','acc_pb_15_time'],
      'time_30':['wpm_pb_30_time','acc_pb_30_time'],
      'time_60':['wpm_pb_60_time','acc_pb_60_time']
    }
    if(parseInt(req.params.id) != req.user.user_id){return res.status(403).send("Forbbiden")}
    
    type_wpm = test_types[test_type][0]
    type_acc = test_types[test_type][1]
    const stats= await Stats.findByPk(req.user.user_id);
    prev_wpm = stats[type_wpm];
    prev_acc = stats[type_acc];
    prev_time = stats.total_time;
    prev_games = stats.total_games;

    prev_time += total_time;
    prev_games += 1;
    if(wpm>prev_wpm){
      prev_wpm = wpm
      prev_acc = acc
    }
    try{
      await Stats.update({
          [type_wpm]: prev_wpm,
          [type_acc]: prev_acc,
          total_time: prev_time,
          total_games: prev_games
        },{where: {user_id: req.user.user_id}}
      );
      return res.status(200).send("success");
    }catch (error){
      console.error("Error updating user stats:", error);
      return res.status(500).send("Internal Server Error");
    }
});

exports.updateUserStat = asyncHandler(async (req,res, next)=>{
    const {stat_type, stat_val} = req.body;

    const val = parseInt(req.body.stat_val);
    const id = parseInt(req.params.id)
    //console.log(id);
    const stats = await Stats.update(
        {[stat_type]: val},
        { where: { user_id: id } }
      )
    //handleResult(stats)
    return res.status(200).json({"status":"success"});
});

exports.initStats = asyncHandler(async (user_id, username)=>{
  const newStats = await Stats.create({
    user_id: user_id,
    username: username,
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
    acc_pb_50_words:0,
    total_time: 0,
    total_games: 0

  })
  return newStats;
})