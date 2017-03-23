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
		console.log("platforms.js module loaded");
		for(let i = 0; i < 200; i ++){
			grid[i] =[];
			next[i] =[];
			temp[i] =[];
			for( let j = 0; j < 200; j++){
			grid[i][j] = {a:0, b:0};
			next[i][j] = {a:0, b:0};
			}
		}
	},
	
	 calculate: function(){
		for( let i = 0; i < 200; i++){
			for( let j = 0; j < 200; j++){
				let cell = grid[i][j];
				
				let a = cell.a;
				let b = cell.b;
				
				let da = 1;
				let db = .5;
				let f = .055;
				let k = .062;
				let nexta = a + (da * laplace(i, j, a) - 
							a * b * b +
							f* (1 - a));
				let nextb = b +(db * laplace(i, j, b) +
							a * b * b -
							(k + f)*b);
				cell.a = nexta;
				cell.b = nextb;
				grid[i][j] = cell;
			}
		}
	},
	
	laplace: function(i, j, x){
		//laplace: integral transform
		let answer = 0;
		  answer += x*-1;
		  answer += grid[i+1][j].x*0.2;
		  answer += grid[i-1][j].x*0.2;
		  answer += grid[i][j+1].x*0.2;
		  answer += grid[i][j-1].x*0.2;
		  answer += grid[i-1][j-1].x*0.05;
		  answer += grid[i+1][j-1].x*0.05;
		  answer += grid[i-1][j+1].x*0.05;
		  answer += grid[i+1][j+1].x*0.05;
		return answer;
	},
	
	swap: function(){
	//correct???
	temp = grid;
	grid = next;
	next = temp;
	}
}