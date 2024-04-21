const express = require ('express');
const { handleGenerateNewShortUrl, handleGetAnalytics } = require('../controllers/url.controller.js');
const { model } = require('mongoose');

const router = express.Router();

router.post('/',handleGenerateNewShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;