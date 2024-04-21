const shortid = require('shortid');
const URL = require ('../model/url.model.js');

async function handleGenerateNewShortUrl(req , res) {
    const body = req.body
    if(!body.url) return res.status(400).json({ error : "URL is require"})
    const shortID = shortid();
    await URL.create({
        shortId : shortID,
        redirectURL: body.url,
        visitHistory : [],
        createBy:req.body._id,
    })

    return res.render("home",{id:shortID})
}
async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    console.log(result.visitHistory.length)
    return res.json({
        totalClick: result.visitHistory.length,
        analytics :  result.visitHistory,
    })
}
module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}