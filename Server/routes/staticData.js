const express = require('express');
const router = express.Router();
const Blood_Grps = require('../models/Blood_Grps.js');
const Urgencys = require('../models/Urgencys.js');
const Relations = require('../models/Relations.js');
const Hospitals = require('../models/Hospitals.js');

router.get('/getBloodGrps', (req, res) => {
    const blood_grps = Blood_Grps.find()
    console.log(blood_grps)
    blood_grps.then((allGroups) => {
        res.send({ result: allGroups })
    }).catch(e => {
        res.send({ error: e.message })
    })
})

router.get('/getUrgencys', (req, res) => {
    const urgencys = Urgencys.find()
    console.log(urgencys)
    urgencys.then((allUrgencys) => {
        res.send({ result: allUrgencys })
    }).catch(e => {
        res.send({ error: e.message })
    })
})

router.get('/getHospital', (req, res) => {
    const hospital = Hospitals.find()
    console.log(hospital)
    hospital.then((allHospital) => {
        res.send({ result: allHospital })
    }).catch(e => {
        res.send({ error: e.message })
    })
})

router.get('/getRelations', (req, res) => {
    const relations = Relations.find()
    console.log(relations)
    relations.then((allRelations) => {
        res.send({ result: allRelations })
    }).catch(e => {
        res.send({ error: e.message })
    })
})


module.exports = router;