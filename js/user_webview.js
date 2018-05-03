mui.plusReady(function(){
	
	var user_id = plus.storage.getItem('user_id');
	if(user_id != null) userInfo();
	
	document.addEventListener('reload',function(){
		userInfo();
	});
	
	mui('.user_menu').on('tap','li',function(){
		var href = $(this).attr('href');
		openWindow(href);
	});
	
	mui(document).on('tap','.user_header',function(){
		openWindow('user_info.html');
	});
	
	function userInfo(){
		plus.nativeUI.showWaiting();
		var option = {
			user_id : plus.storage.getItem('user_id')
		}
		mui.post(getLocation('User/user_info.html'),option,function(result){
			plus.nativeUI.closeWaiting();
			if(result.headimg != '') $('.user_header img').attr('src',ip + result.headimg);
			$('.user_header_name').text(result.name);
			switch(result.role){
				case '1':
					$('.role').show();
					$('#resume,#account_audit').show();
					$('#resume_list').hide();
					break;
				case '2':
					$('.role').show();
					$('#resume_list,#account_audit').show();
					$('#resume').hide();
					break;
				default:
					$('.role').hide();
			}
		},'json');
	}
	
});