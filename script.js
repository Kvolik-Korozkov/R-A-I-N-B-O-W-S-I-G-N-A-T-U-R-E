"use strict";
let body = document.getElementsByTagName("body")[0];
let signature = document.getElementById("signature");
signature.style.fill = "rgba(0, 0, 0, 0)";

let gradient = false;

let sign;
let signStart, signStop;
if(gradient){
	sign = signature.getElementById("linear");
	signStart = sign.children[0].attributes[2];
	signStop  = sign.children[1].attributes[2];
}else{
	sign = signature.getElementById("sign");
}

let state = 0;
let color = 0xff_00_00;
let strcolor;
let neg_strcolor;

function main(){
	/*
	red > yellow > green > cyan > blue > magenta > red
	*/
	switch(state){
		case 0:
			color += 0x00_01_00;
			if(color == 0xff_ff_00) state = 1;
			break;
		case 1:
			color -= 0x01_00_00;
			if(color == 0x00_ff_00) state = 2;
			break;
		case 2:
			color += 0x00_00_01;
			if(color == 0x00_ff_ff) state = 3;
			break;
		case 3:
			color -= 0x00_01_00;
			if(color == 0x00_00_ff) state = 4;
			break;
		case 4:
			color += 0x01_00_00;
			if(color == 0xff_00_ff) state = 5;
			break;
		case 5:
			color -= 0x00_00_01;
			if(color == 0xff_00_00) state = 0;
			break;
			
	}
	strcolor = "#" + ("000000" + color.toString(16)).slice(-6);
	neg_strcolor = "#" + ("000000" + (color^0xff_ff_ff).toString(16)).slice(-6);
	
	if(gradient){
		body.style.backgroundImage = "linear-gradient("+strcolor+", "+neg_strcolor+")";
		signStart.value = neg_strcolor;
		signStop.value  = strcolor;
	}else{
		sign.style.stroke = neg_strcolor;
		body.style.backgroundColor = strcolor;
	}
	
	window.requestAnimationFrame(main);
}
main();
