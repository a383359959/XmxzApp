mui.plusReady(function(){
		
	mui('.setting_menu').on('tap','li',function(){
		var href = $(this).attr('href');
		openWindow(href);
	});
	
	mui(document).on('tap','.logout',function(){
		plus.nativeUI.confirm('确认退出？',function(e){
			if(e.index == 0){
				plus.storage.removeItem('user_id');
				plus.storage.removeItem('username');
				plus.storage.removeItem('role');
				var index = plus.webview.getWebviewById(plus.runtime.appid);
				if(index != null) mui.fire(index,'logout');
				plus.webview.currentWebview().close();
			}
		},['是','否']);
	});
	
});