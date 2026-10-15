import { test, expect } from '@playwright/test';
const chapters = ['crypton-id','x-program','in-prime','web3-xms','nutcracker','nutsfarm','academy','academy/mini'];

test('Printed page faces turn in both directions and cancel safely',async({page},testInfo)=>{
  await page.goto('/');
  await page.getByRole('button',{name:'X-Program',exact:true}).click();
  const scene=page.locator('.turn-scene');
  await expect(scene).toHaveAttribute('inert','');
  await page.locator('.page-turn').evaluate(async el=>{
    const animations=el.parentElement!.getAnimations({subtree:true});
    animations.forEach(animation=>animation.pause());
    await Promise.all(animations.map(animation=>animation.ready));
    animations.forEach(animation=>{animation.currentTime=matchMedia('(max-width:800px)').matches ? 140 : 360;});
    await new Promise(requestAnimationFrame);
  });
  await expect(scene.locator('[id]')).toHaveCount(0);
  await expect(page.locator('.turn-front')).toContainText('Мой вклад');
  await expect(page.locator('.turn-back')).toContainText('X-Program');
  if(testInfo.project.name==='desktop') {
    const hinge=await page.locator('.page-turn').evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).m11);
    expect(Math.abs(hinge)).toBeLessThan(.7);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.screenshot({path:testInfo.outputPath('printed-page-mid-turn.png'),fullPage:true});
  if(testInfo.project.name==='desktop') {
    await scene.evaluate(el=>el.getAnimations({subtree:true}).forEach(animation=>{animation.currentTime=520;}));
    await page.screenshot({path:testInfo.outputPath('printed-page-landing.png'),fullPage:true});
  }
  await scene.evaluate(el=>el.getAnimations({subtree:true}).forEach(animation=>animation.finish()));
  await expect(scene).toHaveCount(0);
  await page.getByRole('button',{name:'Crypton ID',exact:true}).click();
  await expect(page.locator('.turning-backward .page-turn')).toHaveCount(1);
  await expect(page.locator('.turn-front')).toContainText('X-Program');
  await expect(page.locator('.turn-back')).toContainText('Мой вклад');
  await page.getByRole('button',{name:'In-Prime',exact:true}).click();
  await expect(page.locator('#spread h1')).toHaveText('In-Prime');
  await expect(page.locator('.page-turn')).toHaveCount(0);
  await page.getByRole('button',{name:'NutsFarm',exact:true}).click();
  await expect(page.locator('.turn-back linearGradient')).toHaveCount(3);
  expect(await page.evaluate(()=>{
    const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);
    return ids.length===new Set(ids).size;
  })).toBe(true);
  await page.getByRole('button',{name:'Crypton ID',exact:true}).click();
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(scene).toHaveCount(0);
});
test('Mobile project tabs stay reachable while reading and return to the new chapter',async({page},testInfo)=>{
  test.skip(testInfo.project.name!=='mobile','Mobile navigation layout');
  for(const width of [320,375,800]){
    await page.setViewportSize({width,height:812});
    await page.goto('/#academy/mini');
    const nav=page.getByRole('navigation',{name:'Проекты'});
    const active=nav.locator('[aria-current="page"]');
    await expect(active).toHaveAccessibleName('Academy');
    const navBox=(await nav.boundingBox())!;
    const activeBox=(await active.boundingBox())!;
    expect(activeBox.x).toBeGreaterThanOrEqual(navBox.x);
    expect(activeBox.x+activeBox.width).toBeLessThanOrEqual(navBox.x+navBox.width);
    await page.evaluate(()=>window.scrollTo(0,900));
    await expect.poll(async()=>(await nav.boundingBox())!.y).toBe(0);
    await expect(page.locator('.book-controls')).toBeHidden();
    await nav.evaluate(el=>el.scrollTo({left:0,behavior:'instant'}));
    await nav.getByRole('button',{name:'Crypton ID',exact:true}).click();
    await expect(page.locator('#spread h1')).toHaveText('Crypton ID');
    await expect(nav.locator('[aria-current="page"]')).toHaveAccessibleName('Crypton ID');
    await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
});
test('Academy variants stay above the title and reveal ink without turning the book',async({page})=>{
  await page.goto('/#academy');
  const tabs=page.getByRole('group',{name:'Версия Academy'});
  await expect(tabs).toBeVisible();
  const before=await tabs.boundingBox();
  const heading=await page.locator('#spread h1').boundingBox();
  expect(before!.y+before!.height).toBeLessThan(heading!.y);
  await page.getByRole('button',{name:'Telegram + Base',exact:true}).click();
  await expect(page.locator('#spread h1')).toHaveText('Academy TMA');
  await expect(page.locator('.page-turn')).toHaveCount(0);
  expect((await tabs.boundingBox())!.y).toBe(before!.y);
  // Reverse while the short content reveal and tab highlight are still moving.
  await page.getByRole('button',{name:'Веб-платформа',exact:true}).click();
  await page.getByRole('button',{name:'Telegram + Base',exact:true}).click();
  await expect(page.locator('#spread h1')).toHaveText('Academy TMA');
  await expect.poll(()=>page.locator('#spread').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length)).toBe(0);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.getByRole('button',{name:'Веб-платформа',exact:true}).click();
  await expect(page.locator('#spread h1')).toHaveText('Academy');
  expect(await page.locator('#spread').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length)).toBe(0);
  await page.goBack();await expect(page.locator('#spread h1')).toHaveText('Academy TMA');
  await expect(page.locator('.page-turn')).toHaveCount(0);
});
test('All views load with favicon, stable composition, and no overflow',async({page},testInfo)=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  for(const chapter of chapters){
    await page.goto('/#'+chapter);
    await expect(page.locator('#spread h1')).toBeVisible();
    await expect(page.locator('#spread .project-heading img')).toHaveCount(0);
    await expect(page.locator('.bookmark img')).toHaveCount(7);
    await expect.poll(()=>page.locator('.bookmark img').evaluateAll(images=>images.every(img=>(img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth>0))).toBe(true);
    await expect(page.locator('.bookmark[aria-current="page"] img')).toHaveAttribute('src',new RegExp(chapter === 'academy/mini' ? 'academy-mini' : chapter));
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    for (const [content,footer] of [['.stack','.page-left .page-number'],['.notes-footer','.page-right .page-number']]) {
      const contentBox=await page.locator('#spread '+content).boundingBox();
      const footerBox=await page.locator('#spread '+footer).boundingBox();
      expect(contentBox!.y+contentBox!.height).toBeLessThanOrEqual(footerBox!.y);
    }
    const angle=await page.locator('#spread .about-note').evaluate(el=>getComputedStyle(el).transform);
    await page.reload();await expect(page.locator('#spread h1')).toBeVisible();
    expect(await page.locator('#spread .about-note').evaluate(el=>getComputedStyle(el).transform)).toBe(angle);
    await page.screenshot({path:testInfo.outputPath(chapter.replace('/','-')+'.png'),fullPage:true});
  }
  expect(errors).toEqual([]);
});
test('Navigation, history, Academy variants, notes, and NDA',async({page})=>{
  await page.goto('/');await expect(page.getByRole('button',{name:'Предыдущий проект',includeHidden:true})).toBeDisabled();
  await page.keyboard.press('ArrowRight');await expect(page).toHaveURL(/#x-program$/);
  await page.goBack();await expect(page.locator('#spread h1')).toHaveText('Crypton ID');
  await page.getByRole('button',{name:'Academy',exact:true}).click();
  await expect(page.getByRole('button',{name:'Следующий проект',includeHidden:true})).toBeDisabled();
  await page.getByRole('button',{name:'Telegram + Base',exact:true}).click();
  await expect(page).toHaveURL(/#academy\/mini$/);await expect(page.locator('#spread h1')).toHaveText('Academy TMA');
  await expect(page.getByRole('button',{name:'Telegram + Base',exact:true})).toBeFocused();
  await page.getByRole('button',{name:'Все заметки о проекте'}).click();await expect(page.locator('dialog')).toBeVisible();
  await page.keyboard.press('ArrowLeft');await expect(page).toHaveURL(/#academy\/mini$/);
  await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible();
  await expect(page.getByRole('button',{name:'Все заметки о проекте'})).toBeFocused();
  await page.getByRole('button',{name:'Исходный код закрыт по NDA'}).click();await expect(page.locator('#dialog-title')).toHaveText('Исходный код под NDA');
  await page.getByRole('button',{name:'Закрыть заметки'}).click();
  await page.getByRole('button',{name:'Все заметки о проекте'}).click();
  await page.mouse.click(1,1);await expect(page.locator('dialog')).not.toBeVisible();
});
test('Fast turns settle and reduced motion disables page flip',async({page})=>{
  await page.goto('/');
  await expect(page.locator('#spread h1')).toHaveText('Crypton ID');
  await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowLeft');
  await expect(page.locator('#spread h1')).toHaveText('X-Program');
  await expect(page.locator('.page-turn')).toHaveCount(0);
  await page.emulateMedia({reducedMotion:'reduce'});await page.keyboard.press('ArrowRight');
  await expect(page.locator('#spread h1')).toHaveText('In-Prime');await expect(page.locator('.page-turn')).toHaveCount(0);
});
test('Horizontal swipes navigate, vertical gestures and buttons do not',async({page})=>{
  await page.goto('/');
  const swipe=async(selector:string,dx:number,dy:number)=>page.locator('#spread '+selector).evaluate((target,{dx,dy})=>{
    target.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[new Touch({identifier:1,target,clientX:200,clientY:200})]}));
    target.dispatchEvent(new TouchEvent('touchend',{bubbles:true,changedTouches:[new Touch({identifier:1,target,clientX:200+dx,clientY:200+dy})]}));
  },{dx,dy});
  await swipe('.about-note',-120,5);await expect(page).toHaveURL(/#x-program$/);
  await swipe('.about-note',5,120);await expect(page).toHaveURL(/#x-program$/);
  await swipe('.all-notes',-120,5);await expect(page).toHaveURL(/#x-program$/);
});
