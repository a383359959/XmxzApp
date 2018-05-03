mui.plusReady(function(){
	
	var webview = plus.webview.currentWebview();
	
	// var DegreePicker = new mui.PopPicker();
	
	if(webview.type == 'add'){
		/*
		loading(0);
		mui.post(getLocation('Resume/getEducationDegree.html'),null,function(result){
			loading(1);
			DegreePicker.setData(result);
		},'json');
		*/
	}else{
		loading(0);
		var option = {
			id : webview.data_id
		}
		mui.post(getLocation('Resume/getUserWorkExperienceInfo.html'),option,function(result){
			loading(1);
			console.log(result);
			
			$('input[name="company_name"]').val(result.company_name);
			$('input[name="wages"]').val(result.wages);
			$('textarea[name="desc"]').val(result.desc);
			
			$('.start_year_select').attr('value',result.start_year);
			$('.start_year_select').text(result.start_year + ' 年');
			
			$('.start_month_select').attr('value',result.start_month);
			$('.start_month_select').text(result.start_month + ' 月');
			
			$('.end_year_select').attr('value',result.end_year);
			$('.end_year_select').text(result.end_year + ' 年');
			
			$('.end_month_select').attr('value',result.end_month);
			$('.end_month_select').text(result.end_month + ' 月');
			
		},'json');
	}
	
	mui(document).on('tap','.submit',function(){
		var company_name = $('input[name="company_name"]').val();
		var start_year = $('.start_year_select').attr('value');
		var start_month = $('.start_month_select').attr('value');
		var end_year = $('.end_year_select').attr('value');
		var end_month = $('.end_month_select').attr('value');
		var wages = $('input[name="wages"]').val();
		var desc = $('textarea[name="desc"]').val();
		if(company_name == ''){
			plus.nativeUI.alert('请填写公司名称！',null,'提示','确定');
		}else if(start_year == 0){
			plus.nativeUI.alert('请选择开始时间 - 年！',null,'提示','确定');
		}else if(start_month == 0){
			plus.nativeUI.alert('请选择开始时间 - 月！',null,'提示','确定');
		}else if(end_year == 0){
			plus.nativeUI.alert('请选择结束时间 - 年！',null,'提示','确定');
		}else if(end_month == 0){
			plus.nativeUI.alert('请选择结束时间 - 月！',null,'提示','确定');
		}else if(wages == ''){
			plus.nativeUI.alert('请填写工资！',null,'提示','确定');
		}else if(desc == ''){
			plus.nativeUI.alert('请填写工作描述！',null,'提示','确定');
		}else{
			var option = {
				user_id : plus.storage.getItem('user_id'),
				company_name : company_name,
				start_year : start_year,
				start_month : start_month,
				end_year : end_year,
				end_month : end_month,
				desc : desc,
				wages : wages,
				type : webview.type,
				id : webview.data_id
			}
			plus.nativeUI.showWaiting();
			mui.post(getLocation('Resume/setUserWorkExperience.html'),option,function(result){
				if(result.status == 'success'){
					plus.nativeUI.closeWaiting();
					var resume = plus.webview.getWebviewById('resume.html');
					if(resume != null) mui.fire(resume,'reload');
					var resume_work_experience = plus.webview.getWebviewById('resume_work_experience.html');
					if(resume_work_experience != null) mui.fire(resume_work_experience,'reload');
					plus.webview.currentWebview().close();
				}
			},'json');
		}
	});
	
	mui(document).on('tap','.start_year_select',function(){
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
	
	mui(document).on('tap','.start_month_select',function(){
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
	
	mui(document).on('tap','.end_year_select',function(){
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
	
	mui(document).on('tap','.end_month_select',function(){
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