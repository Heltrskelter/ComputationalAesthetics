//main javascript, event onhandler
//take in 

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

window.onload = function(){
	console.log("window.onload called");
	app.index.init();
	app.diffusion.init();
};
app.index = {
		//console.log("platforms.js module loaded");
		//  properties
		const diffusion = require( ‘diffusion’ );
		WIDTH : 200, 
		HEIGHT: 200,
		canvas: undefined,
		ctx: undefined,
		
	init: function(){
		console.log("app.index.init() called");
		// initialize properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		
		this.diffusion.init();
	},
	
	update: function(){
		this.calculate();
		this.swap();
		
		//draw square by square
		for(let i = 0; i < WIDTH; i++){
			for(let j = 0; j < HEIGHT; j++){
				//
				let drawA = next[i][j].a;
				let drawB = next[i][j].b;
				let pos = i + j * width;
				let color = ((drawA - drawB)*255);
				this.ctx.fillStyle = rgb(color, color, color);
				///maybe^^^??????
			}
		}
	},

};