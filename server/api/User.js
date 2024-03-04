const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const bcrypt = require('bcrypt');

router.post('/signup', (req,res) => {
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if( name == '' || email == '' || password == '' || dateOfBirth == ''){
        res.json({
            status: "Failed",
            message: "Empty input fields"
        });
    }else if(!/^[a-zA-Z]*$/.test(name)){
        res.json({
            status: "Failed",
            message: "Invalid name entered"
        });
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "Failed",
            message: "Empty email entered"
        });
    }else if(!new Date(dateOfBirth).getTime()){
        res.json({
            status: "Failed",
            message: "Empty DOB entered"
        });
    }else if(password.length < 8 ){
        res.json({
            status: "Failed",
            message: "Password too short"
        });
    }else{
        User.find({email}).then(result => {
            if(result.length){
                res.json({
                    status: "Failed",
                    message: "User already exists with the same email"
                });
            }else{
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "Success",
                            message: "Signup successful",
                            data: result,
                        });
                    }).catch(err => {
                        console.error(err);
                        res.json({
                            status: "Failed",
                            message: "An error occurred while saving user"
                        });
                    })
                })
                .catch(err => {
                    res.json({
                        status: "Failed",
                        message: "An error occurred while hashing the password"
                    });
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "Failed",
                message: "An error occured while checking for existing user"
            });
        })
    }
});

router.post('/signin', (req,res) => {
    
});

module.exports = router;