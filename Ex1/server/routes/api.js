const router = require("express").Router();
const Videos = require("../models/shortVideoModel")


router.post('/v2/posts', (req, res) => {
    const dbVideos = req.body;
    Videos.create(dbVideos, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    }) 
})

router.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

module.exports = router