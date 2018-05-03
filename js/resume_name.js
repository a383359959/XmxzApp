mui.plusReady(function(){
	
	var option = {
		user_id : plus.storage.getItem('user_id'),
		field : 'resume_name'
	}
	
	loading(0);
	mui.post(getLocation('Resume/getField.html'),option,function(result){
		loading(1);
		$('.change_name input').val(result.data);
	},'json');
	
	mui(document).on('tap','.submit',function(){
		var name = $('.change_name input').val();
		if(name == ''){
			plus.nativeUI.alert('简历名称不能为空！',null,'提示','确定');
		}else{
			var option = {
				user_id : plus.storage.getItem('user_id'),
				field : 'resume_name',
				data : name
			}
			plus.nativeUI.showWaiting();
			mui.post(getLocation('Resume/setField.html'),option,function(result){
				plus.nativeUI.closeWaiting();
				var resume = plus.webview.getWebviewById('resume.html');
				if(resume != null) mui.fire(resume,'reload');
				plus.webview.currentWebview().close();
			},'json');
		}
	});
	
});