mui.plusReady(function(){
	var vue = new Vue({
		el : '.show_webview',
		data : {
			index : 0
		},
		mounted : function(){
			mui('.show_bg_main').on('tap','li',function(){
				var learn = $(this).find('img.pos').attr('src');
				learn = learn.replace('images/ico/','');
				learn = learn.replace('.png','');
				openWindow('show_detail.html',{
					num : learn
				});
			});
		},
		methods : {
			setWindow : function(){
				plus.navigator.setFullscreen(true);
				plus.screen.lockOrientation('landscape');
			},
			changeLearn : function(type){
				if(this.index >= 2 && type == 'right') return false;
				if(this.index <= 0 && type == 'left') return false;
				console.log(this.index);
				type == 'right' ? this.index++ : this.index--;
				this.animateMove(this.index);
			},
			animateMove : function(index){
				$('.show_bg_main ul').animate({'opacity' : '0'},'fast').css('z-index','0');
				$('.show_bg_main ul').eq(index).animate({'opacity' : '1'},'fast').css('z-index','1');
			},
			close : function(){
				var index = plus.webview.getWebviewById(plus.runtime.appid);
				if(index != null) mui.fire(index,'set');
			}
		}
	});
	document.addEventListener('set',function(){
		vue.setWindow();
	});
});