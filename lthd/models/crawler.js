module.exports = {
    get:function (responce) {
        var Crawler = require("crawler");
        var url = require('url');
        var arr = [];
        var c = new Crawler({
            maxConnections : 10,
            // This will be called for each crawled page
            callback : function (error, res, done) {
                if(error){
                    console.log(error);
                }else{
                    var $ = res.$;
                    var limit = 10;
                    var run=0;
                    $(".title_news a").each(function (index, a) {
                        var data = {href:'', title:''};
                        if (a.name == 'a' && run <= limit) {
                            data.href = a.attribs.href;
                            data.title = a.attribs.title;
                            arr.push(data);
                            run++;
                        }
                    });
                }
                done();
                responce.status(200).json(arr);

            }
        });
        c.queue('http://vnexpress.net/');
    }
};