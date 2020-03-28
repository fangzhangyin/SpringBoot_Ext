Ext.onReady(function () {

    function close(){
        alert('关闭')
    }
    function min(){
        alert('最小化')
    }
    function max(){
        alert('最大化')
    }
   Ext.create('Ext.panel.Panel',{
       title:'',
       tbar:['顶端工具栏'],
       bbar:['底端工具栏'],
       height:400,
       width:600,
       frame:true,
       renderTo:Ext.getBody(),
       bodyPadding:5,
       layout:'accordion',
       bodyStyle:'background-color:#FFFFFF',
       autoScroll:true,//自动显示滚动条
       collapsible:true,//允许展开和收缩
       closable:true,//允许关闭
       // html:'面板（body）',
       tools:[{id:'toggle'},{id:'close'},{id:'maximize'}],
       buttons:[{text:'底部button'}],
       defaults:{
           bodyStyle:'background-color:#FFFFFF',
           autoScroll:true,//自动显示滚动条
           collapsible:true//允许展开和收缩
       },
       items:[
           {
               title:'嵌套面板1',
               contentEl:'tt'
           },{
               title:'嵌套面板2',
               autoLoad:'lend'
           }
       ]
   });

    var btn=Ext.getCmp('close');
    btn.on('click',close);
    //以下的事件绑定将受createBtn组件是否销毁的控制，如果createBtn组件销毁了， 则事件绑定同时解除
    btn.addManagedListener (Ext .getCmp( 'maximize'), 'click' , max);
    btn.addManagedListener (Ext .getCmp('toggle'), 'click' ,min);

    //创建一个panel
    var panel = new Ext.Panel({
        title:"示例",
        renderTo: 'sub1' ,//渲染到HTML的sub1的Div中
        width:' 300px',
        htm1:"<div id='div1' style='height:200px'>我的id是sub3</div>"//通过给pael1创建-一个id为Div1的E1ement

    });
    //通过选择器选择一个唯- -的id为Div1的Element节点。
    var el = Ext.select(["div1"], true, "fat1");
    el.on("click" , function tes(){ //为节点e1绑定提示函数，当用户在e1元素内点击时提示
        Ext .Msg.alert("提示","您点击了id为'div1 '的节点");//给予提示信息
    });

});