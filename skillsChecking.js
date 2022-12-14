module.exports.skillsChecking=function(receivedText,skillsForThisJob){
  const skill=require(__dirname+"/data/skillList.js");
  const skillsList=skill.skillList();

    var receivedTextCopy=receivedText.split(' ');
    skillsList.forEach(function(item){
    var count=0;
    for(let i=0;i<receivedTextCopy.length;i++){
      var data=receivedTextCopy[i];
      if(data.toLowerCase().includes(item.toLowerCase())){
        count=1;
        break;
      }
    };
    if(count){
          var temp=item.toLowerCase();
          var x=0;
          if(temp in skillsForThisJob){
              x=skillsForThisJob[temp];
            }
          skillsForThisJob[temp]=count+x;
    }
  });
keysSorted = Object.keys(skillsForThisJob).sort(function(a,b){return skillsForThisJob[b]-skillsForThisJob[a]})
  //Top 10 Most needed skills
  var ans=[];
  for(i=0;i<10 && i<keysSorted.length;i++){
    ans.push(keysSorted[i]);
  }
  return ans;
}
