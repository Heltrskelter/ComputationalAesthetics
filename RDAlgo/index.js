//main javascript, event onhandler
//take in 

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

window.onload = function(){
	console.log("window.onload called");
	app.index.init();
};
app.index = {
		//console.log("platforms.js module loaded");
		//  properties
		diffusion : require( "./diffusion.js" ),
		animationID: 0,
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
		this.update();
	},
	
	update: function(){
		//console.log("index update");
		this.animationID = requestAnimationFrame(this.update.bind(this));
		this.diffusion.calculate();
		this.diffusion.swap();
		
		//draw square by square
		for(let i = 0; i < this.WIDTH; i++){
			for(let j = 0; j < this.HEIGHT; j++){
				//
				let drawA = this.diffusion.next[i][j].a;
				let drawB = this.diffusion.next[i][j].b;
				
				let pos = i + j * this.WIDTH;
				let color = ((drawA - drawB)*255);
				this.ctx.fillStyle = 'rgb(color, color, color)';
				//draw squares at position
				this.ctx.fillRect(i, j, 1, 1);
			}
		}
	
	},

};