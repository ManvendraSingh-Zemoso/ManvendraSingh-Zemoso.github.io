var csv = 'Department,Code,Desription,Rate\n';
function myFunction(){
	var final=[];
	var child = document.body.childNodes;
	for(var i=0;i<child.length;i++){
		// console.log(child[i]);
		if(child[i].innerText!=null){
			var string = child[i].innerText;
			var check = string.search("ACCOMMODATION CHARGES");
			if(check>=0){
				break;
			}
			
			var n = string.search("DEPARTMENT OF");
			var department;
			if(n>=0){
				var index = string.indexOf("F");
				department = string.substring(index+2);
			}
			var pattern = /[a-z]/i;
			if(pattern.test(string)){
				var check1 = string.search("CODE");
				var	check2 = string.search("NIMS");
				var check3 = string.search("Download");
				if(check1>=0){
					continue;
				}
				else if(n>=0){
					continue;
				}
				else if(check2>=0 || check3>=0){
					continue;
				}
				else{
					final.push(department);
					string= string.replace(/,/g,'');
					//console.log(string);
					var result = string.split(/(\s+)/);
					//console.log(result);
					var answer = result;
					for(var j=0;j<result.length;j++){
						if((/[a-z0-9]/i).test(answer[j])){
							continue;
						}
						else if(answer[j]==null){
							answer.splice(j,1);
						}
						else{
							answer.splice(j,1);
						}
					}
					//console.log(answer);
					if(answer[1]=="CHAMBER"){
						final=[];
						continue;
					}
					var mid=[];
					for(var j=0;j<answer.length;j++){
						if(j==0){
							final.push(answer[j]);
						}
						else if(j==answer.length-1){
							continue;
						}
						else if(j==answer.length-2){
							var arrayString = mid.join(" ");
							final.push(arrayString);
							final.push(answer[j]);
						}
						else{
							mid.push(answer[j]);
						}
					}
					mid=[];
					var finalStr = final.toString();
					csv += finalStr + '\n';
					//console.log(finalStr);
					final=[];
				}
			}
		}
	}
	//console.log(csv);
}
function csvDownload(){
	var element = document.createElement('a');
    element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    element.target = '_blank';
    element.download = 'dataPrep.csv';
    element.click();
}