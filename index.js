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

  alphanum4 = new nodeled.AlphaNum4(board, {address: 0x74});
  matrix = new nodeled.Matrix8x8(board, {address: 0x73});
  bargraph = new nodeled.Bargraph24(board, {address: 0x70});
  sevensegment = new nodeled.SevenSegment(board, {address: 0x71});

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


  var go = true;
  var counter = 0;
  function startTimer(counter){
    if(go){
      setTimeout(function(){
        counter++;
        startTimer(counter);
        sevensegment.writeText(counter);
      }, 1000);
    }
  }
  startTimer(go);

  // var currentWord;
  // var endChar;
  // var beginChar;
  // function textWrap(text){
  //   if(go){
  //     setTimeout(function(){
  //       text = _.padEnd(text, 12);
  //       text = _.concat(text);
  //       currentWord = text;
  //       endChar = _.slice(currentWord, 0, 1);
  //       beginChar = _.slice(currentWord, 1, 1000);
  //       currentWord = _.concat(beginChar, endChar);
  //       currentWord = _.join(currentWord);
  //       text = currentWord;
  //       text = _.slice(currentWord, 9, 13);
  //       text = _.join(text); 
  //       alphanum4.writeText(text);
  //       // console.log(counter);
  //       textWrap(text);

  //       sevensegment.writeText(text);
  //     }, 1000);
  //   }
  // }
  // textWrap(inputText);

});