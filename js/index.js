var subpages = ['error.html', 'show_webview.html', 'error.html', 'news_webview.html','user_webview.html'];
var subpage_style = {
	top: '0',
	bottom: '58px'
};
var aniShow = {};
mui.plusReady(function() {
	var defaultTab = document.getElementById('defaultTab');
	mui.trigger(defaultTab, 'tap');
	var self = plus.webview.currentWebview();
	for(var i = 0; i < subpages.length; i++) {
		var temp = {};
		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
		if(i > 0) {
			sub.hide();
		} else {
			temp[subpages[i]] = 'true';
			mui.extend(aniShow, temp);
		}
		self.append(sub);
	}
	var activeTab = subpages[0];
	mui('.mui-bar-tab').on('tap', 'a', function() {
		var targetTab = $(this).attr('href');
		var data_active_img = $(this).attr('data_active_img');
		if(targetTab == activeTab) return;
		
		if(targetTab == 'user_webview.html' && plus.storage.getItem('user_id') == null){
			mui.openWindow({
				url : 'login.html',
				id : 'login.html',
				show : {
					aniShow : 'slide-in-bottom',
				}
			});
			return false;
		}
		
		// 选中状态
		$('footer a').each(function(){
			var href = $(this).attr('href');
			var data_img = $(this).attr('data_img');
			$(this).find('img').attr('src',data_img);
			$(this).find('span').css('color','#d6d6d6');
		});
		$(this).find('img').attr('src',data_active_img);
		$(this).find('span').css('color','#0ca0ff');
		plus.webview.show(targetTab);
		plus.webview.hide(activeTab);
		activeTab = targetTab;
	});
	
	document.addEventListener('logout',function(){
		$('footer a').each(function(){
			var href = $(this).attr('href');
			var data_img = $(this).attr('data_img');
			$(this).find('img').attr('src',data_img);
			$(this).find('span').css('color','#d6d6d6');
		});
		var data_active_img = $('#defaultTab').find('a').attr('data_active_img');
		$('#defaultTab').find('img').attr('src',data_active_img);
		$('#defaultTab').find('span').css('color','#0ca0ff');
		targetTab = subpages[0];
		plus.webview.show(targetTab);
		plus.webview.hide(activeTab);
		activeTab = targetTab;
	});
		
});