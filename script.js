// PAGE NAVIGATION

function showJudge(){
document.getElementById("home").classList.add("hidden");
document.getElementById("judge").classList.remove("hidden");
}

function showWheel(){
document.getElementById("home").classList.add("hidden");
document.getElementById("wheelPage").classList.remove("hidden");
}

function backHome(){
location.reload();
}

function openPrivacy(){
window.location.href="privacy.html";
}



/* IMAGE CROPPER */

let cropper;

document.getElementById("photoInput").addEventListener("change",function(e){

let file=e.target.files[0];
let url=URL.createObjectURL(file);

let img=document.getElementById("imagePreview");

img.src=url;

if(cropper){
cropper.destroy();
}

cropper=new Cropper(img,{
aspectRatio:1,
viewMode:1
});

});


function cropImage(){

if(!cropper){
alert("Upload image first");
return;
}

let canvas=cropper.getCroppedCanvas({
width:300,
height:300
});

document.getElementById("imagePreview").src=canvas.toDataURL();

cropper.destroy();

}



/* SELFIE JUDGE */

function ratePhoto(){

let loader=document.getElementById("loading");
let result=document.getElementById("result");

result.innerHTML="";

loader.classList.remove("hidden");

setTimeout(()=>{

let score=(Math.random()*4+5.5).toFixed(1);

let reply=replies[Math.floor(Math.random()*replies.length)];

loader.classList.add("hidden");

result.innerHTML="<h2>"+score+" / 10</h2><p>"+reply+"</p>";

},3000);

}



/* SHARE CARD GENERATOR */

function generateCard(){

let canvas=document.getElementById("shareCanvas");
let ctx=canvas.getContext("2d");

let img=document.getElementById("imagePreview");

let resultText=document.getElementById("result").innerText;

ctx.fillStyle="#ffffff";
ctx.fillRect(0,0,400,520);

ctx.fillStyle="#7B6CFF";
ctx.font="bold 28px sans-serif";
ctx.textAlign="center";
ctx.fillText("SaaS",200,40);

ctx.drawImage(img,100,70,200,200);

ctx.fillStyle="#7B6CFF";
ctx.font="bold 16px sans-serif";
ctx.fillText("@RateMe",200,295);

ctx.fillStyle="#222";
ctx.font="20px sans-serif";

let lines=resultText.split("\n");

let y=330;

lines.forEach(line=>{
ctx.fillText(line,200,y);
y+=28;
});

ctx.fillStyle="#7B6CFF";
ctx.font="16px sans-serif";
ctx.fillText("Rated by SaaS",200,480);

let link=document.createElement("a");

link.download="rateme-card.png";

link.href=canvas.toDataURL();

link.click();

}



/* SPIN WHEEL */

let names=[];
let theWheel;

function addName(){

let input=document.getElementById("nameInput");

let name=input.value.trim();

if(!name) return;

names.push(name);

input.value="";

updateList();

buildWheel();

}



function updateList(){

let list=document.getElementById("nameList");

list.innerHTML="";

names.forEach(n=>{

let li=document.createElement("li");

li.textContent=n;

list.appendChild(li);

});

}



function buildWheel(){

let segments=names.map((n,i)=>({

fillStyle:i%2?"#7B6CFF":"#E9E6FF",

text:n

}));

theWheel=new Winwheel({

canvasId:"wheelCanvas",

numSegments:names.length,

segments:segments,

animation:{
type:"spinToStop",
duration:7,
spins:8,
callbackFinished:showWinner
}

});

}



function startSpin(){

if(!theWheel||names.length<2){

alert("Add at least 2 names");

return;

}

/* Rewarded Ad Placeholder */

/*
showAd().then(()=>{
theWheel.startAnimation();
});
*/

theWheel.startAnimation();

}



function showWinner(segment){

document.getElementById("winner").innerHTML="Winner: "+segment.text;

confetti({

particleCount:120,

spread:70,

origin:{y:0.6}

});

}