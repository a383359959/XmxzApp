mui.plusReady(function(){
	
	new Vue({
		el : '.show_webview',
		data : {
			view : null
		},
		mounted : function(){
			this.view = plus.webview.currentWebview();
			this.init();
		},
		methods : {
			init : function(){
				var option = {
					top : '0px',
					bottom : '0px',
					position : 'dock',
					dock : 'bottom',
					bounce : 'vertical'
				};
				
				var embed = plus.webview.create(this.view.url,'embed',option);
				this.view.append(embed);
				
				embed.addEventListener('loaded',function(){
					plus.nativeUI.closeWaiting();
				},false);
				
				embed.addEventListener('loading',function(){
					plus.nativeUI.showWaiting();
				},false);
			}
		}
	});
	
	document.addEventListener('closed',function(){
		plus.webview.currentWebview().close();
	});
	
});