var user = require('../model/usermodel');
const bcrypt = require('bcrypt');

exports.insert_data = async (req,res) => {
    try {
        var b_pass = await bcrypt.hash(req.body.password, 10);
        req.body.password = b_pass;

        var data = await user.create(req.body);

        res.status(200).json({
            status:"data insert",
            data
        })
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}
exports.login_user = async (req, res) => {
    try {       
        var data = await user.find({"email":req.body.email});
        if(data.length==1)
        {
            bcrypt.compare(req.body.password, data[0].password, function (err, result) {
                    if(result==true)
                    {
                        res.status(200).json({
                            status:"Login success"
                        })
                    }else{
                        res.status(200).json({
                            status: "check your email and password"
                        })
                    }
            });
        } else {
            res.status(200).json({
                status: "check your email and password"
            })
        }
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}