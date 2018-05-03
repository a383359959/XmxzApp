mui.plusReady(function(){
	
	loadData();
	
	mui(document).on('tap','.add_edu',function(){
		openWindow('resume_education_edit.html',{
			type : 'add'
		});
	});
	
	mui(document).on('tap','.mui-slider-handle',function(){
		openWindow('resume_education_edit.html',{
			type : 'edit',
			data_id : $(this).attr('data_id')
		});
	});
	
	mui(document).on('tap','.mui-btn-red',function(){
		var obj = $(this);
		plus.nativeUI.confirm('确定删除？',function(e){
			if(e.index == 0){
				var option = {
					id : obj.attr('data_id')
				}
				mui.post(getLocation('Resume/delUserEducation.html'),option,function(result){
					if(result.status == 'success'){
						loadData();
						var resume = plus.webview.getWebviewById('resume.html');
						if(resume != null) mui.fire(resume,'reload');
					}
				},'json');
			}
		},['是','否']);
	});
	
	function loadData(){
		var option = {
			user_id : plus.storage.getItem('user_id')
		}
		loading(0);
		mui.post(getLocation('Resume/getUserEducation.html'),option,function(result){
			loading(1);
			var list = template('list',result);
			$('.resume_education ul').html(list);
		},'json');
	}
	
	document.addEventListener('reload',function(){
		loadData();
	});
	
});