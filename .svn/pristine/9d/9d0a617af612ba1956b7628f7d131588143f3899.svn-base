var async = require('async'),
    needle = require('needle');
exports.mainRouter = function (router,common){
    router.get('/order/:module/:id',function (req, res, next) {
        var module = req.params.module,
            handObj = { rateCode: req.params.id};
        if(module==='combo'||module==='shop'){
            handObj.goodsCode=req.query.goodsCode;
        }
        if(module==='combo'||module==='ticket'){
            handObj.parkId = req.query.parkId||'';
        }
        handObj.corpCode="cgb2cfxs";
        var _o = {'content-type': 'text/html;charset=utf-8',headers: {'access-token':req.session.token||""},timeout: 100000};

        async.waterfall([function(cb){
            var url=common.gul([module,'order','main']);
            needle.request('get',url,handObj,_o,function (err, resp, body) {
                var res1 = typeof body === 'string' ? JSON.parse(body) : body;
                if (!err && resp.statusCode === 200){

                    if (res1.status!=200){
                        if(res1.status==400){
                            _p.req.session.curUrl=_p.req.originalUrl;
                            res.redirect('/login');
                        }else{
                            req.flash('message',res1.message);
                            res.redirect('/error');
                        }
                    }else{
                        cb(null,res1);
                    }
                }else{
                    if(res1.status==400){
                        req.session.curUrl=req.originalUrl;
                        res.redirect('/login');
                    }else{
                        req.flash('message',res1.message);
                        res.redirect('/error');
                    }
                }
            })
        },function (result,cb) {
            var _u=common.gul(['main','ratecode','stockprices']),_u1=common.gul(['main','ratecode','ruleBuy']);
            var postm={rateCode:result.data.rateCode,corpCode:"cgb2cfxs"};
            if(module==='shop'){
                _u=common.gul(['shop','order','getStock']);
                postm={modelCode:result.data.modelCode,corpCode:"cgb2cfxs"}
            }
            var funArry=[function(callBack){
                needle.request("get",  _u, postm, _o, function (err,resp,body){
                    var res2 = typeof body === 'string' ? JSON.parse(body) : body;
                    if (!err && resp.statusCode === 200){
                        if (res2.status!=200){
                            req.flash('message',res2.message);
                            res.redirect('/error');
                        }else{
                            callBack(null,res2);
                        }
                    }else{
                        if(res2.status==400){
                            req.session.curUrl=req.originalUrl;
                            res.redirect('/login');
                        }else{
                            req.flash('message',res2.message);
                            res.redirect('/error');
                        }
                    }
                });
            }];
            if(result.data.ruleBuyCode){
                funArry.push(function(callBack){
                    needle.request("get",  _u1, {ruleBuyCode:result.data.ruleBuyCode,corpCode:"cgb2cfxs"}, _o, function (err,resp,body){
                        var res2 = typeof body === 'string' ? JSON.parse(body) : body;
                        if (!err && resp.statusCode === 200){
                            if (res2.status!=200){
                                req.flash('message',res2.message);
                                res.redirect('/error');
                            }else{
                                callBack(null,res2);
                            }
                        }else{
                            if(res2.status==400){
                                req.session.curUrl=req.originalUrl;
                                res.redirect('/login');
                            }else{
                                req.flash('message',res2.message);
                                res.redirect('/error');
                            }
                        }
                    });
                });
            }
            if(module==='shop'){
                if(req.query.getType==0) {
                    var _u2 = common.gul(['shop', 'order', 'listArea']);
                    funArry.push(function (callBack) {
                        needle.request("get", _u2, {corpCode: "cgb2cfxs"}, _o, function (err, resp, body) {
                            var res2 = typeof body === 'string' ? JSON.parse(body) : body;
                            if (!err && resp.statusCode === 200) {
                                if (res2.status != 200) {
                                    req.flash('message', res2.message);
                                    res.redirect('/error');
                                } else {
                                    callBack(null, res2);
                                }
                            } else {
                                if (res2.status == 400) {
                                    req.session.curUrl = req.originalUrl;
                                    res.redirect('/login');
                                } else {
                                    req.flash('message', res2.message);
                                    res.redirect('/error');
                                }
                            }
                        });
                    });
                }else{
                    var _u3=common.gul(['shop','order','listPoint']);
                    funArry.push(function(callBack){
                        needle.request("get",  _u3, {corpCode:"cgb2cfxs",modelCode:req.query.goodsCode}, _o, function (err,resp,body){
                            var res2 = typeof body === 'string' ? JSON.parse(body) : body;
                            if (!err && resp.statusCode === 200){
                                if (res2.status!=200){
                                    req.flash('message',res2.message);
                                    res.redirect('/error');
                                }else{
                                    callBack(null,res2);
                                }
                            }else{
                                if(res2.status==400){
                                    req.session.curUrl=req.originalUrl;
                                    res.redirect('/login');
                                }else{
                                    req.flash('message',res2.message);
                                    res.redirect('/error');
                                }
                            }
                        });
                    });
                }
            }
            async.parallel(funArry,function(err,results){
                results.splice(0, 0, result);
                cb(null,results);
            });
        }],function (err,results) {
            console.log(results);
            var reObj={};
            if (module === 'hotel'){
                reObj.beginDate = req.session.beginDate;
                reObj.endDate = req.session.endDate;
                reObj.numDays = req.session.numDays;
            }else if (module === 'traffic'){
                reObj.begin = req.query.begin;
            }else if(module==='shop'){
                reObj.getType=req.query.getType;
            }
            res.render("order/main",{title: common.pageTitle(module) + '订单',data:results,reObj:reObj,module:module});
        })
    });

    router.post('/order/:module/:id',function (req, res, next) {
        var module=req.params.module;
        urlArr=['order','saveOrder'];
        parameter=req.body;
        parameter.accountType=4;
        parameter.busiType=module;
        parameter.wayType="0"
        parameter.linkMans=parameter.linkMans.toString();
        parameter.teles=parameter.teles.toString();
        if(parameter.idNos){
            parameter.idNos=parameter.idNos.toString();
        }
        if(req.session.member){
            parameter.leaguerId=req.session.member.id;
        }
        if(module==='shop'){
            parameter.paramExtension=parameter.paramExtension.toString();
        }
        parameter.corpCode="cgb2cfxs";
        var _u3=common.gul(['order','saveOrder']),
            _u2=common.gul(['member','info']),
            _u1=common.gul(['main','fastregByAccoun']),
            u2par={
                loginName:parameter.teles,
                channel:'lots pc',
                idcard:parameter.idNos,
                realName:parameter.linkMans
            },
            _o = {'content-type': 'text/html;charset=utf-8',headers: {'access-token':req.session.token||""},timeout: 100000};

        async.waterfall([function(cb){
            needle.request("get",  _u1, u2par, _o, function (err,resp,body){
                var res2 = typeof body === 'string' ? JSON.parse(body) : body;
                console.log(res2)
                if (!err && resp.statusCode === 200){
                    cb(null,res2);
                }else{
                    if(res2.status==400){
                        req.session.curUrl=req.originalUrl;
                        res.redirect('/login');
                    }else{
                        req.flash('message',res2.message);
                        res.redirect('/error');
                    }
                }
            });
        },function (result, cb) {
            req.session.token=result.data.token;
            _o.headers['access-token']=req.session.token;
            needle.request("GET", _u2, {leaguerId:result.data.leaguerId}, _o, function (err,resp,body){
                var res2 = typeof body === 'string' ? JSON.parse(body) : body;
                if(res2.status==200){
                    req.session.member=res2.data;
                    cb(null,res2)
                }
            });
        },function(result,cb){
            parameter.leaguerId=req.session.member.id;
            needle.request("post",  _u3, parameter, _o, function (err,resp,body){
                var res2 = typeof body === 'string' ? JSON.parse(body) : body;
                if (!err && resp.statusCode === 200){
                    cb(null,res2);
                }else{
                    if(res2.status==400){
                        req.session.curUrl=req.originalUrl;
                        res.redirect('/login');
                    }else{
                        req.flash('message',res2.message);
                        res.redirect('/error');
                    }
                }
            });
        }],function (err,results) {
            req.session.orderinfo=results.data;
            res.json([results]);

        });
        // common.commonRequest({
        //     url: [{
        //         urlArr: urlArr,
        //         parameter: parameter
        //     }],
        //     req: req,
        //     res: res,
        //     isAjax: true,
        //     callBack: function (results,reqs,resp,handTag){
        //         req.session.orderinfo=results[0].data;
        //         // var loginId = req.session.member ? req.session.member.id : (req.session.loginId || results[0].datas.id);
        //
        //         // handTag.tag = 0;
        //         // req.session.loginId = loginId;
        //         // res.send(results);
        //     }
        // });
    });
    //获取邮费
    router.post('/getPostage',function (req, res, next) {
        common.commonRequest({
            url: [{
                urlArr: ['shop','order','getPostage'],
                parameter: req.body
            }],
            req: req,
            res: res,
            isAjax: true,
            callBack: function (results,reqs,resp,handTag){

            }
        });
    })

}