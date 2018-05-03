mui.plusReady(function(){
	
	mui(document).on('tap','.reg',function(){
		openWindow('reg.html');
	});
	
	mui(document).on('tap','.submit',function(){
		var username = $('input[name="username"]').val();
		var password = $('input[name="password"]').val();
		if(username == ''){
			plus.nativeUI.alert('手机号码不能为空！',null,'提示','确定');
		}else if(username.length != 11){
			plus.nativeUI.alert('手机号码格式不正确！',null,'提示','确定');
		}else if(password == ''){
			plus.nativeUI.alert('密码不能为空！',null,'提示','确定');
		}else{
			var option = {
				username : username,
				password : password
			};
			plus.nativeUI.showWaiting();
			mui.post(getLocation('User/login.html'),option,function(result){
				plus.nativeUI.closeWaiting();
				if(result.status == 'success'){
					plus.storage.setItem('user_id',result.id);
					plus.storage.setItem('username',result.username);
					plus.storage.setItem('role',result.role);
					var user_webview = plus.webview.getWebviewById('user_webview.html');
					if(user_webview != null) mui.fire(user_webview,'reload');
					plus.webview.currentWebview().close();
				}else{
					plus.nativeUI.alert(result.msg,null,'提示','确定');
				}
			},'json');
		}
	});
	
});