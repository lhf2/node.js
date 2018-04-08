/*.串行无关联：async.series(tasks,callback);
多个函数依次执行,之间没有数据交换,其中一个函数出错，后续函数不再执行 */
/*var async = require('async');
async.series({
    /!*one: function(callback){
        callback('null', 'one执行完毕');
    },*!/
    one: function(callback){
        callback('出错', 'one执行完毕');
    },
    two: function(callback){
        callback(null, 'two执行完毕');
    }
},function(err, results) {
    console.log(err);
    console.log(results);
});*/
//交叉执行
/*
function one(){
    ii = 0;
    setInterval(function(){
        console.log('aaa='+new Date());
        ii++;
        if(ii == 3){
            clearInterval(this)
        }
    },1000);
    console.log('one执行完毕');
}
function two(){
    jj = 0;
    setInterval(function(){
        console.log('bbb='+new Date());
        jj++;
        if(jj == 3){
            clearInterval(this)
        }
    },1000);
    console.log('two执行完毕');
}
one();
two();
console.log('主程序结束');*/
//先把aaa打出来在打bbb bbb打完之后在打结果 series
//混合打 并行无关联：async.parallel(tasks,callback);多个函数并行执行，最后汇总结果,如果某一个流程出错就退出（破坏下一个函数的回调）
/*var async = require('async');
function exec(){
    async.series({
        one:function(done){
            ii = 0;
            setInterval(function(){
                console.log('aaa='+new Date());
                ii++;
                if(ii == 3){
                    clearInterval(this);
                    done(null,'one执行完毕');
                }
            },1000);
        },
        two:function(done){
            jj = 0;
            setInterval(function(){
                console.log('bbb='+new Date());
                jj++;
                if(jj == 3){
                    clearInterval(this);
                    done(null,'two执行完毕');
                }
            },1000);
        },
    },function(err, results) {
        console.log(err);
        console.log(results);
    });
}
exec();*/
//waterfall 串行有关联
var async = require('async');
function exec(){
    async.waterfall([
        function(done){
            ii = 0;
            setInterval(function(){
                console.log('aaa='+new Date());
                ii++;
                if(ii == 3){
                    clearInterval(this);
                    done(null,'one执行完毕');
                }
            },1000);
        },
        function(preValue,done){
            jj = 0;
            setInterval(function(){
                console.log(preValue+"="+new Date());
                jj++;
                if(jj == 3){
                    clearInterval(this);
                    done(null,'two执行完毕');
                }
            },1000);
        },
    ],function(err, results) {
        console.log(err);
        console.log(results);
    });
}
exec();