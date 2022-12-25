module.exports.skillsChecking=function(receivedText,skillsForThisJob){
  const skill=require(__dirname+"/data/skillList.js");
  const skillsList=skill.skillList();
    var receivedTextCopy=receivedText.split(' ');
    skillsList.forEach(function(item){
    var count=0;
    for(let i=0;i<receivedTextCopy.length;i++){
      var data=receivedTextCopy[i];
      if(data.toLowerCase()===item.toLowerCase()){
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
}
