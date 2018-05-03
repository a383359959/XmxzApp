mui.plusReady(function(){
	
	getProvince();
	
	function getProvince(){
		plus.nativeUI.showWaiting();
		mui.post(getLocation('User/getProvince.html'),null,function(result){
			plus.nativeUI.closeWaiting();
			$('select[name="province"]').html(result.html);
			$('select[name="province"]').parent().find('span').text('选择省');
			$('select[name="city"]').parent().find('span').text('选择市');
			$('select[name="area"]').parent().find('span').text('选择区');
			$('select[name="mechanism"]').parent().find('span').text('选择机构');
			$('select[name="city"]').html('<option value="0">请选择</option>');
			$('select[name="area"]').html('<option value="0">请选择</option>');
			$('select[name="mechanism"]').html('<option value="0">请选择</option>');
		},'json');
	}
	
	mui(document).on('change','select[name="province"]',function(){
		plus.nativeUI.showWaiting();
		var option = {
			pro_id : $(this).val()
		};
		mui.post(getLocation('User/getCity.html'),option,function(result){
			plus.nativeUI.closeWaiting();
			$('select[name="city"]').html(result.html);
			$('select[name="city"]').parent().find('span').text('选择市');
			$('select[name="area"]').parent().find('span').text('选择区');
			$('select[name="mechanism"]').parent().find('span').text('选择机构');
			$('select[name="area"]').html('<option value="0">请选择</option>');
			$('select[name="mechanism"]').html('<option value="0">请选择</option>');
		},'json');
	});
	
	mui(document).on('change','select[name="city"]',function(){
		plus.nativeUI.showWaiting();
		var option = {
			city_id : $(this).val()
		};
		mui.post(getLocation('User/getArea.html'),option,function(result){
			plus.nativeUI.closeWaiting();
			$('select[name="area"]').html(result.html);
			$('select[name="area"]').parent().find('span').text('选择区');
			$('select[name="mechanism"]').parent().find('span').text('选择机构');
			$('select[name="mechanism"]').html('<option value="0">请选择</option>');
		},'json');
	});
	
	mui(document).on('change','select[name="area"]',function(){
		plus.nativeUI.showWaiting();
		var option = {
			area_id : $(this).val()
		};
		mui.post(getLocation('User/getMechanism.html'),option,function(result){
			plus.nativeUI.closeWaiting();
			$('select[name="mechanism"]').html(result.html);
			$('select[name="mechanism"]').parent().find('span').text('选择机构');
		},'json');
	});
	
	mui('.select').on('change','select',function(){
		var text = $(this).find('option:selected').text();
		$(this).parent().find('span').text(text);
	});
	
	mui(document).on('tap','.submit',function(){
		var province_id = $('select[name="province"]').val();
		var area_id = $('select[name="area"]').val();
		var city_id = $('select[name="city"]').val();
		var mechanism_id = $('select[name="mechanism"]').val();
		var role = $('select[name="role"]').val();
		var username = $('input[name="username"]').val();
		var password = $('input[name="password"]').val();
		var confirm_password = $('input[name="confirm_password"]').val();
		if(province_id == 0){
			plus.nativeUI.alert('请选择省！',null,'提示','确定');
		}else if(city_id == 0){
			plus.nativeUI.alert('请选择市！',null,'提示','确定');
		}else if(area_id == 0){
			plus.nativeUI.alert('请选择区！',null,'提示','确定');
		}else if(mechanism_id == 0){
			plus.nativeUI.alert('请选择机构！',null,'提示','确定');
		}else if(username == ''){
			plus.nativeUI.alert('手机号码不能为空！',null,'提示','确定');
		}else if(username.length != 11){
			plus.nativeUI.alert('手机号码格式不正确！',null,'提示','确定');
		}else if(password == ''){
			plus.nativeUI.alert('密码不能为空！',null,'提示','确定');
		}else if(password != confirm_password){
			plus.nativeUI.alert('两次密码输入不一致！',null,'提示','确定');
		}else{
			var option = {
				username : username,
				password : password,
				province_id : province_id,
				city_id : city_id,
				area_id : area_id,
				mechanism_id : mechanism_id,
				role : role
			};
			mui.post(getLocation('User/reg.html'),option,function(result){
				if(result.status == 'success'){
					plus.nativeUI.alert('注册成功！',function(){
						plus.webview.currentWebview().close();
					},'提示','确定');
				}else{
					plus.nativeUI.alert(result.msg,null,'提示','确定');
				}
			},'json');
		}
	});
	
});