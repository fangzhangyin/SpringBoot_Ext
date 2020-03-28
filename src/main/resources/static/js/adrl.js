function check_login()
{
 var name=$("#user_name").val();
 var pass=$("#password").val();
 if(name!="" && pass!="")
 {

 }
 else
 {
  $("#login_form").removeClass('shake_effect');  

  setTimeout(function()
  {
   $("#login_form").addClass('shake_effect')
  },1);  
  
 }
}
function check_register(){
	var name = $("#r_adname").val();
	var pass = $("#r_password").val();
	var email = $("#r_email").val();
	var num=$("#r_number").val();
	
	if(name!="" && pass!="" && email != ""&& num!="")
	 {
	  
	 }
	 else
	 {
	  $("#login_form").removeClass('shake_effect');  
	  setTimeout(function()
	  {
	   $("#login_form").addClass('shake_effect')
	  },1);

	 }
}


//摇晃效果实现代码
/*
 * $("#login_form").removeClass('shake_effect');  
	  setTimeout(function()
	  {
	   $("#login_form").addClass('shake_effect')
	  },1);
	  */
$(function(){
	var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	
	
	$("#create").click(function(){
		//check_register();
		var name = $("#r_adname").val();
		var pass = $("#r_password").val();
		var email = $("#r_email").val();
		var num=$("#r_number").val();
		if(name=="" || pass=="" || email == ""|| num==""||num.length!=11||email.search(reg) == -1){
			$("#login_form").removeClass('shake_effect');  
			  setTimeout(function()
			  {
			   $("#login_form").addClass('shake_effect')
			  },1);
			return false;
		}
		
	})
	$("#login").click(function(){
		//check_login();
		var name=$("#user_name").val();
		 var pass=$("#password").val();
		 if(name=="" && pass==""){
			 $("#login_form").removeClass('shake_effect');  

			  setTimeout(function()
			  {
			   $("#login_form").addClass('shake_effect')
			  },1);  
			 return false;
		 }
	})
	$('.message a').click(function () {
		$('form').animate({
			height: 'toggle',
			opacity: 'toggle'
		}, 'slow');
	});
})