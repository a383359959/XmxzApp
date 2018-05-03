mui.plusReady(function(){
	
	plus.screen.lockOrientation('landscape');
	
	var webview = plus.webview.currentWebview();
	
	var option = {
		top : '0px',
		bottom : '0px',
		position : 'dock',
		dock : 'bottom',
		bounce : 'vertical'
	};
	
	var embed = plus.webview.create(webview.url,'embed',option);
	
	webview.append(embed);
		
	embed.addEventListener('loaded',function(){
		plus.nativeUI.closeWaiting();
	},false);
	
	document.addEventListener('closed',function(){
		plus.screen.lockOrientation('portrait');
		plus.webview.currentWebview().close();
	});
	
	embed.addEventListener('loading',function(){
		plus.nativeUI.showWaiting();
	},false);
	
});