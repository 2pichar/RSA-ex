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

function unhash(s){
	let str = '';
	for(let i = 0; i < s.length; i+= CHAR){
		let n = number(s.slice(i, i+CHAR));
		let char = n ^ MASK;
		str += String.fromCharCode(char);
	}
	return str;
}

export default hash;
export {hash, unhash, number};