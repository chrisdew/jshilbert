
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
