mui.plusReady(function(){
	
	var page = 0;
	var webview = plus.webview.currentWebview();
	
	loadData();
	
	mui('.news').on('tap','li',function(){
		var url = $(this).attr('url');
		openWindow('show_detail.html',{
			url : url
		});
	});
	
	document.addEventListener('reload',function(){
//		plus.screen.unlockOrientation();
//		plus.screen.lockOrientation('portrait');
		
//		plus.screen.unlockOrientation();
//		plus.screen.lockOrientation('portrait');
		
//		plus.screen.lockOrientation('landscape');
	});
                
	function loadData(){
		$('.news ul').html('');
        $('.dropload-down').remove();
        $('.news').dropload({
        	scrollArea : window,
        	loadDownFn : function(me){
        		page++;
				var option = {
					'page' : page,
					'pid' : webview.data_id
				};
				mui.post(getLocation('Show/lists.html'),option,function(result){
					$('header span').text(result.title);
					if(result.list.length > 0){
						var list = template('list',result);
						$('.news ul').append(list);
					}else{
						me.lock();
						me.noData();
					}
					me.resetload();
				},'json');
        	}
        });
	}
	
});