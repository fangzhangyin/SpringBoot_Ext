Ext.onReady(function () {

    //定义数据局模型
    Ext.regModel('people',
        {fields://定义模型字段
                [
        {name:'name',type:'string'},
        {name:'id',type:'int'},
        {name:'password',type:'string'}
        ]
        });
    var peo=Ext.ModelMgr.create({
        name:'tom',
        id:10,
        password:'asdfasdf'
    },'people');
    alert(peo.get('name'));

    //定义默认的提示信息
    Ext.data.validations.presenceMessage='必须是有效值';
    Ext.data.validations.lengthMessage='长度错误';
    Ext.data.validations.exclusionMessage='不可接受的值';
    Ext.data.validations.formatMessage='格式错误';
    Ext.data.validations.inclusionMessage='值有定义，数据不再定义的范围内';

    //自定义数值范围验证
    Ext.apply(Ext.data.validations,{
        number:function (config,value) {
            if(value==undefined){
                return false;
            }
            var min=config.min;
            var max=config.max;
            if((min&&value<min)||(max&&value>max)){
                return false
            }else {return true;}
        },
        numberMessage:'数值范围错误'
    });

    //定义数据模型
    Ext.regModel('user',{
        fields:[
            {name:'name', type:'string'},
            {name:'age', type:'int'},
            {name:'phone', type:'string'},
            {name:'gender', type:'string'},
            {name:'username', type:'string'},
            {name:'alive', type:'boolean',defaultValue:true}

        ],validations:[
            {type:'presence', field:'age'},
            {type:'number', field:'age' ,min:30},
            {type:'length', field:'name',min:2},
            {type:'inclusion', field:'gender',list:['男','女']},
            {type:'exclusion', field:'username',list:['admin@xx.xx','user@xx.xx']},
            {type:'format', field:'username',matcher:'/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/'}
        ]
    });
    var use=Ext.ModelMgr.create({
        name:'tom',
        age:24,
        gender:'man',
        username:'abc'
    },user);
    //执行数据验证
    var error=use.validate();
    var message=[];
    error.each(function (v) {
        message.push(v.field+":"+v.message)
    });
    alert(message.join('\n'));

});