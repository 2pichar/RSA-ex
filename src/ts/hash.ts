function encode(s: str): str{
	let buf: Buffer = Buffer.alloc(s.length);
	buf.fill(0);
	buf.write(s, 0, s.length, 'utf8');
	return buf.toString('hex');
}

function decode(s: str): str{
	return Buffer.from(s, 'hex').toString('utf8');
}

function decimal(s: str): int64{
	return BigInt(Number.parseInt(s, 16));
}

function hex(n: int | int64): str{
	return n.toString(16);
}

export default encode;
export {encode, decode, decimal, hex};