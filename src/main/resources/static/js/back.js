function pageClick(k) {
	$(k).parent().find("div").removeClass("active");
	$(k).addClass("active");
	$("#flTitle").text($(k).text());
	var user=document.getElementById("user").innerText;
	var s=k.innerText;
	var a=document.getElementById("self");
	var b=document.getElementById("work");
	var c=document.getElementById("goods");
	var d=document.getElementById("usegoods");
	var e=document.getElementById("usedata");
	if(s=="个人信息修改"){
		$.ajax({
			type:"post",
			url:"personal",
			data:"username="+user,
//			dataType: "json",
			success: function(data){
				var j=eval('('+data+')');
				
				//时间转换
				var time =new Date(j.joindata);
				var date=time.toLocaleDateString();
               				
				a.style.display="block";
				b.style.display="none";
				c.style.display="none";
				d.style.display="none";
				e.style.display="none";
				
				var tab=document.getElementById("tab1");
var html='<tr><td>用户名</td><td><input name="username"readOnly="true"  value='+j.username+' /></td></tr>';
			html+='<tr><td>工号</td><td><input name="userid"readOnly="true"  value='+j.userid+' /></td></tr>';
			html+='<tr><td>密码</td><td><input name="password" value='+j.password+' /></td></tr>';
			html+='<tr><td>联系方式</td><td><input name="number" minlength="11" maxlength="11" value='+j.number+' /></td></tr>';
			html+='<tr><td>性别</td><td><input name="sex" value='+j.sex+' /></td></tr>';
			html+='<tr><td>年龄</td><td><input name="age" value='+j.age+' /></td></tr>';
			html+='<tr><td>职位</td><td><input name="job" value='+j.job+' /></td></tr>';
			html+='<tr><td>入场时间</td><td><input readOnly="true" name="date" value='+date+' /></td></tr>';
			
			tab.innerHTML=html;
			}
		
		});
//	a.style.display="block";
//	b.style.display="none";
//	c.style.display="none";
//	d.style.display="none";
//	e.style.display="none";
	
	
	}
	else if(s=="个人季度工作"){
	a.style.display="none";
	b.style.display="block";
	c.style.display="none";
	d.style.display="none";
	e.style.display="none";
	}
	else if(s=="物料查看"){
	a.style.display="none";
	b.style.display="none";
	c.style.display="block";
	d.style.display="none";
	e.style.display="none";
	}
	else if(s=="物料使用"){
	a.style.display="none";
	b.style.display="none";
	c.style.display="none";
	d.style.display="block";
	e.style.display="none";
	}
	else if(s=="物料使用记录"){
	a.style.display="none";
	b.style.display="none";
	c.style.display="none";
	d.style.display="none";
	e.style.display="block";
	window.location.replace("http://localhost:8080/manager/usedata");
	}
}
