(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const y of s.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&n(y)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();const u=document.querySelector("canvas"),f=u.getContext("2d"),R=document.querySelector("span"),w=document.querySelector("section"),S="ArrowLeft",T="ArrowRight",M="ArrowDown",d=20,h=14,v=30,g=["red","green","blue","yellow","purple","orange","cyan"];let c=0;u.width=d*h;u.height=d*v;f.scale(d,d);const a=b(h,v);function b(e,t){return Array(t).fill().map(()=>Array(e).fill(0))}const o={position:{x:5,y:5},shape:[[1,1],[1,1]]},E=[[[1,1],[1,1]],[[1,1,0],[0,1,1]],[[0,1,0],[1,1,1]],[[1,1,1,1]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[0,1]],[[1,0],[1,0],[1,1]],[[1,0],[1,1],[0,1]]];let m=0,A=0,l=1e3;function x(e=0){const t=e-A;A=e,c<=50?l=1e3:c<=400?l=500:c<=800?l=200:c<=1200?l=100:c<=1600?l=50:c<=2e3?l=25:c<=2400&&(l=10),m+=t,m>l&&(o.position.y++,p()&&(o.position.y--,O(),L()),m=0),q(),window.requestAnimationFrame(x)}function q(){f.fillStyle="#000",f.fillRect(0,0,u.width,u.height),a.forEach((e,t)=>{e.forEach((r,n)=>{r===1&&(f.fillStyle="yellow",f.fillRect(n,t,1,1))})}),o.shape.forEach((e,t)=>{e.forEach((r,n)=>{r&&(f.fillStyle=g[Math.floor(Math.random()*g.length)],f.fillRect(o.position.x+n,o.position.y+t,1,1))})}),R.innerText=c}document.addEventListener("keydown",e=>{if(e.key===S&&(o.position.x--,p()&&o.position.x++),e.key===T&&(o.position.x++,p()&&o.position.x--),e.key===M&&(o.position.y++,p()&&(o.position.y--,O(),L())),e.key==="ArrowUp"){const t=[];for(let n=0;n<o.shape[0].length;n++){const i=[];for(let s=o.shape.length-1;s>=0;s--)i.push(o.shape[s][n]);t.push(i)}const r=o.shape;o.shape=t,p()&&(o.shape=r)}});function p(){return o.shape.find((e,t)=>e.find((r,n)=>{var i;return r!==0&&((i=a[o.position.y+t])==null?void 0:i[o.position.x+n])!==0}))}function O(){o.shape.forEach((e,t)=>{e.forEach((r,n)=>{r===1&&(a[o.position.y+t][o.position.x+n]=1)})}),o.position.x=Math.floor(h/2),o.position.y=0,o.shape=E[Math.floor(Math.random()*E.length)],p()&&(window.alert(`******** Game Over ---- Score: ${c} ********`),a.forEach(e=>e.fill(0)),c=0)}function L(){const e=[];a.forEach((t,r)=>{t.every(n=>n===1)&&e.push(r)}),e.forEach(t=>{a.splice(t,1);const r=Array(h).fill(0);a.unshift(r),D(),c+=40})}function D(){const e=new window.Audio("punto.mp3");e.volume=.5,e.play()}w.addEventListener("click",()=>{w.remove(),x();const e=new window.Audio("tetriss.mp3");e.volume=.5,e.play()});
