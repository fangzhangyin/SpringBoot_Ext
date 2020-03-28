var a=document.getElementById("uid");
var b=document.getElementById("psw1");
var c=document.getElementById("psw2");
var d=document.getElementById("userid");
var e=document.getElementById("nickname");
var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
var password=b.value;
var flag=0;
function check(){
	if(a.value==""||b.value==""){
	alert('用户名和密码不能为空');
		return false;
		flag=1;
	}
	else if(! /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{2,18}$/.test( a.value )){
		alert('用户名只能包含中文、英文、数字、下划线、4-18个字符。');
		return false;
	}
	else if(a.value.length<2 || a.value.length>5){
		alert('合法长度为4-18个字符');
		return false;
	}
	else if(b.value.length<4){
		alert('密码长度需要大于4个字符');
		return false;
	}else if(password==a.value)
	{
		alert('用户名和密码不能相同');
		return false;
	
	}
	else if(b.value!=c.value){
		alert('两次密码输入不正确');
		return false;
	}
	else if(d.value==""){
		alert('工号不能为空');
		return false;
	}
	else if(e.value.length!=11){
		alert('手机号码必须为11位');
		return false;
	}
	else{
		return true;
	}
	
	
}
$("#uid").bind("blur", function(){
	var massage=document.getElementById("massage1");
	var name = $("#uid").val();
	$.ajax({
		type: "POST",
	    url : "checkname", //后台查询验证的方法
	    data:"username="+name, //携带的参数
	    success : function(data) {   //根据后台返回前台的msg给提示信息加HTML
	    	if(data=="true")  
			    {
	    	    massage.style.display="block";
	    	    
			    }
			  	else
			  		
			  	massage.style.display="none";
	    	}
	    	});
});

$("#userid").bind("blur", function(){
	var massage=document.getElementById("massage");
	var userid = $("#userid").val();
	$.ajax({
		type: "POST",
	    url : "checkid", //后台查询验证的方法
	    data:"userid="+userid, //携带的参数
	    success : function(data) {   //根据后台返回前台的msg给提示信息加HTML
	    	if(data=="true")  
			    {
	    	    massage.style.display="block";
	    	    
			    }
			  	else
			  		
			  	massage.style.display="none";
	    	}
	    	});
});
$("#psw1").bind("blur", function(){
	var massage1=document.getElementById("massage2.1");
	var massage2=document.getElementById("massage2.2");
	var massage3=document.getElementById("massage2.3");
	var bb=document.getElementById("psw1").value;
	if (bb.match(/([a-zA-Z])/) && bb.match(/([0-9])/)&&bb.length>4&&bb.length<8){
		massage2.style.display="block";
		massage1.style.display="none";
		massage3.style.display="none";
	} 
	else if(bb==""){
		massage2.style.display="none";
		massage1.style.display="none";
		massage3.style.display="none";
	}
	else if ( bb.match(/([0-9])/)&&bb.length>4&& !bb.match(/([a-zA-Z])/)){
		massage1.style.display="block";
		massage2.style.display="none";
		massage3.style.display="none";
		} 
	else if (bb.match(/([a-zA-Z])/) && bb.match(/([0-9])/)&&bb.length>8){
		massage3.style.display="block";
		massage1.style.display="none";
		massage2.style.display="none";
	} else if((bb.match(/([a-zA-Z])/)||bb.match(/([0-9])/))&&bb.length>6) {
		massage2.style.display="block";
		massage1.style.display="none";
		massage3.style.display="none";
		}
	
	
});

//ajax密码判断，用于登录
//<td id="massage2" style="display:none">密码输入错误</td>
//$("#psw1").bind("blur", function(){
//	var massage=document.getElementById("massage2");
//	var name = $("#uid").val();
//	$.ajax({
//		type: "POST",
//	    url : "checkname", //后台查询验证的方法
//	    data:"username="+name, //携带的参数
//	    success : function(data) {   //根据后台返回前台的msg给提示信息加HTML
//	    	if(data=="true")  
//			    {
//	    	    massage.style.display="block";
//	    	    
//			    }
//			  	else
//			  		
//			  	massage.style.display="none";
//	    	}
//	    	});
//});



