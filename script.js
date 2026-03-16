
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

// PHOTO JUDGE

function ratePhoto(){

let score = (Math.random()*4+5.5).toFixed(1);

let reply = replies[Math.floor(Math.random()*replies.length)];

document.getElementById("result").innerHTML =
"<h2>"+score+" / 10</h2><p>"+reply+"</p>";

}

// SPIN WHEEL

let names = [];
let canvas = document.getElementById("wheel");
let ctx = canvas.getContext("2d");
let angle = 0;

function addName(){

let input = document.getElementById("nameInput");
let name = input.value.trim();

if(name){
names.push(name);
input.value="";
drawWheel();
}

updateList();

}

function updateList(){

let list = document.getElementById("nameList");
list.innerHTML="";

names.forEach(n=>{
let li=document.createElement("li");
li.textContent=n;
list.appendChild(li);
});

}

function drawWheel(){

let arc = 2*Math.PI/names.length;

for(let i=0;i<names.length;i++){

ctx.beginPath();
ctx.fillStyle = i%2 ? "#7B6CFF" : "#E9E6FF";

ctx.moveTo(150,150);
ctx.arc(150,150,150,i*arc,(i+1)*arc);
ctx.fill();

ctx.fillStyle="#000";
ctx.save();

ctx.translate(150,150);
ctx.rotate(i*arc+arc/2);

ctx.fillText(names[i],60,0);

ctx.restore();

}

}

function spinWheel(){

if(names.length<2){
alert("Add at least 2 names");
return;
}

let spin = Math.random()*2000+2000;

angle += spin;

canvas.style.transition="transform 7s ease-out";
canvas.style.transform="rotate("+angle+"deg)";

setTimeout(showWinner,7000);

}

function showWinner(){

let deg = angle % 360;
let slice = 360/names.length;

let index = Math.floor((360-deg)/slice)%names.length;

document.getElementById("winner").innerHTML =
"<h2>Winner: "+names[index]+"</h2>";

}