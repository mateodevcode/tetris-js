(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();const a=document.querySelector("canvas"),c=a.getContext("2d"),O=document.querySelector("span"),y=document.querySelector("section"),L="ArrowLeft",R="ArrowRight",S="ArrowDown",p=20,u=14,g=30;let E=0;a.width=p*u;a.height=p*g;c.scale(p,p);const l=T(u,g);function T(e,t){return Array(t).fill().map(()=>Array(e).fill(0))}const o={position:{x:5,y:5},shape:[[1,1],[1,1]]},m=[[[1,1],[1,1]],[[1,1,0],[0,1,1]],[[0,1,0],[1,1,1]],[[1,1,1,1]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[0,1]],[[1,0],[1,0],[1,1]],[[1,0],[1,1],[0,1]]];let h=0,w=0;function A(e=0){const t=e-w;w=e,h+=t,h>1e3&&(o.position.y++,f()&&(o.position.y--,x(),v()),h=0),q(),window.requestAnimationFrame(A)}function q(){c.fillStyle="#000",c.fillRect(0,0,a.width,a.height),l.forEach((e,t)=>{e.forEach((r,n)=>{r===1&&(c.fillStyle="yellow",c.fillRect(n,t,1,1))})}),o.shape.forEach((e,t)=>{e.forEach((r,n)=>{r&&(c.fillStyle="red",c.fillRect(o.position.x+n,o.position.y+t,1,1))})}),O.innerText=E}document.addEventListener("keydown",e=>{if(e.key===L&&(o.position.x--,f()&&o.position.x++),e.key===R&&(o.position.x++,f()&&o.position.x--),e.key===S&&(o.position.y++,f()&&(o.position.y--,x(),v())),e.key==="ArrowUp"){const t=[];for(let n=0;n<o.shape[0].length;n++){const i=[];for(let s=o.shape.length-1;s>=0;s--)i.push(o.shape[s][n]);t.push(i)}const r=o.shape;o.shape=t,f()&&(o.shape=r)}});function f(){return o.shape.find((e,t)=>e.find((r,n)=>{var i;return r!==0&&((i=l[o.position.y+t])==null?void 0:i[o.position.x+n])!==0}))}function x(){o.shape.forEach((e,t)=>{e.forEach((r,n)=>{r===1&&(l[o.position.y+t][o.position.x+n]=1)})}),o.position.x=Math.floor(u/2),o.position.y=0,o.shape=m[Math.floor(Math.random()*m.length)],f()&&(window.alert("Game Over"),l.forEach(e=>e.fill(0)))}function v(){const e=[];l.forEach((t,r)=>{t.every(n=>n===1)&&e.push(r)}),e.forEach(t=>{l.splice(t,1);const r=Array(u).fill(0);l.unshift(r),D(),E+=10})}function D(){const e=new window.Audio("punto.mp3");e.volume=.5,e.play()}y.addEventListener("click",()=>{y.remove(),A();const e=new window.Audio("tetriss.mp3");e.volume=.5,e.play()});
