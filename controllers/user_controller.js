const User = require('../models/user');


module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}


module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         req.flash('success', 'Updated!');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    // }
    
    if(req.user.id == req.params.id){
        try {
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadAvatar(req,res, function(error){
                if(error){
                    console.error('** MULter ERROR***',error);
                }
                
                user.name = req.body.name;
                user.email = req.body.email;
                if(user.file){
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', 'Got your photo');
                res.redirect('back');
            })

        } catch (error) {
            req.flash('error', err);
            return res.redirect('back');
        }

    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');       
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        
        if(err){req.flash('error' , 'Email already exists');; return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error' , 'Incorrect User name or password'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success' , 'Logged out Successfully');   // flash 
    return res.redirect('/');
}