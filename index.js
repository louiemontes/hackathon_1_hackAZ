var five = require("johnny-five");
var nodeled = require('node-led');
var sentiment = require('sentiment');
var _ = require('lodash');

var board = new five.Board();
var inputText;
var sentimentScore;
var alphanum4;
var matrix;
var bargraph;
var sevensegment;


  var happyMatrix = [
    0b00111100,
    0b01000010,
    0b10100101,
    0b10000001,
    0b10100101,
    0b10011001,
    0b01000010,
    0b00111100
  ];
  var neutralMatrix = [
    0b00111100,
    0b01000010,
    0b10100101,
    0b10000001,
    0b10111101,
    0b10000001,
    0b01000010,
    0b00111100
  ];

  var madMatrix = [
    0b00111100,
    0b01000010,
    0b10100101,
    0b10000001,
    0b10011001,
    0b10100101,
    0b01000010,
    0b00111100
  ];

  var happyBar = [
    0b000000000000000000000000,
    0b111111111111111111111111
  ];

  var neutralBar = [
    0b111111111111111111111111,
    0b111111111111111111111111,
  ];
  var madBar = [
    0b111111111111111111111111,
    0b000000000000000000000000
  ];


board.on("ready", function() {
  console.log("Ready event. Repl instance auto-initialized!");
  inputText = "love";
  sentimentScore = sentiment(inputText).score;

  // var led = new five.Led(13);

  // this.repl.inject({
  //   led: led,
  //   board: board,
  //   io: board.io
  // });

  alphanum4 = new nodeled.AlphaNum4(board, {address: 0x74});
  matrix = new nodeled.Matrix8x8(board, {address: 0x73});
  bargraph = new nodeled.Bargraph24(board, {address: 0x70});
  sevensegment = new nodeled.SevenSegment(board, {address: 0x71});

  // global.alphanum4 = alphanum4;
  alphanum4.writeText(inputText);

  if (sentimentScore > 0) {
    matrix.drawBitmap(happyMatrix);
    bargraph.drawBitmap(happyBar);
  } else if (sentimentScore == 0) {
    matrix.drawBitmap(neutralMatrix);
    bargraph.drawBitmap(neutralBar);
  } else {
    matrix.drawBitmap(madMatrix);
    bargraph.drawBitmap(madBar);
  }



});