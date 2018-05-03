mui.plusReady(function(){
	
	userInfo();
	
	mui(document).on('tap','.submit',function(){
		var name = $('.change_name input').val();
		if(name == ''){
			plus.nativeUI.alert('姓名不能为空！',null,'提示','确定');
		}else{
			var option = {
				user_id : plus.storage.getItem('user_id'),
				name : name
			}
			plus.nativeUI.showWaiting();
			mui.post(getLocation('User/change_name.html'),option,function(result){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.alert('修改成功！',function(){
					var user_webview = plus.webview.getWebviewById('user_webview.html');
					if(user_webview != null) mui.fire(user_webview,'reload');
					var user_info = plus.webview.getWebviewById('user_info.html');
					if(user_info != null) mui.fire(user_info,'reload');
					plus.webview.currentWebview().close();
				},'提示','确定');
			},'json');
		}
	});
	
	function userInfo(){
		loading(0);
		var option = {
			user_id : plus.storage.getItem('user_id')
		}
		mui.post(getLocation('User/user_info.html'),option,function(result){
			loading(1);
			$('.change_name input').val(result.name);
		},'json');
	}
	
});