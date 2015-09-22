
var app = angular.module('homepage', []);


//Front end player and card definitions
var Player = function () {
	this.name = '';
	this.hand = [];
	this.points = [];
	this.runes = [];

};

var Card = function (suit, rank) {
	this.suit = suit;
	this.rank = rank;
	var alt = '';
	var runeImg = '';
	var isEight = false;
	this.attachments = [];
	
	switch (rank) {
		case 8:
			isEght = true;
			alt = 'The ' + rank + ' ';
			break;
		case 11:
			alt = 'The Jack ';
			runeImg = 'card_' + suit + '_' + rank + '.png';
			break;
		case 12:
			alt = 'The Queen ';
			runeImg = 'card_' + suit + '_' + rank + '.png';			
			break;
		case 13:
			alt = 'The King ';
			runeImg = 'card_' + suit + '_' + rank + '.png';			
			break;
		default:
			alt = 'The ' + rank + ' ';
			//runeImg = 'images/cards/card_' + suit + '_' + rank + '.png';			
			break;
	}
	switch(suit) {		
		case 0:
			alt += 'of Clubs ';
			if (isEight) {
				runeImage = 'Glasses_Clubs.jpg';
			}
			break;
		case 1:
			alt += 'of Diamonds ';
			if (isEight) {
				runeImage = 'Glasses_Diamonds.jpg';
			}			
			break;
		case 2:
			alt += 'of Hearts ';
			if (isEight) {
				runeImage = 'Glasses_Hearts.jpg';
			}			
			break;
		case 3:
			alt += 'of Spades ';
			if (isEight) {
				runeImage = 'Glasses_Spades.jpg';
			}			
			break;
	}	
	this.alt = alt;
	this.img = 'card_' + suit + '_' + rank + '.png';
	this.runeImg = runeImg;
	
};

var newP0 = new Player;
var newP1 = new Player;
var players = [newP0, newP1];
var firstCard = new Card(0, 1);
players[0].hand.push(firstCard);
for (var i=0; i<10; i++) {
	var card = new Card(0, i+1);
	players[(i+1) % 2].hand.push(card);
}
var jackedPoint = new Card(3, 10);
var jack = new Card(3, 11);
var otherPoints = new Card(2, 10);
var secondJack = new Card(2, 11);
var king = new Card(0, 13);
var queen = new Card(0, 12);

jackedPoint.attachments.push(jack);
jackedPoint.attachments.push(secondJack);
players[0].points.push(jackedPoint);
players[1].points.push(otherPoints);
players[0].runes.push(queen);
players[1].runes.push(king);
console.log(players);

app.controller('gameController', function ($scope) {
	this.players = players;
	this.str = '';
	this.log = [
      "Player 1 has played the 9 of Clubs for points",
      "Player 0 has drawn a card",
      "Player 1 has played the King of Clubs as a rune",
      "Player 0 has scuttled Player 1's 9 of Clubs with the 10 of Clubs",
      "Player 1 has played the 7 of Clubs for its one off effect.",
      "The 7 of Clubs resolves successfully.",
      "Player 1 has played the King of Hearts as a rune after playing a seven.",
      "Player 0 has played the 7 of Hearts for its one off effect.",
      "The 7 of Hearts resolves successfully.",
      "Player 0 has played the 6 of Clubs for its one off effect after playing a seven",
      "The 6 of Clubs resolves successfully.",
      "Player 1 has attempted to play the 3 of Diamonds for its one off effect",
      "Player 1 has played the 3 of Diamonds for its one off effect.",
      "Player 0 has played the Queen of Hearts as a rune",
      "Player 1 has drawn a card",
      "Player 0 has played the 7 of Spades for its one off effect.",
      "The 7 of Spades resolves successfully.",
      "Player 0 has played the 6 of Spades for points after playing a seven."
    ];
    this.count = 0;
    this.draw = function () {
    	$scope.game.log.push("Someone Drew the " + $scope.game.count + "th Card");
    	$scope.game.count++;
    };
});