// Load johnny-five lib
let five = require("johnny-five");

// init board
let board = new five.Board();

// readline lib call
const readline = require('readline');

// load morse code stuff
let morse = require("./morse-code");

// read line init
let rl = readline.createInterface(process.stdin, process.stdout);

// readline message
rl.setPrompt('Enter your message: > ');
rl.prompt();


rl.on('line', function(message) {

	// board ready
    board.on("ready", function() {
        console.log("Ready event, auto-initialized!");

        // instance of morse
        let speaker = morse(new five.Pin(2));

        // if message is 'exit', this exits the process
        if (message === "exit") {

        	process.exit(0);

            // close method called
            rl.close();
        } else {
            // send message in board to blink
            speaker(message);
		}
    });

	// prompt again for next message
    rl.prompt();

}).on('close',function(){
    process.exit(0);
});



