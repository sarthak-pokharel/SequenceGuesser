

import SequenceGuesser from './SequenceGuesser.js'
let $ = document.querySelector.bind(document);
let $s = document.querySelectorAll.bind(document);
let sequenceGuesser = new SequenceGuesser();

window.onload = (function(){
	$('#add-p-element').onclick = (ev) => {	
		addPatternInput();
	}
	$('#remove-p-element').onclick = (ev) => {	
		removePatternInput();
	}
	$("#calculate").onclick = (ev) => {
		calculateInput();
	}
});

function addPatternInput (){
	let patternCont = htmlCompo.getComponent('patterns').node;
	patternCont.appendChild(newElement('pattern-elem', {
		value: 0
	}));
}
function removePatternInput() {
	let patternEls = [...$s('pattern-elem')];
	if (patternEls.length<=3) {
		return alert('At least 3 elements required in the pattern')
	}
	patternEls.slice(-1)[0].remove()
}
function calculateInput() {
	let inputsContainer = [...$s('pattern-elem input')];
	let inputs = inputsContainer.map(x=>+x.value);
	let nextElem = sequenceGuesser.guessNext(inputs);
	nextElem = Math.round(nextElem)
	$('#output').innerHTML = 
	`The next element might be ${nextElem} or around it`;
}
function newElement(elname,props) {
	let el = document.createElement(elname);
	Object.keys(props).forEach(key=>el.setAttribute(key,props[key]));
	return el;
}