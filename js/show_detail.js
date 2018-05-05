mui.plusReady(function(){
	
	new Vue({
		el : '.show_webview',
		data : {
			view : null
		},
		mounted : function(){
			this.view = plus.webview.currentWebview();
			this.setTitle();
		},
		methods : {
			setTitle : function(){
				var title = 'images/title/' + this.view.num + '.png';
				$('.show_title img').attr('src',title);
			}
		}
	});
	
	/*s
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
	*/
	
});