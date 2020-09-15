const express = require('express');
const router = express.Router();
const PostBlood = require('../models/Blood_Users.js')

router.post('/postBloodUsers', (req, res) => {
    const blood = req.body;
    const newBlood = new PostBlood(blood)

    newBlood.save()
        .then(() => {
            res.send({ message: 'Blood added successfully' })
        })
        .catch(e => {
            console.log("Error ==>   ", e)
            res.send({ error: e.message })
        })
    console.log(blood)
})

router.get('/getBloodUsers', (req, res) => {
    const blood_users = PostBlood.find()
    console.log(blood_users)
    blood_users.then((allUsers) => {
        res.send({ result: allUsers })
    }).catch(e => {
        res.send({ error: e.message })
    })
})

module.exports = router;