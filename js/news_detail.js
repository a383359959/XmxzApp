mui.plusReady(function(){
	
	var webview = plus.webview.currentWebview();
	var option = {
		news_id : webview.news_id
	}
	plus.nativeUI.showWaiting();
	mui.post(getLocation('News/news_detail.html'),option,function(result){
		plus.nativeUI.closeWaiting();
		var content = template('content',result);
		$('.news_detail').html(content);
	},'json');
	
});