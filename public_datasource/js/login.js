$(document).ready(function() {
    // validate register form on keyup and sumit
    $("#form-login").validate({
        errorClass: 'text-danger',
        rules: {
            username: {
                required: true,
                minlength: 5
            },
            password: {
                required: true,
                minlength: 5
            },
        },
        messages: {
            username: {
                required: "Please enter your username",
                minlength: "Your username must consist of at least 5 characters"
            },
            password: {
                required: "Please enter your password",
                minlength: "Your password must be at least 5 characters long"
            }
        }
    });
    $('#submit').click(function() {
        var validator = $('#form-login').valid();
        if (validator) {
            console.log(validator);
            console.log('login !');
            $('#form-login').submit();
        } else {
            return false;
        }
    });

})