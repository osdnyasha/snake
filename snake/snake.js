window.onload = function() {
	canvas = document.getElementById('snake');
	ctx = canvas.getContext('2d');
	document.addEventListener("keydown",keyPush);
	setInterval(game,1000/10);
}
px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail=5;
score=0;
maxScore = null;

function game() {
	px += xv;
	py += yv;
	if(px < 0) {
		px = tc -1;
	}
	if(px > tc - 1)
		px = 0;
	if(py < 0) {
		py = tc -1;
	}
	if(py > tc - 1)
		py = 0;
	
	ctx.fillStyle = "#ccc";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "black";
	for(var i=0;i<trail.length;i++){
		ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
		if(trail[i].x == px && trail[i].y == py) {
			tail = 5;
			gameOver();
		}
	}
	trail.push({x:px,y:py});
	while(trail.length > tail) {
		trail.shift();
		
	}
	if(ax == px && ay == py) {
		tail++;
		score++;
		ax=Math.floor(Math.random()*tc);
		ay=Math.floor(Math.random()*tc);
	}

	ctx.fillStyle="red";
	ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
	document.getElementById('score').innerHTML = score;
}
var direction ;


function keyPush(event) {
	if(direction !== event.keyCode){
		switch(event.keyCode) {
			case 37:
				xv=-1;yv=0;
				direction = 39;
				break;
			case 38:
				xv=0;yv=-1;
				direction = 40;
				break;
			case 39:
				xv=1;yv=0;
				direction = 37;
				break;
			case 40:
				xv=0;yv=1;
				direction = 38;
				break;

		}
	}
}

function gameOver() {
	if(score != 0) {
		if(maxScore < score)
			maxScore = score;
		alert("You lose! Your scores is " + score + ". Best Score " + maxScore);
		score = 0;
	}

}
