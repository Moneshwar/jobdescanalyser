module.exports.content=function(url,skillsForThisJob)
{
    const puppeteer = require('puppeteer');
    const Skills=require(__dirname+'/skillsChecking');
    const token=require(__dirname+"/tokenizer.js");
    return (async () => {
        const browser = await puppeteer.launch({
        headless: false
    });
    const page = (await browser.pages())[0];
    await page.goto(url);
    const extractedText = await page.$eval('.job-desc', (el) => el.innerText);
    const receivedText=await token.tokenizer(extractedText);
    ans=Skills.skillsChecking(receivedText,skillsForThisJob);
    await browser.close();
    return ans;
    })();
}
