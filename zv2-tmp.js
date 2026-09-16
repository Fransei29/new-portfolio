const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const dpr of [1.1, 1.25, 1.5, 1.75, 2.25]){
    const p = await b.newPage({ viewport:{width:390,height:844}, deviceScaleFactor:dpr });
    await p.goto('http://localhost:3000/', { waitUntil:'networkidle' });
    await p.addStyleTag({content:`*,*::before,*::after{animation:none!important;transition:none!important}
      .assemble,.fade-in-left,.fade-in-right,.fade-in-up,[class*=piece-]{opacity:1!important;transform:none!important}`});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,55));}});
    await p.waitForTimeout(350);
    const n = await p.evaluate(()=>document.querySelectorAll('[class*="WaveDivider_root"]').length);
    for (let i=0;i<n;i++){
      const abs=await p.evaluate((k)=>{ window.scrollTo(0,0);
        const ws=[...document.querySelectorAll('[class*="WaveDivider_root"]')];
        return ws[k].getBoundingClientRect().top+window.scrollY; }, i);
      await p.evaluate((y)=>window.scrollTo(0,Math.max(0,Math.round(y)-300)),abs);
      await p.waitForTimeout(150);
      const vp=abs-await p.evaluate(()=>window.scrollY);
      if(vp<20||vp>700) continue;
      await p.screenshot({path:`${process.argv[2]}/zz_${String(dpr).replace('.','_')}_${i}.png`,
        clip:{x:20,y:Math.max(0,vp-10),width:350,height:78}});
    }
    await p.close();
  }
  await b.close(); console.log('capturas listas');
})();
