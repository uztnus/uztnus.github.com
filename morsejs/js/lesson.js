function generateDistributionSlider(wordDistribution){
	mm={};
	$.each(wordDistribution,function(x){mm[x]=parseInt(wordDistribution[x]*1000);});
	res=[];
	res.push(0);
	for(var i=1;i<31;i++){
		res.push(res[i-1]+mm[i]);
	}
	return res;
}

var g_currentLesson="";
LANG[g_morseLang]['word_distribution']=generateDistributionSlider(LANG[g_morseLang]['word_frequences']);