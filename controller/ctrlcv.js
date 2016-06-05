var express = require('express');
var bodyparser = require('body-parser');
var ejs = require('ejs');
var helper = require('../helper/helper')
var di = require('../config/config');

var jsonparser = bodyparser.json();
var router = express.Router();

router.get('/', function(req, res) {
    var cvService = di.resolve('curriculum_vitae');
    cvServiceIns = new cvService();
    cvServiceIns.getEnableCV({
        Id: req.user.Id
    }, function(flag, rows) {
        var resObject = {
            cvs: rows
        };
        if (flag != -1) {
            if (flag == 1) {
                for (var i = 0; i < rows.length; i++) {
                    rows[i].CreatedDate = helper.parseDate(rows[i].CreatedDate);
                }
            }
            res.render('pages/cv_list', resObject);
        } else {
            res.status(500).render('pages/generic_error');
        }
    });
});

router.post('/', [jsonparser], function(req, res) {
    var cvService = di.resolve('curriculum_vitae');
    var cv_section_service = di.resolve('cv_section');
    cvServiceIns = new cvService();
    cvServiceIns.createCV({
        Name: req.body.cvname,
        UserId: req.user.Id
    }, function(flag, data) {
        // TUNG CODE FOR ADDING LIST SECTION FOR CV
        var createlistcv_section = new cv_section_service();
        createlistcv_section.createlistCV_Section_CV_Id(data.Id, function(err,count){
            if(err && count < 7){
                res.status(500).render('pages/generic_error');
            }else{
                res.json({
                    flag: flag,
                    data: data
                });
            }
        });
        
    });
});

router.post('/:idcv/update', [jsonparser], function(req, res) {
    var cvService = di.resolve('curriculum_vitae');
    cvServiceIns = new cvService();
    var paramObject = req.body;
    paramObject["Id"] = req.params.idcv;
    cvServiceIns.updateCV({
        Name: req.body.cvname,
        UserId: 1,
        Id: req.params.idcv
    }, function(flag, data) {
        var resData = {};
        if (flag == 1) {
            resData.IsSuccess = 1;
            resData.Name = data.Name;
        } else if (flag == 0) {
            resData.IsSuccess = 0;
            resData.Error = data;
        } else {
            resData.IsSuccess = -1;
            resData.Error = data;
        }
        res.json(resData);
    });
});

router.post('/disableCV', [jsonparser], function(req, res) {
    var param = {
        id: req.body.id
    };
    var cvService = di.resolve('curriculum_vitae');
    cvServiceIns = new cvService();
    console.log('in');
    cvServiceIns.disableCV(param, function(code, data) {
        console.log('done');
        console.log(code);
        var resData = {};
        if (code == 1) {
            resData.IsSuccess = true;
        } else {
            resData.IsSuccess = false;
        }
        res.json(resData);
    })
});

router.get('/:idcv', function(req, res) {
    var param = {
        idcv: req.params.idcv,
        userid: req.user.Id
    };
    var cvService = di.resolve('curriculum_vitae');
    cvServiceIns = new cvService();
    cvServiceIns.getByIdCV(param, function(code, row) {
        // dam vao day
        if (code == 1) {
            res.render('pages/cv_index', {
                data: row.cvdata,
                cv_section: row.cv_section
            });
        } else if (code == 0) {
            res.status(404).render('pages/not_found_404');
        } else if (code == -1) {
            res.status(500).render('pages/generic_error');
        }
    });
});

module.exports = router;