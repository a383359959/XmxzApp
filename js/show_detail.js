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
			},
			BSBC : function(){
				var url = ip + 'index.php/Api/BSBC/learn' + this.view.num + '.html';
				openWindow('show_url.html',{
					url : url
				});
			},
			MQYL : function(){
				var url = ip + 'index.php/Api/MQYL/learn' + this.view.num + '.html';
				openWindow('show_url.html',{
					url : url
				});
			}
		}
	});
	
});