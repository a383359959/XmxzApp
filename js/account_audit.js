mui.plusReady(function(){
	
	loadData();
	
	mui(document).on('tap','.mui-btn-red',function(){
		var obj = $(this);
		plus.nativeUI.confirm('确定拒绝？',function(e){
			if(e.index == 0){
				var option = {
					user_id : obj.attr('data_id'),
					status : 2
				}
				plus.nativeUI.showWaiting();
				mui.post(getLocation('User/accountAuditChange.html'),option,function(result){
					plus.nativeUI.closeWaiting();
					if(result.status == 'success') loadData();
				},'json');
			}
		},['是','否']);
	});
	
	mui(document).on('tap','.mui-btn-green',function(){
		var obj = $(this);
		plus.nativeUI.confirm('确定同意？',function(e){
			if(e.index == 0){
				var option = {
					user_id : obj.attr('data_id'),
					status : 1
				}
				plus.nativeUI.showWaiting();
				mui.post(getLocation('User/accountAuditChange.html'),option,function(result){
					plus.nativeUI.closeWaiting();
					if(result.status == 'success') loadData();
				},'json');
			}
		},['是','否']);
	});
	
	function loadData(){
		var option = {
			user_id : plus.storage.getItem('user_id')
		}
		
		loading(0);
		mui.post(getLocation('User/accountAuditList.html'),option,function(result){
			loading(1);
			var list = template('list',result);
			$('.resume_education ul').html(list);
		},'json');
	}
	
});