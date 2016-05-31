var curriculum_vitae_model = require('../model/cv');

function curriculum_vitae_service() {
    this.getAllCV = function (param, cb) {
        var c = new curriculum_vitae_model();
        c.getAllCV(param, cb);
    }

    this.getEnableCV = function (param, cb) {
        var c = new curriculum_vitae_model();
        c.getEnableCV(param, cb);
    }

    this.disableCV = function (param, cb) {
        var c = new curriculum_vitae_model();
        c.disableCV(param, cb);
    }

    this.getByIdCV = function (param, cb) {
        var c = new curriculum_vitae_model();
        c.getByIdCV(param.id, cb);
    }

    this.createCV = function (param, callback) {
        var date=new Date();
        var paramCreatedDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+(date.getHours())+':'+(date.getMinutes()+1)+':'+(date.getSeconds()+1);
        var dbcv_create = new curriculum_vitae_model(param.Name, paramCreatedDate, 0, null, param.UserId, null);
        var valid = dbcv_create.checkValidation();
        if (valid) {
            dbcv_create.save(dbcv_create.attribute, callback);
        } else {
            callback(0,dbcv_create.attrvalidate);
        }
    }

    this.updateCV = function (param, callback) {
        //only user date to test, after that delete param createddate
        var date=new Date();
        var paramCreatedDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+(date.getHours())+':'+(date.getMinutes()+1)+':'+(date.getSeconds()+1);
        var dbcv_save = new curriculum_vitae_model(param.Name, paramCreatedDate, 0, null, param.UserId, param.Id);
        var valid = dbcv_save.checkValidation();
        if (valid) {
            dbcv_save.save(dbcv_save.attribute, callback);
        } else {
            callback(0,dbcv_save.attrvalidate);
        }
    }

    this.checkCVBelongToUser = function (cv_id, userid, callback) {
        var c = new curriculum_vitae_model();
        c.checkCVBelongToUser(cv_id, userid, function(code, data){
            console.log(code);
            if(code == 1){
                var exist = data[0].Exist == 0 ? false : true;
                callback(code, exist);
            }else{
                callback(code, data);
            }
        });
    }
}

module.exports = curriculum_vitae_service;
