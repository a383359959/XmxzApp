mui.plusReady(function(){
	
	userInfo();
	
	document.addEventListener('reload',function(){
		userInfo();
	});
	
	mui(document).on('tap','.changeName',function(){
		openWindow('change_name.html');
	});
	
	var sexPicker = new mui.PopPicker();
	sexPicker.setData([{
		value : '0',
		text : '男'
	},{
		value : '1',
		text : '女'
	}]);
	
	mui(document).on('tap','.sex',function(){
		sexPicker.show(function(items){
			$('.sex').text(items[0].text);
			var option = {
				user_id : plus.storage.getItem('user_id'),
				sex : items[0].value
			}
			mui.post(getLocation('User/change_sex.html'),option,null,'json');
		});
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
						headimg : json.path
					}
					plus.nativeUI.showWaiting();
					mui.post(getLocation('User/changeHeadimg.html'),option,function(result){
						plus.nativeUI.closeWaiting();
						$('#upload img').attr('src',url);
						var user_webview = plus.webview.getWebviewById('user_webview.html');
						if(user_webview != null) mui.fire(user_webview,'reload');
					},'json');
				}else{
					plus.nativeUI.alert(json.msg,'','提示','确定');
				}
			}
		}
	});
	uploader.init();
	
	function userInfo(){
		loading(0);
		var option = {
			user_id : plus.storage.getItem('user_id')
		}
		mui.post(getLocation('User/user_info.html'),option,function(result){
			loading(1);
			if(result.headimg != '') $('#upload img').attr('src',ip + result.headimg);
			$('.telephone').html(result.username);
			$('.jigou').html(result.jigou);
			$('.name').text(result.name);
			$('.sex').text(result.sex == 0 ? '男' : '女');
		},'json');
	}
	
});