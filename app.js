(function () {

	var dealButton = document.getElementById('deal');
	var hitBtn = document.getElementById('hit');
	var standBtn = document.getElementById('stand');
	var playAgainBtn = document.getElementById('playAgain');

	var dealerPoints = 0;
	var playerPoints = 0;

	let deck = [
		'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
		'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
		'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
		'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
	];

	let dealer = [];
	let player = [];


	//DEAl (PLAY) FUNCTION

	dealButton.addEventListener("click", deal);
	function deal(){
		deck = shuffle();
		console.log(deck);
		player.push(deck.shift());
		dealer.push(deck.shift());
		player.push(deck.shift());
		dealer.push(deck.shift());
		console.log('player: ', player);
		console.log('dealer: ', dealer);
		playerPoints = getHandValue(player);
		dealerPoints = getHandValue(dealer);
		if (dealerPoints === 21 || playerPoints === 21) {
			showWinner();
		}
		var playerCards = document.getElementById('playerCards');
		var dealerCards = document.getElementById('dealerCards');
		showCardsOnTable(player[0], playerCards, true);
		showCardsOnTable(player[1], playerCards, true);
		showCardsOnTable(dealer[0], dealerCards, false);
		showCardsOnTable(dealer[1], dealerCards, true);
		playerPoints = getHandValue(player);
		dealerPoints = getHandValue(dealer);
		dealButton.classList.toggle('hidden');
		hitBtn.classList.toggle('hidden');
		standBtn.classList.toggle('hidden');
		playerPoints = getHandValue(player)
		dealerPoints = getHandValue(dealer)
		document.getElementById('playerBoard').innerHTML = 'player: ' + playerPoints
		document.getElementById('scoreBoard').innerHTML = 'dealer: ' + getCardValue(dealer[1]);
	}

	
	// 	//If statement here: check for 21 on either hand.
	// })
	standBtn.addEventListener("click", stand);

	//showCardsOnTableFuction
	function showCardsOnTable(card, cardsDiv, isFaceUp) {
		var cardImage = document.createElement('img');
		cardImage.classList.add('card');

		if (isFaceUp) {
			cardImage.src = 'img/' + card + '.png';
		}
		else {
			cardImage.src = 'img/back.png';
		}
		cardsDiv.appendChild(cardImage);

	}

	//hit function
	var hitBtn = document.getElementById('hit');
	hitBtn.addEventListener('click', function () {
		player.push(deck.shift());
		var lastIndex = player.length - 1;
		console.log(deck);
		console.log("player", player)
		console.log("dealer", dealer)
		var playerCards = document.getElementById("playerCards");
		showCardsOnTable(player[lastIndex], playerCards, true);
		playerPoints = getHandValue(player)
		if (playerPoints > 21) {
			showWinner();
		}
		document.getElementById('playerBoard').innerHTML = 'player: ' + playerPoints
		document.getElementById('scoreBoard').innerHTML = 'dealer: ' + getCardValue(dealer[1]);
		//if statemnt check for >21
	});


	//ShowWinnerFunction
	function showWinner() {
		document.getElementById('dealerCards').innerHTML = '';
		showCardsOnTable(dealer[0], dealerCards, true);
		showCardsOnTable(dealer[1], dealerCards, true);
		console.log(playerPoints)
		console.log(dealerPoints)
		playerPoints = getHandValue(player);
		dealerPoints = getHandValue(dealer);
		document.getElementById('playerBoard').innerHTML = 'player: ' + playerPoints
		document.getElementById('scoreBoard').innerHTML = 'dealer: ' + dealerPoints;

		winner.classList.remove('hidden')
		winner.classList.remove('alert-warning')
		winner.classList.remove('alert-success')
		winner.classList.remove('alert-danger')
		if (dealerPoints === playerPoints) {
			winner.innerText = "Its a push";
			winner.classList.add('alert-warning')
		}

		else if (dealerPoints > playerPoints) {
			if (dealerPoints > 21) {
				winner.innerText = "You win"
				winner.classList.add('alert-success');
			}
			else if (dealerPoints === 21) {
				winner.innerText = "Dealer wins";
				winner.classList.add("alert-danger")
			}

			else {
				winner.innerText = "Dealer wins";
				winner.classList.add('alert-danger');
			}
		}

		else {
			if (playerPoints > 21) {
				winner.innerText = "Dealer wins";
				winner.classList.add("alert-danger")
			}

			else if (playerPoints === 21) {
				winner.innerText = "You win"
				winner.classList.add('alert-success');
			}

			else {
				winner.innerText = "You win"
				winner.classList.add('alert-success');
			}
		}
		hitBtn.classList.add('hidden');
		standBtn.classList.add('hidden');
		playAgainBtn.classList.toggle("hidden");

	}

	//playAgain function//

	playAgainBtn.addEventListener("click", function () {
		hitBtn.classList.toggle('hidden');
		standBtn.classList.toggle('hidden');
		playerCards.innerHTML = ''
		dealerCards.innerHTML = ''
		winner.classList.add('hidden')
		player = [];
		dealer = [];
		 playerPoints = 0;
		 dealerPoints = 0;
		 scoreBoard.innerHTML=''
		 playerBoard.innerHTML=''
		hitBtn.classList.toggle('hidden');
		standBtn.classList.toggle('hidden');
		playAgain.classList.toggle('hidden');
		dealButton.classList.toggle('hidden');
		
	});
	

	function stand() {
		hitBtn.classList.toggle('hidden');
		standBtn.classList.toggle('hidden');
		document.getElementById('dealerCards').innerHTML = "Dealer Cards";
		showCardsOnTable(dealer[0], dealerCards, true);
		showCardsOnTable(dealer[1], dealerCards, true);
		dealerPoints = getHandValue(dealer)
		while (dealerPoints <= 16) {
			dealer.push(deck.shift());
			showCardsOnTable(dealer[dealer.length - 1], dealerCards, true)
			dealerPoints = getHandValue(dealer)
		}
		dealerPoints = getHandValue(dealer)
		playerPoints = getHandValue(player)
		console.log(playerPoints)
		console.log(dealerPoints)
		document.getElementById('playerBoard').innerHTML = 'player: ' + playerPoints
		document.getElementById('scoreBoard').innerHTML = 'dealer: ' + dealerPoints;
		showWinner();
	}

	function getHandValue(hand) {
		var total = 0;
		var nonAces = []
		var aces = [];

		nonAces = hand.filter(function (card) {
			return card[0] !== 'A'
		})

		aces = hand.filter(function (card) {
			return card[0] == 'A'
		});
		nonAces.forEach(function (card) {
			total += getCardValue(card)
		});

		aces.forEach(function (card) {
			total += getCardValue(card)
			if (total > 21) total -= 10;

		})
		return total;
	}


	function getCardValue(card) {

		switch (card[0]) {
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				return parseInt(card[0]);
			case '1':
			case 'J':
			case 'Q':
			case 'K':
				return 10
			default:
				return 11

		}
	}

	//Create a sort function to deal with all the aces last.
	//Do all the html first
	function shuffle() {

		// Fisher–Yates Shuffle        
		// Source: https://bost.ocks.org/mike/shuffle/

		let array = [
			'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
			'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
			'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
			'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
		];

		var m = array.length, t, i;

		// While there remain elements to shuffle…
		while (m) {

			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

})();