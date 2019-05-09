

var platforms; // platform obj 
var player; // player obj 
var cursors; // controls 
var stars; // stars obj 
var diamonds; // diamonds obj
var hitPlatform; // hitPlatform check 
var is_right = 3;

var stars_number = 7; // number of stars in the level 
var stars_dist = 60; // the distance between the stars 

var diamonds_number = 1; // number of diamonds in the level

var scoreText; // the text for each of the data that it corresponds to it 
var livesText; 
var levelText;
var barrierText;
var shootText;
var boostext;


var score = 0; // data of the player 
var lives = 3;
var level = 0;
var barrier = 100;
var shoot = 100;
var boost = 100;

var images = // images that needs to be imported 
[
	'assets/img/sky.png',
	'assets/img/platform.png',
	'assets/img/star.png',
	'assets/img/diamond.png'
];

var reference_chart;

var key_input = { empty: true }; // variable that will hold all key inputs for the play scene 
