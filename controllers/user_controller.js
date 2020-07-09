const User = require('../models/user')

module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}
//sign UP page
module.exports.signUp = function(req,res){
    return res.render('user_signUP',{
        title: "Social || Sign Up"
    })
}
// Sign In page
module.exports.signIn = function(req,res){
    return res.render('user_signIN',{
        title: "Social || Sign In"
    })
}
//Sign UP page
module.exports.create = function(req,res){
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}, function(err,user){
        if(err){
            console.log("Error In finding User in SIGNUP");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating User while Sign UP");
                    return;
                }
                return res.redirect('/users/signIn');
            })
        }else{
            return res.redirect('back');
        }
    })

}

//Sign IN page
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}