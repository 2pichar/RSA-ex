const MASK = 2**8;
const CHAR = 4;
function number(bits){
	return +(`0x${bits}`);
}
function hash(s){
	let hexStr = '';
	for(let i = 0; i < s.length; i++){
		hexStr += (s.charCodeAt(i) ^ MASK).toString(16).padStart(CHAR, '0');
	}
	return hexStr;
}

function unhash(h){
	let mod = h.length % CHAR;
	h.padStart(CHAR * ((h.length - mod)/CHAR + (mod == 0 ? 0 : 0)), '0');
	let str = '';
	for(let i = 0; i < h.length; i+= CHAR){
		let n = number(h.slice(i, i+CHAR));
		let char = n ^ MASK;
		str += String.fromCharCode(char);
	}
	return str;
}

export default hash;
export {hash, unhash, number};