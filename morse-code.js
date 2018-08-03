// s -> stand for short beep
// l -> stand for long beep
const lettersToMorse = {
	"a": "sl",
	"b": "lsss",
	"c": "lsls",
	"d": "lss",
	"e": "s",
	"f": "ssls",
	"g": "lls",
	"h": "ssss",
	"i": "ss",
	"j": "slll",
	"k": "lsl",
	"l": "slll",
	"m": "ll",
	"n": "ls",
	"o": "lll",
	"p": "slls",
	"q": "llsl",
	"r": "sls",
	"s": "sss",
	"t": "l",
	"u": "ssl",
	"v": "sssl",
	"w": "sll",
	"x": "lssl",
	"y": "lsll",
	"z": "llss",
	"1": "sllll",
	"2": "sslll",
	"3": "sssll",
	"4": "ssssl",
	"5": "sssss",
	"6": "lssss",
	"7": "llsss",
	"8": "lllss",
	"9": "lllls",
	"0": "lllll"
};

// output code
module.exports = function(pin){

	// set unit 8
	const unit = 8;

	// gap between each beep milliseconds
	const gap = 7;

	console.log(pin.type);

	let beep = function(num, cb){
		cb = cb || function(){};

		// check pin is digital or not
		if(pin.type === "digital"){
			beepDigital(num, cb);
		}
		else{
			beepAnalog(num, cb);
		}
	};

	// beep digital method
	let beepDigital = function(num, cb){
		if(num){
			pin.high();
			pin.low();
			setTimeout(function(){
				beep(num-1, cb);
			},gap);
		}
		else{
			pin.low();
			setTimeout(cb, unit*gap);
		}
	};

	// analog beep method
	let beepAnalog = function(num, cb){
		if(num){
			pin.write(255);
			pin.write(0);
			setTimeout(function(){
				beep(num-1, cb);
			},gap);
		}
		else{
			pin.low();
			setTimeout(cb, unit*gap);
		}
	};


	// long character
	const long = function(cb) {
		cb = cb || function(){};
		beep(3*unit, cb);
	};

    // short character
	const short = function(cb){
		cb = cb || function(){};
		beep(unit, cb);
	};

	// pause character
	const pause = function(cb){
		setTimeout(cb, 2*unit*gap);
	};

	// in the case of space character
	const space = function(cb){
		setTimeout(cb, 4*unit*gap);
	};

	// parse string method
	let parse = function(str,cb){
		if(str.length){
			const l = str[0];
			process.stdout.write(l);
			str = str.slice(1);

			// checks if letter is l or s
			if( l === "s" ){
				short(function(){
					parse(str,cb);
				});
			}
			else{
				long(function(){
					parse(str, cb);
				});
			}
		}
		else{
			process.stdout.write("\n");
			pause(cb);
		}
	};

	// return encoded morse code to send in the kit
	const say = function(msg, cb){
		if(msg.length){
			let l = msg[0];
			msg = msg.slice(1);
			let code = lettersToMorse[l];
			if(code){
				process.stdout.write(l+": ");
				parse(code, function(){
					say(msg, cb);
				});
			}
			else if( l === " "){
				space(function(){
					say(msg, cb);
				});
			}
			else{
				say(msg, cb);
			}
		} 
		else{
			cb();
		}
	};

	return say;
};