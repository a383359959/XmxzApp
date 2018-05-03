mui.plusReady(function(){
	
	var webview = plus.webview.currentWebview();
	
	var DegreePicker = new mui.PopPicker();
	
	if(webview.type == 'add'){
		loading(0);
		mui.post(getLocation('Resume/getEducationDegree.html'),null,function(result){
			loading(1);
			DegreePicker.setData(result);
		},'json');
	}else{
		loading(0);
		var option = {
			id : webview.data_id
		}
		mui.post(getLocation('Resume/getEducationInfo.html'),option,function(result){
			loading(1);
			console.log(result);
			
			$('input[name="school_name"]').val(result.school_name);
			$('input[name="professional_name"]').val(result.professional_name);
			DegreePicker.setData(result.resume_education_degree);
			
			$('.degree_select').attr('value',result.degree);
			$('.degree_select').text(result.degree_name);
			
			$('.admission_year_select').attr('value',result.admission_year);
			$('.admission_year_select').text(result.admission_year + ' 年');
			
			$('.admission_month_select').attr('value',result.admission_month);
			$('.admission_month_select').text(result.admission_month + ' 月');
			
			$('.graduation_year_select').attr('value',result.graduation_year);
			$('.graduation_year_select').text(result.graduation_year + ' 年');
			
			$('.graduation_month_select').attr('value',result.graduation_month);
			$('.graduation_month_select').text(result.graduation_month + ' 月');
			
		},'json');
	}
	
	mui(document).on('tap','.submit',function(){
		var school_name = $('input[name="school_name"]').val();
		var degree = $('.degree_select').attr('value');
		var admission_year = $('.admission_year_select').attr('value');
		var admission_month = $('.admission_month_select').attr('value');
		var graduation_year = $('.graduation_year_select').attr('value');
		var graduation_month = $('.graduation_month_select').attr('value');
		var professional_name = $('input[name="professional_name"]').val();
		if(school_name == ''){
			plus.nativeUI.alert('请填写学校名称！',null,'提示','确定');
		}else if(degree == 0){
			plus.nativeUI.alert('请选择学历学位！',null,'提示','确定');
		}else if(admission_year == 0){
			plus.nativeUI.alert('请选择入学时间 - 年！',null,'提示','确定');
		}else if(admission_month == 0){
			plus.nativeUI.alert('请选择入学时间 - 月！',null,'提示','确定');
		}else if(graduation_year == 0){
			plus.nativeUI.alert('请选择毕业时间 - 年！',null,'提示','确定');
		}else if(graduation_month == 0){
			plus.nativeUI.alert('请选择毕业时间 - 月！',null,'提示','确定');
		}else if(professional_name == ''){
			plus.nativeUI.alert('请填写专业名称！',null,'提示','确定');
		}else{
			var option = {
				user_id : plus.storage.getItem('user_id'),
				school_name : school_name,
				degree : degree,
				admission_year : admission_year,
				admission_month : admission_month,
				graduation_year : graduation_year,
				graduation_month : graduation_month,
				professional_name : professional_name,
				type : webview.type,
				id : webview.data_id
			}
			plus.nativeUI.showWaiting();
			mui.post(getLocation('Resume/setUserEducation.html'),option,function(result){
				if(result.status == 'success'){
					plus.nativeUI.closeWaiting();
					var resume = plus.webview.getWebviewById('resume.html');
					if(resume != null) mui.fire(resume,'reload');
					var resume_education = plus.webview.getWebviewById('resume_education.html');
					if(resume_education != null) mui.fire(resume_education,'reload');
					plus.webview.currentWebview().close();
				}
			},'json');
		}
	});
	
	mui(document).on('tap','.admission_year_select',function(){
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
	
	mui(document).on('tap','.admission_month_select',function(){
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
	
	mui(document).on('tap','.graduation_year_select',function(){
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
	
	mui(document).on('tap','.graduation_month_select',function(){
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
	
	mui(document).on('tap','.degree_select',function(){
		var obj = $(this);
		DegreePicker.show(function(items){
			obj.attr('value',items[0].value);
			obj.text(items[0].text);
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