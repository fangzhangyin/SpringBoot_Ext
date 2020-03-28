var all;

Ext.onReady(function () {


    //定义表格数据源
    var gridDataStore = Ext.create( 'Ext.data.JsonStore' ,{
        fields:[ 'year', 'car', 'house', ' food' ],
        data: [
        {year : '2007年', car : 10,food : 10, house :30,culture : 15},
        {year : '2008年' ,car : 11, food : 12,house : 50,culture : 18},
        {year : '2009年', car: 12, food : 13,house : 100, culture : 10},
        {year : ' 2010年',car: 12, food : 13, house : 200, culture : 18}
        ]
});
    //定义图表数据源
    var chartDataStore = Ext.create( 'Ext.data.JsonStore',{
        fields:['goods','gain'],// 商品及利润字段
        data: []
    });




    var node = {
        text: '根',
        expanded: true,
        leaf: false,
        children: [
            { text: '登录[user图标]', leaf: true, iconCls: 'add'},
            { text: '注册', leaf: true },
            { text: '根下节点三', leaf: false, expanded:true, children: [
                    { text: '列表', leaf: true},
                    { text: '节点三子节点二', leaf: false, expanded: true, children: [
                            { text: '分页列表', leaf: true },
                            { text: '图形', leaf: true },
                            {text:'图表',leaf:true}
                        ]
                    }
                ]
            }
        ]
    };

    //树面板(本地数据源)
    var treelocal = new Ext.tree.TreePanel({
        title: 'TreePanelLocal',
        rootVisible: false,//标出不含有根节点，直接为子元素显示
        root: node
    });

    treelocal.on('itemclick',addpage);



    function addpage(view, record, item, index, e, eOpts) {
        var flag=main.items.length;
        var f= checkitem(index);
        console.log(record.get('text')+"  "+"  "+index +" "+flag+"  "+record.get('leaf')+"  "+f);
        var tab;
        if(record.get('leaf')){//是否为叶节点
            if(f==false){
                    tab=main.add({
                        title:record.get('text'),
                        closable:true,
                        id:'menu'+index
                    });
                main.setActiveTab(tab);
                createPanel(index);
                main.doLayout();
            }else{
                tab=Ext.getCmp('menu'+index);
                main.setActiveTab(tab);
            }
        }

    }
    
    function checkitem(index) {
        var t='menu'+index;
        var ff=Ext.getCmp(t);
        if(ff==null){
            return false;
        }else{
            return true;
        }
    }

    var datas=[[100,'张三',true,new Date(1799),24],[200,'李四',false,new Date(2008),26],[400,'王五',true,new Date(2001),20]];

    var maxpage=2;//指定分页大小（对数据进行分页，2表示将数据分成两页）
    var store1=Ext.create('Ext.data.Store',{
        autoLoad:{start:0,limit:maxpage},
        fields:['id','name','age'],
        pageSize:maxpage,
        proxy:{//数据代理
         type:'ajax',//ajax的远程数据请求获取
         url:'getpage',
            reader:{
                root:'rows',
                totalProperty:'results'
            }
        }
    });

    var bbar = new Ext.PagingToolbar({
        pageSize:10,//每页显示几条数据
        store:store1,//数据
        displayInfo:true,//是否显示数据信息
        displayMsg:'显示第{0}条到{1}条记录，一共{2}条',//只有displayInfo:true时才有效，用来显示有数据的提示信息。
        emptyMsg:"没有记录"//没有数据显示的信息
    });

    var form1;
    var form2;
    var grid;
    var grid2;
    var grid3;
    var pain;
    var chart;
    function createPanel(index) {
        var t='menu'+index;
        var s=Ext.getCmp(t);
        if(index==0){
            s.add({
                items:[
                    form1=Ext.create('Ext.form.Panel',{
                        id:'form',
                        title:'登录',
                        height:400,
                        width:300,
                        frame:true,
                        defaults:{
                            // autoFitError:false,//提示信息时是否自动调整字段组件宽度
                            labelSeparator:':',
                            labelWidth:60,
                            width:280,
                            allowBlank:false,
                            blankText:'不允许为空',
                            labelAlign:'left',
                            msgTarget:'qtip'//显示一个浮动的提示信息
                        },items:[{
                            xtype:'textfield',
                            name:'username',
                            id:'f1',
                            fieldLabel:'姓名'//标签内容
                        },{ name: 'password',
                            id:'f2',
                            xtype: 'textfield',
                            fieldLabel: '密码',
                            inputType: 'password'
                        }],
                        buttons:[{
                            text:'登录',
                            handler:function () {
                                var a=Ext.getCmp('f1').getValue();
                                var b=Ext.getCmp('f2').getValue();
                                form1.getForm().submit({
                                    clientValidation:true,
                                    waitMsg : '正在保存用户信息,请稍后...',
                                    url:'dolend',
                                    // params : {
                                    //     username:a,
                                    //     password :b
                                    // },
                                    success : function(form,action) {
                                        Ext.Msg.alert('操作', "成功");
                                    },
                                    failure : function(form,action) {
                                        Ext.Msg.alert('错误','原因'+action.failureType);
                                    }
                                });
                            }
                        },{
                            text:'重置',
                            handler:function () {
                                form1.form.reset();
                            }
                        }]
                    })
                ]
            });
        }else if(index==1){
            s.add({
                items:[
                    form2=Ext.create('Ext.form.Panel',{ id:'reg',
                        title:'注册',
                        height:400,
                        width:300,
                        frame:true,
                        defaults: {
                            // autoFitError:false,//提示信息时是否自动调整字段组件宽度
                            labelSeparator: ':',
                            labelWidth: 60,
                            width: 280,
                            allowBlank: false,
                            blankText: '不允许为空',
                            labelAlign: 'left',
                            msgTarget: 'qtip'//显示一个浮动的提示信息
                        },
                        items:[{
                            xtype:'textfield',
                            name:'username',
                            id:'t1',
                            fieldLabel:'姓名'//标签内容
                        },{
                            name: 'password',
                            xtype: 'textfield',
                            id:'t2',
                            fieldLabel: '密码',
                            inputType: 'password'
                        },{
                            name:'head',
                            xtype:'filefield',
                            id:'t3',
                            fieldLabel:'头像'
                        },{
                            name:'introduction',
                            xtype:'textareafield',
                            id:'t4',
                            fieldLabel:'简介'
                        }],
                        buttons:[{
                            buttonAlign: 'center',
                            text:'注册',
                            handler:function () {
                                var t=new Array();
                                for(var i=1;i<5;i++){
                                    t[i]=Ext.getCmp("t"+i).getValue();
                                }
                                form2.getForm().submit({
                                    clientValidation:true,
                                    waitMsg : '文件正在上传,请稍后...',
                                    url : "reg",
                                    method:'post',
                                    isUpload : true,
                                    params : {
                                        username:t[1],
                                        password :t[2],
                                        head:t[3],
                                        introduction:t[4]
                                    },
                                    success : function(form,action) {
                                        // for (i in action) {
                                        //     alert('action参数名称:' + i);
                                        //     alert('action参数[' + i + ']的值：' + action[i]);
                                        //     //方式一，判断子对象类型，如果是object则继续遍历子对象
                                        //     if (typeof (action[i]) == 'object') {
                                        //         for (j in action[i]) {
                                        //             alert('子对象名称：' + j);
                                        //             alert('子对象值：' + action[i][j]);
                                        //         }
                                        //     }
                                        // }
                                        Ext.Msg.alert('操作', "上传成功");
                                    },
                                    failure : function(form,action) {
                                        Ext.Msg.alert('错误','原因'+action.failureType);
                                    }
                                })
                            }
                        },{
                        text:'重置',
                            handler:function () {
                                form2.form.reset();
                            }
                        }]
                    })
                ]
            })
        }else if(index==3){
            s.add({
                items:[
                    grid=Ext.create('Ext.grid.Panel',{
                        title:'简单的表格示例',
                        width:500,
                        height:300,
                        frame:true,
                        multiSelect:true,
                        selType:'checkboxmodel',//设置单元格的选择模式
                        tbar:[{
                            text:'取得所选的单元格',
                            handler:function () {
                                var cell=grid.setSelectionMode().getCurrentPosition();
                                alert(Ext.JSON.encode(cell));
                            }
                        }],
                        plugins:[//字段内容点一次可编辑
                            Ext.create('Ext.grid.plugin.CellEditing',{//单元格编辑模式
                                clicksToEdit:1
                            })
                        ],
                        viewConfig:{
                            forceFit:true,
                            stripeRows:true//绘制斑马线
                        },
                        store:{//配置数据源
                            fields:['id','name','leader','birthday','age'],//定义字段
                            proxy:{
                                type:'memory',//内存代理
                                data:datas,
                                reader:'array'//read解析器
                            },
                            autoLoad:true
                        },
                        columns:[//配置列表各列
                            {header:'id',width:80,dataIndex:'id',sortable:true},
                            {header:'姓名',width:80,dataIndex:'name',sortable:true,
                                editor:{xtype:'textfield',//设置编辑（编辑的格式）
                                allowBlank:false
                                }
                            },
                            {header:'组长',width:80,dataIndex:'leader',
                            xtype:'booleancolumn',
                                trueText:'是',
                                falseText:'否'
                            },
                            {header:'生日',width:80,dataIndex:'birthday',
                            xtype:'datecolumn',
                                format:'Y年m月c日'
                            },
                            {header:'年龄',width:80,dataIndex:'age',sortable:true},
                            {
                                header:'操作',
                                width:200,
                                xtype:'actioncolumn',
                                items:[{
                                    icon:'Spring?filename=ext1.png',//指定的图标资源url
                                    handler:function (grid,rowIndex,colIndex) {
                                        var rec=grid.getStore().getAt(rowIndex);
                                        alert('编辑'+rec.get('name'));
                                    }
                                },{
                                    icon:'Spring?filename=ext2.png',//指定的图标资源url
                                    handler:function (grid,rowIndex,colIndex) {
                                        var rec=grid.getStore().getAt(rowIndex);
                                        alert('删除'+rec.get('name'));
                                    }
                                },{
                                    icon:'Spring?filename=ext3.png',//指定的图标资源url
                                    handler:function (grid,rowIndex,colIndex) {
                                        var rec=grid.getStore().getAt(rowIndex);
                                        alert('保存'+rec.get('name'));
                                    }
                                }]
                            },{
                            header:'描述',
                                width:100,
                                xtype:'templatecolumn',
                                tpl:'{name}<tpl if="leader==false">不</tpl>是组长'
                            }
                        ]
                        }
                    )
                ]
            })
        }else if(index==5){
            s.add({items:[
                grid2=new Ext.create('Ext.grid.Panel',{
                    title:'表单的分页',
                    // width:400,
                    // height:150,
                    frame:true,
                    store:store1,
                    autoHeight:true,
                    autowidth:true,
                    columns:[
                        {header:'id',width:60,dataIndex:'id',sortable:true},
                        {header:'name',width:80,dataIndex:'name',sortable:true},
                        {header:'年龄',width:80,dataIndex:"age",sortable:true}
                        ],
                    bbar:{
                        xtype:'pagingtoolbar',
                        pageSize:10,//每页显示几条数据(最终的结果总是第一页显示服务器传来的数据条数？？？)
                        store:store1,//数据
                        displayInfo:true,//是否显示数据信息
                        displayMsg:'显示第{0}条到{1}条记录，一共{2}条',//只有displayInfo:true时才有效，用来显示有数据的提示信息。
                        emptyMsg:"没有记录",//没有数据显示的信息
                    }
                })
                ]})
        }else if(index==6){
            s.add({
                items:[
                    pain=Ext.create('Ext.draw.Component',{
                        width:600,
                        height:400,
                        viewBox:false,//使图形保持原始大小
                        items:[{
                            type:'rect',//矩形
                            x:50,//左上角横坐标
                            y:20,//左上角纵坐标
                            height:150,
                            width:150,
                            stroke:"#CCFFFF",//边线的填充颜色
                            fill:"#FF99CC"//填充颜色
                        },{
                            type:'circle',//圆心
                            x:280,//圆心横坐标
                            y:95,//圆心纵坐标
                            height:150,
                            width:150,
                            stroke:"#FF0000",//边线的填充颜色
                            fill:"#FFCC66"//填充颜色
                        },{
                            type:'ellipse',//椭圆
                            x:430,//
                            y:95,//
                            radiusX:50,//水平半径
                            radiusY:30,//垂直半径
                            stroke:"#000000",
                            fill:"#CC00FF"
                        }]
                    })
                ]
            })
        }else if(index==7){
            s.add({items:[
                    chart=Ext.create('Ext.chart.Chart',{
                        store : chartDataStore ,
                        animate: true,//是否 启用动画效果
                        legend: {
                        position: 'center' //图例位置
                        },
                        height: 360,
                        width:600,
                        columnWidth : .5,
                        series : [ {
                        type : 'pie',//图表序列类型
                        field : 'gain' ,//对应饼状图角度的字段名
                        showInLegend : true,//是否 显示在图例当中
                        label : {
                        field : 'goods' ,//标签字段名
                        contrast : true ,
                        display : 'middle' ,//标签显现方式
                        font : '18px "Lucida Grande"' //字体
                        }
                        }]
                        }),
                    grid3=Ext.create('Ext.grid.Panel',{
                        store: gridDataStore,
                        columnLines: true,
                        columnWidth:.5,
                        height: 200,
                        columns:[
                            { header : '年份',dataIndex: 'year', width : 60},
                            { header : '汽车',dataIndex: 'car', width : 60},
                            { header : '住房',dataIndex: 'house', width : 60},
                            { header : '食品',dataIndex: 'food', width : 60 },
                            { header :'文化' ,dataIndex:'culture', width : 60 }
                        ],
                        title: '产品销售利润统计表',
                        listeners: {//对grid的事件监听
                            'itemclick': function (view, record, item, index, e) {
                                console.log(record.get('culture'));
                                chartDataStore . loadData( [
                                    {goods : '汽车', gain : record.get( 'car' )},
                                    {goods : '住房', gain : record.get( 'house' )},
                                    {goods :'食品', gain : record.get( 'food' )},
                                    {goods : '文化', gain : record.get( 'culture' )}
                                ]);
                            }
                        }
                    })
                ]})
        }
    }





    var head=new Ext.Panel({
        html:'</br><center><font size=6>实现</font></center>',
        region:'north',
        height:100
    });

    var main=new Ext.tab.Panel({
        region:'center',
        layout:'fit',
        items:[
            {
                title:'主界面',
                html:'<p>欢迎来到主页</p>',
                listeners:{close:function(tp,c)
                    {
                        c.destroy();
                    }
                }
            }
        ]
    });

        all=Ext.create('Ext.panel.Panel',{
        layout:'border',
        width:document.body.clientWidth,
        height:document.body.clientHeight,
        frame:true,
        bodyPadding:5,
        renderTo:Ext.getBody(),
        defaults:{
            autoScroll:true,//自动显示滚动条
            collapsible:true//允许展开和收缩
        },
        items:[
            head,
            {
            title:'功能菜单',
            spilt:true,
            id:'menu',
            region:'west',
            width:180,
            layout:'accordion',
            items:[
                {
                    title:'登录注册',
                    items:[treelocal]
                },{
                    title:'查看'
                }
            ]
        },main]
    });
});

