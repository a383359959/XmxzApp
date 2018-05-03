mui.plusReady(function(){
	
	var page = 0;
	
	loadData();
	
	mui('.news').on('tap','li',function(){
		var news_id = $(this).attr('news_id');
		openWindow('news_detail.html',{
			news_id : news_id
		});
	});
	
	function loadData(){
		$('.news ul').html('');
        $('.dropload-down').remove();
        $('.news').dropload({
        	scrollArea : window,
        	loadDownFn : function(me){
        		page++;
				var option = {
					'page' : page
				};
				mui.post(getLocation('News/index.html'),option,function(result){
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