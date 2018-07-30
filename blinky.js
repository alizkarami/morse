var five = require("johnny-five");
var board = new five.Board();
const message = "sos";
let morse = require("./morse-code");
board.on("ready", function() {
  console.log("Ready event. Repl instance auto-initialized!");
  let speaker = morse(new five.Pin(2));
  	
	speaker(message, function(){
		process.exit(0);
	});
});
