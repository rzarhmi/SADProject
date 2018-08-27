
Parse.Cloud.afterSave(Parse.User,function (req,res){
    var obj = req.object;
    console.log("ssss");
    if (obj.get("Type") === "employee"){
        var salaryval = obj.get("salary");
        var Salary = Parse.Object.extend("Salary");
        var query = new Parse.Query(Salary);
        query.equalTo("username", obj.username);
        query.first({
            success: function(results) {
                if (results) {
                    results.set("username",obj.get("username"));
                    results.set("amount",salaryval.toString());
                    results.save();
                    res.success();
                    console.log("ok exist");
                }
                else {
                    var results = new Salary();
                    results.set("username",obj.get("username"));
                    results.set("amount",salaryval.toString());
                    results.save();
                    res.success();
                    console.log("not exist");
                    res.success();
                }
            },
            error: function(error) {
                console.log("Error in cloud: " + error.code + " " + error.message);
                res.error();
            }
        });
    } else{
        res.success();
    }

});

