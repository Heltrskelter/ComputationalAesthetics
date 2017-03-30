(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};


module.exports = {
	 grid: [],
	 next: [],
	 temp: [],
	
	//console.log("platforms.js module loaded");
	init: function(){
		console.log("diffusion init called");
		for(let i = 0; i < 200; i ++){
			this.grid[i] =[];
			this.next[i] =[];
			this.temp[i] =[];
			for( let j = 0; j < 200; j++){
			this.grid[i][j] = {a:1, b:0};
			this.next[i][j] = {a:1, b:0};
			}
		}
		for(let i = 100; i < 110; i++){
		for(let j = 100; j < 110; j++){
		this.grid[i][j].b = 1;
		}
		}
	},
	
	 calculate: function(){
		 //console.log("diffusion calculate called");
		for( let i = 0; i < 200; i++){
			for( let j = 0; j < 200; j++){
				let cell = this.grid[i][j];
				
				let a = cell.a;
				let b = cell.b;
				
				let da = 1;
				let db = .5;
				let f = .055;
				let k = .062;
				let nexta = a + (da * this.laplaceA(i, j, a) - 
							a * b * b +
							f* (1 - a));
				let nextb = b +(db * this.laplaceB(i, j, b) +
							a * b * b -
							(k + f)*b);
				cell.a = this.nexta;
				cell.b = this.nextb;
				this.grid[i][j] = cell;
			}
		}
	},
	
	laplaceA: function(i, j, a){
		//console.log("diffusion laplaceA called");
		//laplace: integral transform
		let answer = 0;
			let previ =(i == 0)? 199 : i -1;
			let nexti = (i == 199)? 0 : i +1;
			let prevj =(j == 0)? 199 : j -1;
			let nextj = (j == 199)? 0 : j +1;
			
		  answer += a*-1;
		  answer += this.grid[nexti][j].a*0.2;
		  answer += this.grid[previ][j].a*0.2;
		  answer += this.grid[i][nextj].a*0.2;
		  answer += this.grid[i][prevj].a*0.2;
		  answer += this.grid[previ][prevj].a*0.05;
		  answer += this.grid[nexti][prevj].a*0.05;
		  answer += this.grid[previ][nextj].a*0.05;
		  answer += this.grid[nexti][nextj].a*0.05;
		return answer;
	},
	laplaceB: function(i, j, b){
		//console.log("diffusion laplaceB called");
		//laplace: integral transform
		let answer = 0;
			let previ =(i == 0)? 199 : i -1;
			let nexti = (i == 199)? 0 : i +1;
			let prevj =(j == 0)? 199 : j -1;
			let nextj = (j == 199)? 0 : j +1;
			
		  answer += b*-1;
		  answer += this.grid[nexti][j].b*0.2;
		  answer += this.grid[previ][j].b*0.2;
		  answer += this.grid[i][nextj].b*0.2;
		  answer += this.grid[i][prevj].b*0.2;
		  answer += this.grid[previ][prevj].b*0.05;
		  answer += this.grid[nexti][prevj].b*0.05;
		  answer += this.grid[previ][nextj].b*0.05;
		  answer += this.grid[nexti][nextj].b*0.05;
		return answer;
	},
	
	swap: function(){
		//console.log("diffusion swap called");
	this.temp = this.grid;
	this.grid = this.next;
	this.next = this.temp;
	}
}
},{}],2:[function(require,module,exports){
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
},{"./diffusion.js":1}]},{},[2]);
