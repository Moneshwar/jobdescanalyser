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
          await page.setViewport({ width: 1280, height: 720 });
          await page.goto(url, { waitUntil: 'networkidle0' });
            const hrefs = await page.evaluate(() => {
              return Array.from(document.querySelectorAll('.jobTupleHeader .info.fleft a.title.fw500.ellipsis')).map(x=>x.href);
            });
                  ans=[];
                  for (let i=0;i<2;i++) {
                    element=hrefs[i];
                    ans=content.content(element,skillsForThisJob,ans);
                  };
                  ans.then(function(res)
                  {
                  TopSkills=res;
                  print();
                  });
            await browser.close();
            })();
            function print()
            {
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
