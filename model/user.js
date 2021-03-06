function userModel(firstName, lastName, username, email, password, createdDate, verifyToken, isConfirmed, isBlocked, resetToken, resetExpired) {
    var self = this;
    self.attribute = {
        "Firstname": firstName,
        "Lastname": lastName,
        "Username": username,
        "Email": email,
        "PasswordHash": password,
        "CreatedDate": createdDate,
        "VerifyToken": verifyToken,
        "IsConfirmed": isConfirmed,
        "IsBlocked": isBlocked,
        "ResetPasswordToken": resetToken,
        "ResetPasswordExpire": resetExpired
    }

    self.attrvalidate = [{
        attrname: "Username",
        validate: function (username) {
            this.valid = false;
            this.required = true;
            this.min = 5;
            this.max = 50;
            if (username != null || username !== "" || username != undefined) {
                var length = username.length;
                if (length > this.min && length <= this.max) {
                    this.valid = true;
                }
            }
            return this.valid;
        }
    }, {
            attrname: "PasswordHash",
            validate: function (password) {
                this.valid = false;
                this.required = true;
                if (password != null || password !== "" || password != undefined) {
                    this.valid = true;
                }
                return this.valid;
            }
        }, {
            attrname: "Firstname",
            validate: function (firstName) {
                this.valid = false;
                this.required = true;
                this.min = 1;
                this.max = 50;
                if (firstName != null || firstName !== "" || username != undefined) {
                    var length = firstName.length;
                    if (length > this.min && length <= this.max) {
                        this.valid = true;
                    }
                }
                return this.valid;
            }
        }, {
            attrname: "Lastname",
            validate: function (lastName) {
                this.valid = false;
                this.required = true;
                this.min = 1;
                this.max = 50;
                if (lastName != null || lastName !== "" || lastName != undefined) {
                    var length = lastName.length;
                    if (length > this.min && length <= this.max) {
                        this.valid = true;
                    }
                }
                return this.valid;
            }
        }, {
            attrname: "CreatedDate",
            validate: null
        }, {
            attrname: "IsBlocked",
            validate: null
        }, {
            attrname: "VerifyToken",
            validate: null
        }, {
            attrname: "ResetPasswordToken",
            validate: null
        }, {
            attrname: "ResetPasswordExpire",
            validate: null
        }, {
            attrname: "IsConfirmed",
            validate: null
        }, {
            attrname: "Email",
            validate: function (email) {
                this.valid = false;
                this.required = true;
                this.regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
                if (email != null || email !== "") {
                    this.valid = this.regex.test(email);
                }
                return this.valid;
            }
        }];

    self.checkValidation = function () {
        var valid = true;
        var attr_length = self.attrvalidate.length;
        for (var i = 0; i < attr_length; i++) {
            if (this.attrvalidate[i].validate != null) {
                valid &= self.attrvalidate[i].validate(self.attribute[self.attrvalidate[i].attrname]);
            }
        }
        return valid;
    }

    var User = require('../config/config').resolve("db").User;
    this.addUser = function (user, callback) {
        var newUser = new User(user);
        newUser.save(function (err, data) {
            newUser.killConnection();
            if (err) {
                callback(-1, err);
            } else {
                self.attribute.Id = data.insertId;
                callback(1, self.attribute)
            }
        });
    }
    this.updateUser = function (newUser, callback) {
        var user = new User(newUser);
        user.save();
        user.set('id', newUser.Id);
        user.save(function (err, data) {
            user.killConnection();
            /* istanbul ignore if  */
            if (err) {
                callback(-1, err);
            }
            /* istanbul ignore else  */
            else {
                callback(1, err);
            }
        });
    }
    this.getAllUser = function (callback) {
        user = new User();
        user.find('all', function (err, rows, fields) {
            user.killConnection();
            if (err) {
                callback(-1, err);
            } else {
                if (rows == null) {
                    callback(0, null);
                } else {
                    callback(1, rows);
                }
            }
        });
    }
    this.getByUsername = function (username, callback) {
        user = new User();
        user.find('first', {
            where: "Username = '" + username + "'"
        }, function (err, row) {
            user.killConnection();
            if (err) {
                callback(-1, err);
            } else {
                if (row == null) {
                    callback(0, null);
                } else {
                    callback(1, row);
                }
            }
        });
    }
    this.getByEmail = function (email, callback) {
        user = new User();
        user.find('first', {
            where: "Email = '" + email + "'"
        }, function (err, row) {
            user.killConnection();
            if (err) {
                callback(-1, err);
            } else {
                if (row == null) {
                    callback(0, null);
                } else {
                    callback(1, row);
                }
            }

        });
    }
    this.getByVerifyToken = function (token, callback) {
        user = new User();
        user.find('first', {
            where: "VerifyToken = '" + token + "'"
        }, function (err, row) {
            user.killConnection();
            if (err) {
                callback(-1, err)
            } else {
                if (row == null) {
                    callback(0, null);
                } else {
                    callback(1, row);
                }
            }
        });
    }
    this.getByResetPassToken = function (token, callback) {
        user = new User();
        user.find('first', {
            where: "ResetPasswordToken = '" + token + "'"
        }, function (err, row) {
            user.killConnection();
            if (err) {
                callback(-1, err)
            } else {
                if (row == null) {
                    callback(0, null);
                } else {
                    callback(1, row);
                }
            }
        });
    }
    this.getAllUserWithNumOfCV = function (callback) {
        user = new User();
        var query = 'SELECT u.Id, u.Firstname, u.Lastname, u.Username, u.Email, u.CreatedDate, u.IsConfirmed, u.IsBlocked, COUNT(c.UserId) as CV' +
            ' FROM user u' +
            ' LEFT JOIN curriculum_vitae c' +
            ' ON u.Id = c.UserId'+
            ' WHERE u.Id NOT IN('+
            ' SELECT UserId'+
            ' FROM user_role'+
            ' WHERE RoleId = 1)'+
            ' GROUP BY c.UserId';
        user.query(query, function (err, data) {
            user.killConnection();
            if (err) {
                callback(-1, err, null);
            }
            callback(1, null, data);
        })
    }
    this.getUserRoleByUsername = function (username, callback) {
        user = new User();
        user.find('first', {
            where: "Username = '" + username + "'"
        }, function (err, row) {
            if (err) {
                callback(-1, err);
            } else {
                var query = 'SELECT ur.RoleId FROM user_role ur WHERE ur.UserId=' + row.Id;
                user.query(query, function (_err, _data) {
                    user.killConnection();
                    if (_err) {
                        callback(-1, _err, null);
                    }
                    else
                        if (_data.length == 0)
                            callback(0, null, null);
                        else
                            if (_data[0].RoleId == 1)
                                callback(1, null, 'admin');
                            else
                                callback(1, null, 'user');
                });
            }
        });

    }
}

module.exports = userModel;