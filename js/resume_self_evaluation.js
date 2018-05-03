mui.plusReady(function(){
	
	var option = {
		user_id : plus.storage.getItem('user_id'),
		field : 'self_evaluation'
	}
	
	loading(0);
	mui.post(getLocation('Resume/getField.html'),option,function(result){
		loading(1);
		$('.textarea textarea').val(result.data);
	},'json');
	
	mui(document).on('tap','.submit',function(){
		var value = $('.textarea textarea').val();
		if(value == ''){
			plus.nativeUI.alert('自我评价不能为空！',null,'提示','确定');
		}else{
			var option = {
				user_id : plus.storage.getItem('user_id'),
				field : 'self_evaluation',
				data : value
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