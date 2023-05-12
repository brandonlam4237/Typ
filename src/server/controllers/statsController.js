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