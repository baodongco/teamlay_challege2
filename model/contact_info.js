/*
// mandatory: firstname, lastname, avatar, email, phone, website, address, cv_id
// optional: id
*/
function Contact_Info(firstname, lastname, avatar, email, phone, website, address, cv_id, id) {
    var self = this;
    self.attribute = {
        "FirstName" : firstname,
        "LastName" : lastname,
        "Avatar" : avatar || "/img/default_avatar.jpg",
        "Email" : email,
        "Phone" : phone,
        "Website" : website,
        "Address" : address,
        "CV_Id" : cv_id
    }

    self.attrvalidate = [
        {validate: function(firstname){
            this.valid = false;
            this.required = true;
            this.min = 1;
            this.max = 50;
            if(firstname !=null || firstname !== ""){
                    var length = firstname.length;
                    if(length >= this.min && length <= this.max ){
                        this.valid = true;
                    }
            }
            return this.valid;
        }, attrname: "FirstName"},
        {validate: function(lastname){
            this.valid = false;
            this.required = true;
            this.min = 1;
            this.max = 50;
            if(lastname !=null || lastname !== ""){
                    var length = lastname.length;
                    if(length >= this.min && length <= this.max ){
                        this.valid = true;
                    }
            }
            return this.valid;
        }, attrname: "LastName"},
        {validate: function(avatar){

            this.valid = false;
            this.required = false;
            this.datatype = "data:image";
            this.maxsize = 5242880;
            var default_link = "/img/default_avatar.jpg";

            var datatype_input = avatar.substring(0, 10);
            if(this.datatype == datatype_input){
                if(this.maxsize >= avatar.length){
                    // getextension of image
                    function getextension(image){
                        var ext = ".";
                        for(var i = 11; ; i++){
                            if(image[i] == ';')break;
                            ext+= image[i];
                        }
                        return ext;
                    }
                    /*
                    //http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
                    // get base64
                    */
                    function decodeBase64Image(image) {
                        /*
                        //var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                        */
                        var data = image.replace(/^data:image\/\w+;base64,/, '');
                        return new Buffer(data, 'base64');
                    }
                    
                    
                    function makestringrandom(){
                        var uuid = require('node-uuid');
                        var text = uuid.v1();
                        return text;
                    }
                    
                    
                    self.attribute["Avatar"] = "avatars/" + makestringrandom() + getextension(avatar);
                    var imageBuffer = decodeBase64Image(avatar);
                    var fs = require('fs');
                    fs.writeFileSync(self.attribute["Avatar"], imageBuffer, {encoding: 'base64'},function(err) { console.log(err); });
                    this.valid = true;
                }else{
                    this.valid = false;
                }
            }else{
                if(avatar != ""){
                    avatar = default_link;
                }
                this.valid = true;
            }

            return this.valid;
        }, attrname: "Avatar"},
        {validate: function(email){
            this.valid = false;
            this.required = true;
            this.regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
            if(email !=null || email !== ""){
                    this.valid = this.regex.test(email);
                }
            return this.valid;
        }, attrname: "Email"},
        {validate: function(phone){
            this.valid = false;
            this.require = true;
            this.regex = /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/;
            if(phone !=null || phone !== ""){
                this.valid = this.regex.test(phone);
            }
            return this.valid;
        }, attrname: "Phone"},
        {validate: function(website){
            this.valid = true;
            this.max = 100;
            if(website !=null || website !== ""){
                var length = website.length;
                if(length >= this.max ){
                    this.valid = false;
                }
            }
            return this.valid;
        },attrname: "Website"},
        {validate: function(address){
            this.valid = true;
            this.max = 250;
            if(address !=null || address !== ""){
                var length = address.length;
                if(length >= this.max ){
                    this.valid = false;
                }
            }
            return this.valid;
        },attrname: "Address"},
        {validate: null,attrname: "CV_Id"}];
        

        /*
    // return true if all attribute are valid if not false;
    */
    self.checkValidation = function(){
        var valid = true;
        var attr_length = self.attrvalidate.length;
        for(var i = 0; i < attr_length; i++){
            if(this.attrvalidate[i].validate != null){
               valid  &= self.attrvalidate[i].validate(self.attribute[self.attrvalidate[i].attrname]);
            }
        }
        return valid;
    }

    var contact_info = require('../config/config').resolve("db").contact_info;
    /*
    // the reqdata paramater is id of the CV
    // callback is a callback function data returned and status
    */
    self.getByIdCV = function(reqdata, callback) {
        var temp = new contact_info();
        temp.find('first', {fields: ['Id', 'FirstName', 'LastName','Avatar','Email','Phone','Website','Address','CV_Id'],where: "CV_Id = " + reqdata},function(err,row,fields){
           temp.killConnection();
           if(err){
                callback(-1, err)
            }else{
                if(row == null){
                     callback(0, null);
                }else{
                    callback(1, row);
                }
            }
        });
    }
    /*
    // the reqdata paramater is object
    // callback is a callback function data returned and status
    */
    self.save = function(reqdata, callback){
        var gettemp = new contact_info();
        var savetemp = new contact_info(reqdata);
        gettemp.find('first', {fields: ['Id'], where: "CV_Id = " + reqdata.CV_Id},function(err,row,fields){
            
            var id = null;
            if(row != null){
                id = row.Id;
            }
            if(id != null){
                savetemp.set('id',id);
                savetemp.save(function(err,data){
                    savetemp.killConnection();
                    gettemp.killConnection();
                    if(err){
                        callback(-1, err)
                    }else{
                        self.attribute.Id = data.insertId;
                        callback(1, self.attribute)
                    }
                });
            }else{
                savetemp.save(function(err,data){
                    savetemp.killConnection();
                    gettemp.killConnection();
                    if(err){
                        callback(-1, err)
                    }else{
                        self.attribute.Id = data.insertId;
                        callback(1, self.attribute)
                    }
                });
            }

        });
    }
}

module.exports = Contact_Info;
