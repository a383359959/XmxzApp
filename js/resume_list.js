mui.plusReady(function(){
	
	var page = 0;
	
	loadData();
	
	mui('.resume_list').on('tap','li',function(){
		openWindow('resume_view.html',{
			user_id : $(this).attr('user_id')
		});
	});
	
	function loadData(){
		$('.resume_list ul').html('');
        $('.dropload-down').remove();
        $('.resume_list').dropload({
        	scrollArea : window,
        	loadDownFn : function(me){
        		page++;
				var option = {
					user_id : plus.storage.getItem('user_id'),
					page : page
				}
				mui.post(getLocation('Resume/lists.html'),option,function(result){
					if(result.list.length > 0){
						var list = template('list',result);
						$('.resume_list ul').append(list);
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