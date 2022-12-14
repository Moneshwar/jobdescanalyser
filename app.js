const express=require("express");
const puppeteer = require('puppeteer');
const bodyParser=require("body-parser");
const content=require(__dirname+'/content');
const Skills=require(__dirname+'/skillsChecking');
var url = '';
const app=express();
const PORT = process.env.PORT ||3000;
var skillsForThisJob={};
var TopSkills=[];
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
app.get('/',function(req,res){
  if(url.length==0)
  {
    res.render("home",{});
  }
  else
  {
        (async () => {
          const browser = await puppeteer.launch({
            headless:false
          });
          const page = await browser.newPage();
          await page.goto(url, { waitUntil: 'networkidle0' });
          //Collecting required HREFS from the home page
            const hrefs = await page.evaluate(() => {
              return Array.from(document.querySelectorAll('.jobTupleHeader .info.fleft a.title.fw500.ellipsis')).map(x=>x.href);
            });
                  var ans;
                  for (let i=0;i<hrefs.length && i<5;i++) {
                    ans=content.content(hrefs[i],skillsForThisJob);
                  };
                  ans.then(function(res)
                  {
                    keysSorted = Object.keys(skillsForThisJob).sort(function(a,b){return skillsForThisJob[b]-skillsForThisJob[a]})
                    for(i=0;i<10 && i<keysSorted.length;i++){
                      TopSkills.push(keysSorted[i]);
                    }
                  print();
                  });
            await browser.close();
            })();
            function print()
            {
              console.log(skillsForThisJob);
              res.render("result",{top:TopSkills});
            }

  }

})
app.post("/home",function(req,res){
  url="";
  skillsForThisJob={};
  TopSkills=[];
  res.redirect('/');
})
app.post('/',function(req,res){
  url=req.body.enteredItem;
  res.redirect('/');
})
app.listen(PORT,function(){
  console.log("Port started at ${PORT}");
});
