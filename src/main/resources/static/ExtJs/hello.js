Ext.onReady(
    function () {
        //ok
        Ext.MessageBox.msgButtons[0].setText('初始自定义按钮一');
    Ext.MessageBox.alert("Hello", "Hello World !",function () {
        //ok
        Ext.MessageBox.msgButtons[0].setText('二次赋值按钮一');
        Ext.MessageBox.alert("按钮重新赋值","新的按钮");
    });

    //yes
    Ext.MessageBox.msgButtons[1].setText('自定义按钮二');
    //no
    Ext.MessageBox.msgButtons[2].setText('自定义按钮三');
    //cancel
    Ext.MessageBox.msgButtons[3].setText('自定义按钮四');
});

function click1(){
    Ext.MessageBox.alert("Hello", "Hello World !");
    Ext.MessageBox.show({
        title:'我是标题',
        msg:'我有三个按钮，一个多行文本输入框',
        text:'',
        modal:true,//是否为窗口模式
        prompt:true,//true表示单行文本
        value:'请输入',
        fn:callback,
        buttons:Ext.Msg.YESNOCANCEL,//按钮样式
        icon:Ext.Msg.QUESTION//图标样式
    });
    function callback(id,msg) {
        alert('单击的按钮是'+id+'    输入的内容是'+msg);
    }
}

function click2() {
    var msgbox=Ext.MessageBox.show({
        title:'时间',
        msg:'动态更新时间',
        modal:true,//是否为窗口模式
        buttons:Ext.Msg.OK,
        fn:function () {
            Ext.TaskManager.stop(task);
        }
    });
    var task={
        run:function () {
            msgbox.updateText('当前时间'+Ext.util.Format.date(new Date(),'Y-m-d g:i:s:A'));//updateText更新提示框内的文本信息
        },
        interval:1000
    }
    Ext.TaskManager.start(task);//定时执行程序
}

function click3() {
    var msgbox=Ext.MessageBox.show({
        title:'进度条',
        msg:'动态更新进度条和信息文字',
        modal:true,//是否为窗口模式
        width:300,
        closable:false,//不显示左上角叉，防止线程的崩坏
        progress:true//设置进度条
    });
    var count=0;//进度条被刷新次数
    var percentage=0;//进度条的百分比
    var Text="";//进度条信息
    var task={
        run:function () {
            count++;
            percentage=count/10;
            Text="当前进度"+percentage*100+"%";
            msgbox.updateProgress(percentage,Text,'当前时间'+Ext.util.Format.date(new Date(),'Y-m-d g:i:s:A'));
            if(count>10){
                Ext.TaskManager.stop(task);
                msgbox.hide();
            }
        },interval:1000
    }
    Ext.TaskManager.start(task);
}

function click4() {
    var ProgressBar=new Ext.ProgressBar({//初始化一个进度条，里面可以实现自定义
        text:'使用renderto为进度条定位',
        width:300,//定义宽度
        renderTo:'p1'//以p1为进度条的容器
    });
    ProgressBar.wait({
        duration:10000,//持续更新10000毫秒
        interval:1000,//每1000毫秒进行跟新
        increment:10,//进行10更新完毕
        text:'waiting',
        scope:this,//函数回调执行范围
        fn:function () {
            alert('更细完毕');
            ProgressBar.hide();
        }
    })
}

function click5() {
    var flag=true;
    var Toolbar=new Ext.Toolbar({
        renderTo:'toolbar',
        width:500
    });
    Toolbar.add([
        {
            text:'新建',//工具栏按钮的文字
            handler:onButtonClick,//点击事件的处理
            iconCls:'newIcon'//在按钮上的图标
        },
        {
            text:'打开',
            handler:onButtonClick,
            iconCls:'openIcon'
        },{
            text:'保存',
            handler:onButtonClick,
            iconCls:'saveIcon'
        },'-',//工具栏分隔符
        {
            xtype:'textfield',
            hideLabel:true,
            width:150//增加一个宽度为150的输入框
        },
        '->',//增加一个充满工具栏的空白元素
        '<a href="#">超链接</a>',//加入一个Element元素
        {
            xtype:'tbspacer',
            width:50//加入一个空白元素，宽度为50
        },'静态文本']//加入一个简单的字符串
    );
    function onButtonClick(btn) {
        alert(btn.text);
    }

    Ext.get('toolbarset').on('click',function () {
        if(flag==true){
            Toolbar.disable();
            flag=false;
        }else{
            Toolbar.enable();
            flag=true;
        }

    });
}
function click6() {
    var toolbar=new Ext.Toolbar({
        renderTo:'toolbar1',
        width:500
    });

    var fileMenu=new Ext.menu.Menu({
        shadow:'frame',//设置菜单四条边都有影印
        allowOtherMenus:true,
        items:[
            {
                text:'打开',
                handler:onMenuItem
            },{
                text:'另存为',
                handler:onMenuItem
            },{
                text:'关闭',
                handler:onMenuItem
            }
        ]
    });
    var editMenu=new Ext.menu.Menu({
        shadow:'drop',//设置菜单四条边都有影印
        allowOtherMenus:true,
        items:[
            {
                text:'复制',
                handler:onMenuItem
            },{
                text:'粘贴',
                handler:onMenuItem
            },{
                text:'剪切',
                handler:onMenuItem
            }
        ]
    });

    toolbar.add({
        text:'文件',
        menu:fileMenu
    },{
        text:'编辑',
        menu:editMenu
    });
    function onMenuItem(item) {
        alert(item.text);
    }
}

function click7() {
    var toolbar=new Ext.Toolbar({
        renderTo:'toolbar2',
        width:500
    });
    var info=new Ext.menu.Menu({
        ignoreParentClicks:true,//忽略父级菜单的点击事件
        plain:true,
        items:[
            {text:'个人信息',
            menu:new Ext.menu.Menu({
                ignoreParentClicks:true,//忽略父级菜单的点击事件
                items:[{
                    text:'基本信息',
                    menu:new Ext.menu.Menu({//三级菜单
                        items:[{
                            text:'身高',handler:onMenuItem},
                            {text:'体重',handler:onMenuItem}
                        ]
                    })
                }]
            })
            },{
            text:'公司信息'
            }
        ]
    });
    toolbar.add({
        text:'设置',
        menu:info
    });
    function onMenuItem(item) {
        alert(item.text);
    }
}
function click8() {
    var toolbar=new Ext.Toolbar({
        renderTo:'toolbar3',
        width:500
    });
    var auto=new Ext.menu.Menu({
       items:[{
           xtype:'textfield',
           hideLabel:true,
           width:100
       },{
          text:'颜色选择器',
           menu:new Ext.menu.ColorPicker()
           },
           {
               xtype:'datepicker'//日期选择器
           }, {
               xtype: 'buttongroup',
               columns: 3,
               title: '按钮组',
               items: [{
                   text: '用户管理',
                   scale: 'large',
                   colspan: 3,
                   width: 170,
                   iconCls: 'userManagerIcon',
                   iconAlign: 'top'
               }, {
                   text: '新建', iconCls: 'newIcon'
               }, {
                   text: '打开', iconCls: 'openIcon'
               }, {
                   text: '保存', iconCls: 'saveIcon'
               }
               ]
           },{
           text:'是否启用',
               checked:false
           }
       ]
    });
   toolbar.add({text:'设置',menu:auto});
}
