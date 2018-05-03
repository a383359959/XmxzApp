mui.plusReady(function(){
	
	var webview = plus.webview.currentWebview();
	
	var option = {
		user_id : webview.user_id
	}
	
	loading(0);
	
	mui.post(getLocation('Resume/view.html'),option,function(result){
		loading(1);
		$('.resume_info_li').html(result.resume_info);
		$('.resume_education_li').html(result.resume_education);
		$('.resume_work_experience_li').html(result.resume_work_experience);
		$('.self_evaluation_li').html(result.self_evaluation);
		$('header span').text(result.resume_name);
	},'json');
	
});