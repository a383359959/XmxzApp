mui.plusReady(function(){
	
	plus.runtime.getProperty(plus.runtime.appid,function(result){
	    $('.about_version').html('熊猫小筝&nbsp;&nbsp;v' + result.version);
	});
	
});