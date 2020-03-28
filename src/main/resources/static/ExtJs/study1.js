Ext.onReady(function () {
    //创建数据模型
    Ext.regModel('date',{fields:[{name:'city'},{name:'code'}]});
    Ext.apply(Ext.form.VTypes,{
       email:function (v) {
           return  /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(v);
       },
        emailText:'请输入正确的邮箱',
        emailMask:''
    });
    var citydate=Ext.create('Ext.data.Store',{
       model:'date',
       data:[
           {city:'北京',code:'100000'},
           {city:'天津',code:'101000'},
           {city:'杭州',code:'123000'},
           {city:'深圳',code:'103400'},
           {city:'上海',code:'100346'}
       ]
    });

    Ext.regModel('bookinfo',{fields:[{name:'bookname'}]});
    var bookstore = Ext.create('Ext.data.Store', {
        model: 'bookinfo',
        proxy: {
            type: 'ajax',
            url: 'booklist',
            reader: new Ext.data.JsonReader({model: 'bookinfo'})
        }
    });

   Ext.QuickTips.init();//初始化信息提示功能
    var form=new Ext.form.Panel({
        title:'表单',
        height:600,
        width:300,
        frame:true,
        renderTo:'form1',
        defaults:{
           // autoFitError:false,//提示信息时是否自动调整字段组件宽度
            labelSeparator:':',
            labelWidth:60,
            width:280,
            allowBlank:false,
            blankText:'不允许为空',
            labelAlign:'left',
            msgTarget:'qtip'//显示一个浮动的提示信息
            //msgTarget:'title'//浏览器原始的浮动提示信息
            //msgTarget:'under'//在字段下方显示浮动信息
            //msgTarget:'side'//在字段右边显示字段信息
            //msgTarget:'none'//无提示信息
            //msgTarget:'errorMsg'//在errorMsg中显示提示信息
        },
        items:[{
            xtype:'textfield',
            name:'username',
            id:'username',
            fieldLabel:'姓名'//标签内容
        },{
            name:'age',
            xtype:'numberfield',
            fieldLabel:'年龄'//标签内容
        },{
            name:'password',
            xtype:'textfield',
            fieldLabel:'密码',
            inputType:'password'
        },{
            xtype:'textarea',
            fieldLabel:'多行文本',
            name:'textArea'
        },{
            xtype:'textfield',
            fieldLabel:'email',
            name:'email',
            vtype:'email',
        },{
            xtype:'radiogroup',
            fieldLabel:'性别',
            columns:2,
            items:[
                {boxLabel:'男',name:'sex',inputValue:'male'},
                {boxLabel:'女',name:'sex',inputValue:'female'}
            ]
        },{
            xtype:'checkboxgroup',
            fieldLabel:'复选框',
            columns:3,//3列
            items:[
                {boxLabel:'游泳',name:'swim'},
                {boxLabel:"走路",name:'walk'},
                {boxLabel:'游戏',name:'game'},
                {boxLabel:'电影',name:'film'}
                ]
        },{
            xtype:'triggerfield',
            id:'memo',
            fieldLabel:'触发字段',
            hideTrigger:false,
            onTriggerClick:function () {
                var memo=form.getForm().findField('memo');
                alert(memo.getValue());
                Ext.getCmp('memo').setValue('测试');
            }

        },{
            xtype:'spinnerfield',
            fieldLabel:'微调字段',
            id:'spinner',
            value:100,//初始化字段
            onSpinUp:function () {
                var memo=Ext.getCmp('spinner');
                memo.setValue(Number(memo.getValue())+1);
            },
            onSpinDown:function () {
                var memo=Ext.getCmp('spinner');
                memo.setValue(Number(memo.getValue())-1);
            }
        },{
            xtype:'combo',
            listConfig:{
                emptyText:'未找到匹配值',//当值不存在列表中的信息
                maxHeight:60//下拉列表的最大高度为60像素
            },
            name:'post',
            fieldLabel:'邮政编码',
            triggerAction:'all',//单击按钮显示全部数据
            store:citydate,//设置数据源
            displayField:'city',//定义要显示的字段
            valueField:'code',//定义值的字段
            queryMode:'local',//本地模式
            forceSelection:true,//要求输入值必须在列表中存在
            typeAhead:true,//允许自动自动匹配的剩余文本（类似模糊查询）
            value:'100000'//默认显示北京
        },{
            xtype:'combo',
            fieldLabel:'书籍列表',
            name:'book',
            listConfig:{
                loadingText:'正在加载信息',//加载中的信息
                emptyText:'未找到匹配值',//当值不存在列表中的信息
                maxHeight:60//下拉列表的最大高度为60像素
            },
            allQuery:'allbook',
            minChars:3,//输入的最小字符数量
            queryDelay:300,//设置延迟时间
            queryParam:'searchbook',
            triggerAction:"all",
            store:bookstore,
            displayField:'bookname',//定义要显示的字段
            valueField:'bookname',//定义值的字段
            queryMode:'remote'//远程模式
        },{
            fieldLabel:'时间选择器',
            xtype:'timefield',
            autoFitErrors:false,//展示错误信息自动调整字段宽度
            maxValue:'18:00',//定义最大的选择时间
            maxText:'时间应该小于{0}',//超过最大时间的提示信息
            minValue:'10:00',
            name:'timer',
            minText:'时间应该大于{0}',
            pickerMaxHeight:70,//下拉框的高度
            increment:60,//设置时间间隔为60分钟
            format:'G时i分s秒',//设置时间格式
            invalidText:'时间格式无效'
        },{
            fieldLabel:'日期选择器',
            xtype:'datefield',
            autoFitErrors:false,//展示错误信息自动调整字段宽度
            maxValue:'12/31/2020',//定义最大的选择时间
            maxText:'时间应该小于{0}',//超过最大时间的提示信息
            minValue:'1/1/2020',
            minText:'时间应该大于{0}',
            disabledDates:['2020年03月15日'],
            disabledDatesText:'禁止选择该日期',
            disabledDays:[0,6],//禁止选择周日和周六
            disabledDaysText:'禁止选择该日期',
            pickerMaxHeight:70,//下拉框的高度
            increment:60,//设置时间间隔为60分钟
            format:'Y年m月d秒日',//设置时间格式
            invalidText:'时间格式无效'
        },{
            fieldLabel:'年龄',
            xtype:'hidden'//设置为隐藏
        },{
            xtype:'fieldcontainer',
            fieldLabel:"输入日期",
            layout:{//设置容器字段布局
                type:'hbox',
                align:'middle'
            },
            combineErrors:true,
            fieldDefaults:{
                hideLabel:true,
                allowBlank:false
            },
            defaultType:'textfield',
            items:[{
                fieldLabel:'年',
                flex:1,
                inputId:'year'
            },{
                xtype:'label',
                forId:'year',
                text:'年'
            },{
                fieldLabel:'月',
                flex:1,
                inputId:'month'
            },{
                xtype:'label',
                forId:'month',
                text:'月'
            },{
                fieldLabel:'日',
                flex:1,
                inputId:'day'
            },{
                xtype:'label',
                forId:'day',
                text:'日'
            }]
        },{
            xtype:'filefield',
            name:'photo',
            fieldLabel:'照片',
            anchor:'100%',
            buttonText:'选择文件'
        }
        ],
        buttons:[{
            text:'登录',
            handler:function () {
                // form.form.setValues({username:'fzy',age:6,password:'123456'});
                var username=form.getForm().findField('username');//根据id获取元素
                alert(username.getValue());
                form.getForm().submit({
                    clientValidation:true,
                    url:'test1',
                    method:'get',
                    success:function(form,action) {//成功事件回调
                        Ext.Msg.alert('提示','成功');
                    },
                    failure:function (form,action) {//失败处理
                        Ext.Msg.alert('错误','原因'+action.failureType);
                    }
                })

            }
        },{
            text:'重置',
            handler:function () {
                form.form.reset();
            }
        }]
    });

    var form2=new Ext.form.Panel({
       title:'ext.form.fieldset',
        labelWidth:40,
        width:220,
        frame:true,
        renderTo:'form2',
        bodyPadding:5,
        items:[
            {
                title:'产品信息',
                xtype:'fieldset',
                collapsible:true,
                bodyPadding:5,
                defaults:{
                    labelSeparator:':',
                    labelWidth:50,
                    width:160
                },
                defaultType:'textfield',
                items:[{
                    fieldLabel:'产地'
                },{
                    fieldLabel:'售价'
                }]
            },{
                title:'产品描述',
                xtype:'fieldset',
                checkboxToggle:true,//显示复选框控制的输入框
                checkboxName:'description',//表单提交时复选框对应的name
                bodyPadding:5,
                labelSeparator:':',
                items:[{
                 fieldLabel:'简介',
                    labelSeparator:':',
                    labelWidth:50,
                    width:160,
                    height:100,
                    xtype:'textarea'
                }]
            }
        ]
    });
});