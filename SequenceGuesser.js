
export default (function(globObj){
	class SequenceGuesser{
	constructor(opt) {
		this.opt = opt || {};
	}
	guessNextNoDeep(pattern_array) {
		let pattern = [...pattern_array]
		if(pattern.length < 3) {
			throw new Error("The length of sequence minimun required is 3")
		}
		let errors = {
			arithmetic: [],
			geometric: []
		}
		for (let x=1,l=pattern.length; x<l-1; x++) {
			let t_a = pattern[x-1],
			t_b = pattern[x],
			t_c = pattern[x+1];
			//Test for arithmetic mean
			errors.arithmetic.push((this.getNextArithmeticTerm(t_a,t_b)-t_c - this.getArraySum(errors.arithmetic)));
			//Test for geometric mean
			errors.geometric.push((this.getNextGeometricTerm(t_a,t_b)-t_c - this.getArraySum(errors.geometric)));
		}
		let minErr = this.getMinErrorType(errors);
		if(this.opt.debug) {
			console.log({errors,minErr})
		}
		let lastTwoVals = pattern.slice(-2)
		let guessValue = this.getNextMeanTerm(...lastTwoVals,minErr[1]);
		guessValue = guessValue - minErr[0]
		return [guessValue, errors[minErr[1]]];
	}
	guessNext(pattern_array,deep=0) {
		let [nextEl,err_array] = this.guessNextNoDeep(pattern_array);
		return nextEl
	}
	getNextMeanTerm(a,b,meantype) {
		meantype = meantype.substr(0,1).toUpperCase() + meantype.substr(1)
		return this[`getNext${meantype}Term`](a,b)
	}
	getNextArithmeticTerm(a,b) { return (b*2)-a; }
	getNextGeometricTerm(a,b) { return (b**2)/a; }
	getArraySum(arr) { return arr.reduce((x,y)=>x+y,0); }
	getMinErrorType(errors) {
		let min = [Infinity,null];
		Object.keys(errors).forEach((key)=>{
			let errSum = this.getArraySum(errors[key]);
			let errSumAbs = Math.abs(errSum)
			if (errSumAbs<Math.abs(min[0])) { min = [errSum,key]; }
		});
		return min;
	}
}
// globObj.SequenceGuesser = SequenceGuesser

return SequenceGuesser
})(this||window||global||{});