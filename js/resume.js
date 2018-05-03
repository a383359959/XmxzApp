mui.plusReady(function(){
	
	reload();
	
	mui('.resume_item').on('tap','li',function(){
		var href = $(this).attr('href');
		openWindow(href);
	});
	
	mui(document).on('tap','.submit',function(){
		var resume_name = $('.resume_name').text();
		var resume_info = $('.resume_info').text();
		var resume_education = $('.resume_education').text();
		var resume_work_experience = $('.resume_work_experience').text();
		if(resume_name == '未完善'){
			plus.nativeUI.alert('请完善简历名称！',null,'提示','确定');
		}else if(resume_info == '未完善'){
			plus.nativeUI.alert('请完善个人信息！',null,'提示','确定');
		}else if(resume_education == '未完善'){
			plus.nativeUI.alert('请完善教育背景！',null,'提示','确定');
		}else if(resume_work_experience == '未完善'){
			plus.nativeUI.alert('请完善工作、实习经历！',null,'提示','确定');
		}else{
			openWindow('resume_view.html',{
				user_id : plus.storage.getItem('user_id')
			});
		}
	});
	
	mui(document).on('tap','.fabu',function(){
		var resume_name = $('.resume_name').text();
		var resume_info = $('.resume_info').text();
		var resume_education = $('.resume_education').text();
		var resume_work_experience = $('.resume_work_experience').text();
		if(resume_name == '未完善'){
			plus.nativeUI.alert('请完善简历名称！',null,'提示','确定');
		}else if(resume_info == '未完善'){
			plus.nativeUI.alert('请完善个人信息！',null,'提示','确定');
		}else if(resume_education == '未完善'){
			plus.nativeUI.alert('请完善教育背景！',null,'提示','确定');
		}else if(resume_work_experience == '未完善'){
			plus.nativeUI.alert('请完善工作、实习经历！',null,'提示','确定');
		}else{
			var text = $(this).text();
			var obj = $(this);
			if(text == '发布'){
				var option = {
					user_id : plus.storage.getItem('user_id'),
					field : 'status',
					data : 1
				}
				plus.nativeUI.showWaiting();
				mui.post(getLocation('Resume/setField.html'),option,function(result){
					plus.nativeUI.closeWaiting();
					obj.text('取消发布');
				},'json');
			}else{
				var option = {
					user_id : plus.storage.getItem('user_id'),
					field : 'status',
					data : 0
				}
				plus.nativeUI.showWaiting();
				mui.post(getLocation('Resume/setField.html'),option,function(result){
					plus.nativeUI.closeWaiting();
					obj.text('发布');
				},'json');
			}
		}
	});
	
	document.addEventListener('setValue',function(e){
		$(e.detail.cls).text(e.detail.value);
	});
	
	document.addEventListener('reload',function(e){
		reload();
	});
	
	var uploader = new plupload.Uploader({
		runtimes : 'silverlight,html4',
		browse_button : 'upload',
		url : ip + '/index.php/Api/User/uploadImg',
		chunk_size : '10mb',
		unique_names : true,
		resize : {
			width : 100,
			height : 100,
			quality : 90
		},
		filters : {
    		max_file_size : '10mb',
    		mime_types: []
		},
		flash_swf_url : 'plupload/Moxie.swf',
		silverlight_xap_url : 'plupload/Moxie.xap',
		init : {
			FilesAdded : function(up,files){	// 选择文件后开始上传
				up.start();
			},
			FileUploaded : function(up,file,info){	// 上传完成后
				var json = eval('(' + info.response + ')');
				var url = ip + '/' + json.path;
				if(json.status == 'success'){
					var option = {
						user_id : plus.storage.getItem('user_id'),
						field : 'litpic',
						data : json.path
					}
					plus.nativeUI.showWaiting();
					mui.post(getLocation('Resume/setField.html'),option,function(result){
						plus.nativeUI.closeWaiting();
						$('#upload').attr('src',ip + option.data);
					},'json');
				}else{
					plus.nativeUI.alert(json.msg,'','提示','确定');
				}
			}
		}
	});
	uploader.init();
	
	function reload(){
		var option = {
			user_id : plus.storage.getItem('user_id')
		}
		
		loading(0);
		
		mui.post(getLocation('Resume/checkResume.html'),option,function(result){
			
			loading(1);
			
			$('.name').text(result.name);
			
			if(result.litpic != 'error') $('#upload').attr('src',ip + result.litpic);
			
			if(result.status == '0'){
				$('.fabu').text('发布');
			}else{
				$('.fabu').text('取消发布');
			}
			
			if(result.resume_name == 'error'){
				$('.resume_name').text('未完善');
				$('.resume_name').css('color','red');
			}else{
				$('.resume_name').text('已完善');
				$('.resume_name').css('color','#98989c');
			}
			
			if(result.resume_info == 'error'){
				$('.resume_info').text('未完善');
				$('.resume_info').css('color','red');
			}else{
				$('.resume_info').text('已完善');
				$('.resume_info').css('color','#98989c');
			}
			
			if(result.resume_education == 'error'){
				$('.resume_education').text('未完善');
				$('.resume_education').css('color','red');
			}else{
				$('.resume_education').text('已完善');
				$('.resume_education').css('color','#98989c');
			}
			
			if(result.resume_work_experience == 'error'){
				$('.resume_work_experience').text('未完善');
				$('.resume_work_experience').css('color','red');
			}else{
				$('.resume_work_experience').text('已完善');
				$('.resume_work_experience').css('color','#98989c');
			}
			
			if(result.resume_work_experience == 'error'){
				$('.self_evaluation').text('未完善');
				$('.self_evaluation').css('color','red');
			}else{
				$('.self_evaluation').text('已完善');
				$('.self_evaluation').css('color','#98989c');
			}
			
		},'json');
	}
	
});