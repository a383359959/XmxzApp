mui.plusReady(function(){
	
	mui(document).on('tap','.submit',function(){
		var content = $('textarea[name="content"]').val();
		if(content == ''){
			plus.nativeUI.alert('反馈内容不能为空！',null,'提示','确定');
		}else{
			var option = {
				user_id : plus.storage.getItem('user_id'),
				content : content
			}
			plus.nativeUI.showWaiting();
			mui.post(getLocation('Feedback/index.html'),option,function(result){
				plus.nativeUI.closeWaiting();
				if(result.status == 'success'){
					plus.nativeUI.alert('反馈成功！',function(){
						plus.webview.currentWebview().close();
					},'提示','确定');
				}else{
					plus.nativeUI.alert(result.msg,null,'提示','确定');
				}
			},'json');
		}
	});
	
});