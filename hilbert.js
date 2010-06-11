
/**
 * Battenburg is simply a 2x2 matrix with non-mutating
 * methods.
 * 
 * @param {Object} a
 * @param {Object} b
 * @param {Object} c
 * @param {Object} d
 */
function Battenburg(a, b, c, d) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
}
/**
 * Returns a new battenburg mirrored on the x=0 line, i.e. swaps up and down.
 */
Battenburg.prototype.mirror_x = function() {
	return new Battenburg(this.c, this.d, this.a, this.b);
}
/**
 * Returns a new battenburg rotated 90 degress clockwise.
 */
Battenburg.prototype.rotate_c = function(){
	return new Battenburg(this.c, this.a, this.d, this.b);
}
/**
 * Returns a new battenburg rotated 90 degress counter-clockwise.
 */
Battenburg.prototype.rotate_cc = function(){
	return new Battenburg(this.b, this.d, this.a, this.c);
}
Battenburg.prototype.divide_by_scalar = function(div) {
	return new Battenburg(this.a / div, this.b / div, this.c / div, this.d /div)
}
Battenburg.prototype.add = function(bb) {
	return new Battenburg(this.a + bb.a, this.b + bb.b, this.c + bb.c, this.d + bb.d)
}


/**
 * This is recursive function for calculating the  
 * length of the hilbert curve required to get to
 * the point (x,y).
 * 
 * The third parameter is optional - it defaults to
 * the degree of precision required for doubles.
 * 
 * The fourth parameter should not be specified -
 * it defaults to the correct value.  This parameter
 * only exists because it is given non-default values
 * during the recursion.
 * 
 * @param {double} x - 0 <= x < 1
 * @param {double} y - 0 <= y < 1
 * @param {int} recursion - optional
 * @param {Battenburg} curve - don't specify this
 */
function hilbert_2d_to_1d(x, y, recursion, curve) {
	//console.log(x, y, recursion, curve);	
	if (curve === undefined) {
		curve = new Battenburg(0.0, 0.25, 0.75, 0.5);
	}
	if (recursion === undefined) {
		recursion = 28;	// a good number for doubles
	}
	if (recursion <= 0) {
		return 0.0;
	}
		
	var retv = undefined;
	if (x >= 0.0 && x < 0.5 && y >= 0.0 && y < 0.5) {
	   	retv = curve.a 
		     + hilbert_2d_to_1d( x*2, y*2
							   , recursion - 1
			                   , curve.mirror_x().rotate_c()
							   ) / 4;
	}	
	if (x >= 0.5 && x < 1.0 && y >= 0.0 && y < 0.5) {
	   	retv = curve.b 
		     + hilbert_2d_to_1d( (x - 0.5)*2, y*2
							   , recursion - 1
			                   , curve
							   ) / 4;
	}	
	if (x >= 0.0 && x < 0.5 && y >= 0.5 && y < 1.0) {
	   	retv = curve.c 
		     + hilbert_2d_to_1d( x*2, (y - 0.5)*2
							   , recursion - 1
			                   , curve.mirror_x().rotate_cc()
							   ) / 4;
	}	
	if (x >= 0.5 && x < 1.0 && y >= 0.5 && y < 1.0) {
	   	retv = curve.d 
		     + hilbert_2d_to_1d( (x - 0.5)*2, (y - 0.5)*2
							   , recursion - 1
			                   , curve
							   ) / 4;
	}
	//console.log(x, y, recursion, curve);	
	//console.log("retv: " + retv);
	return retv;
}

function hilbert_1d_to_2d(d, recursion, curve) {
	console.log(d, recursion, curve);	
	if (curve === undefined) {
		curve = new Battenburg(0.0, 0.25, 0.75, 0.5);
	}
	if (recursion === undefined) {
		recursion = 28;	// a good number for doubles
	}
	if (recursion <= 0) {
		return [0, 0];
	}
		
	var retv = undefined;
	if (d >= curve.a && d < curve.a + 0.25) {
		var d_ = (d - curve.a) * 4;
		var adj = hilbert_1d_to_2d(d_, recursion - 1, curve.rotate_cc().mirror_x());
		retv = [0 + adj[0]/2, 0 + adj[1]/2]; 
	}
	if (d >= curve.b && d < curve.b + 0.25) {
		var d_ = (d - curve.b) * 4;
		var adj = hilbert_1d_to_2d(d_, recursion - 1, curve);
		retv = [0.5 + adj[0]/2, 0 + adj[1]/2]; 
	}
	if (d >= curve.c && d < curve.c + 0.25) {
		var d_ = (d - curve.c) * 4;
		var adj = hilbert_1d_to_2d(d_, recursion - 1, curve.rotate_c().mirror_x());
		retv = [0 + adj[0]/2, 0.5 + adj[1]/2]; 
	}
	if (d >= curve.d && d < curve.d + 0.25) {
		var d_ = (d - curve.d) * 4;
		var adj = hilbert_1d_to_2d(d_, recursion - 1, curve);
		retv = [0.5 + adj[0]/2, 0.5 + adj[1]/2]; 
	}
	
	console.log(d, recursion, curve);	
	console.log("retv: " + retv);
	return retv;
}
