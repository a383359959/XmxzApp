mui.plusReady(function(){

	var sex = 0;
	
	var option = {
		user_id : plus.storage.getItem('user_id')
	}
	
	loading(0);
	
	mui.post(getLocation('Resume/getUserInfo.html'),option,function(result){
		
		loading(1);
		
		$('input[name="name"]').val(result.name);
		
		sex = result.sex;
		if(sex == 1){
			$('.sex_select').text('男');
		}else if(sex == 2){
			$('.sex_select').text('女');
		}else{
			$('.sex_select').text('请选择');
		}
		
		$('.birday_year_select').attr('value',result.birth_year);
		$('.birday_year_select').text(result.birth_year + ' 年');
		if(result.birth_year == 0) $('.birday_year_select').text('请选择');
		
		$('.birday_month_select').attr('value',result.birth_month);
		$('.birday_month_select').text(result.birth_month + ' 月');
		if(result.birth_month == 0) $('.birday_month_select').text('请选择');
		
		$('.work_year_select').attr('value',result.work_year);
		$('.work_year_select').text(result.work_year + ' 年');
		if(result.work_year == 0) $('.work_year_select').text('请选择');
		
		$('.work_month_select').attr('value',result.work_month);
		$('.work_month_select').text(result.work_month + ' 月');
		if(result.work_month == 0) $('.work_month_select').text('请选择');
		
		$('.telephone').text(result.telephone);
	
	},'json');

	mui(document).on('tap','.submit',function(){
		var name = $('input[name="name"]').val();
		var birth_year = $('.birday_year_select').attr('value');
		var birth_month = $('.birday_month_select').attr('value');
		var work_year = $('.work_year_select').attr('value');
		var work_month = $('.work_month_select').attr('value');
		if(name == ''){
			plus.nativeUI.alert('请填写姓名！',null,'提示','确定');
		}else if(sex == 0){
			plus.nativeUI.alert('请选择性别！',null,'提示','确定');
		}else if(birth_year == 0){
			plus.nativeUI.alert('请选择出生年！',null,'提示','确定');
		}else if(birth_month == 0){
			plus.nativeUI.alert('请选择出生月！',null,'提示','确定');
		}else if(work_year == 0){
			plus.nativeUI.alert('请选择工作年！',null,'提示','确定');
		}else if(work_month == 0){
			plus.nativeUI.alert('请选择工作月！',null,'提示','确定');
		}else{
			var option = {
				user_id : plus.storage.getItem('user_id'),
				name : name,
				sex : sex,
				birth_year : birth_year,
				birth_month : birth_month,
				work_year : work_year,
				work_month : work_month
			}
			plus.nativeUI.showWaiting();
			mui.post(getLocation('Resume/setUserInfo.html'),option,function(result){
				if(result.status == 'success'){
					plus.nativeUI.closeWaiting();
					var resume = plus.webview.getWebviewById('resume.html');
					if(resume != null) mui.fire(resume,'reload');
					plus.webview.currentWebview().close();
				}
			},'json');
		}
	});

	mui(document).on('tap','.sex_select',function(){
		var sexPicker = new mui.PopPicker();
		sexPicker.setData([{value:'1',text:'男'},{value:'2',text:'女'}]);
		sexPicker.show(function(items) {
			sex = items[0].value;
			$('.sex_select').text(items[0].text);
		});
	});
	
	mui(document).on('tap','.birday_year_select',function(){
		var sexPicker = new mui.PopPicker();
		var obj = $(this);
		var data = getYear();
		data = eval('[' + data + ']');
		sexPicker.setData(data);
		sexPicker.show(function(items) {
			obj.text(items[0].text);
			obj.attr('value',items[0].value)
		});
	});
	
	mui(document).on('tap','.birday_month_select',function(){
		var sexPicker = new mui.PopPicker();
		var obj = $(this);
		var data = getMonth();
		data = eval('[' + data + ']');
		sexPicker.setData(data);
		sexPicker.show(function(items) {
			obj.text(items[0].text);
			obj.attr('value',items[0].value)
		});
	});
	
	mui(document).on('tap','.work_year_select',function(){
		var sexPicker = new mui.PopPicker();
		var obj = $(this);
		var data = getYear();
		data = eval('[' + data + ']');
		sexPicker.setData(data);
		sexPicker.show(function(items) {
			obj.text(items[0].text);
			obj.attr('value',items[0].value)
		});
	});
	
	mui(document).on('tap','.work_month_select',function(){
		var sexPicker = new mui.PopPicker();
		var obj = $(this);
		var data = getMonth();
		data = eval('[' + data + ']');
		sexPicker.setData(data);
		sexPicker.show(function(items) {
			obj.text(items[0].text);
			obj.attr('value',items[0].value)
		});
	});
	
	function getYear(){
		var year = new Array();
		for(var i = 1920;i <= 2018;i++){
			year.push('{value:"' + i + '",text:"' + i + ' 年"}');
		}
		return year.join(',');
	}
	
	function getMonth(){
		var month = new Array();
		for(var i = 1;i <= 12;i++){
			month.push('{value:"' + i + '",text:"' + i + ' 月"}');
		}
		return month.join(',');
	}

});