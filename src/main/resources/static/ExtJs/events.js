//继承自Ext . util . Observable
var Person = Ext. extend (Ext.util.Observable,{
    constructor : function (name) {
        this.name = name;
        this.say = function () {
            this.fireEvent('onSay', this.name);//激发自定义事件
        }
        this.addEvents({//加入自定义事件
            "onSay": true
        });
    }
});
var per = new Person( 'tom' );//创建对象
//为自定义事件绑定处理函数
per.addListener( 'onSay' , function (name) {
    alert("i am  "+name);
});

Ext.util.Observable.capture (per, captureFunction);//为per对象添加拦截器
function captureFunction(eventName) {//拦截函数
    alert(eventName);
    return false;//false拦截器生效，程序不运行，true，程序继续运行
}
