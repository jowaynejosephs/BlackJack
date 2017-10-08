(function () {
	
		var dealButton = document.getElementById('deal');
		var playerTotal= 0;
		var dealerTotal=0;
	
		let deck = [
			'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
			'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
			'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
			'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
		];
	
		let dealer = [];
		let player = [];
		
		dealButton.addEventListener('click', function(){
            deck = shuffle();
        console.log(deck);

            player.push(deck.shift());
            dealer.push(deck.shift());
            player.push(deck.shift());
            dealer.push(deck.shift());
		console.log('player: ', player);
		console.log('dealer: ', dealer);

            var playerCards = document.getElementById('playerCards');
            var dealerCards = document.getElementById('dealerCards');
            showCardsOnTable(player[0], playerCards, true);
            showCardsOnTable(player[1], playerCards, true);
            showCardsOnTable(dealer[0], dealerCards, false);
			showCardsOnTable(dealer[1], dealerCards, true);
			playerTotal=getHandValue(player);
			dealerTotal=getHandValue(dealer);
			dealButton.classList.toggle('hidden');
            hitBtn.classList.toggle('hidden');
            standBtn.classList.toggle('hidden');
    })			
	
	 		//Instead create function
	 		function showCardsOnTable(card, cardsDiv, isFaceUp){
	 			var cardImage = document.createElement('img');
	 			cardImage.classList.add('card');
	
	 			if(isFaceUp){
	 			cardImage.src='img/' + card + '.png';
	 			}
	 			else {
					cardImage.src='img/back.png';
				 }
				cardsDiv.appendChild(cardImage);
			   
			 }

			 var standBtn=document.getElementById('stand');
			 standBtn.addEventListener('click', function() {
			 hitBtn.classList.toggle("hidden");
			 dealButton.classList.toggle("hidden");
			 stand.classList.toggle("hidden");
			 })
			 
			 function getHandValue(hand){
				 var total = 0;
				 for(var i=0;i <hand.length;i++){
				 var card=hand[i]
				 var cardValue = getCardValue(card);
				 total += cardValue
				}
				getHandValue();
			 }
			

			 //showWinner()
			 //Display the hand winner.
			 //Display the 'Play Again' button.

			 function showWinner(){
				 if(playerTotal>=16){
					 alert('You have won!')
				 }
				 else {
					 alert("Dealer wins");
				 }
				 showWinner();
			 }
			

			 //Add another card to the player hand.
			 // Calculate the player's hand value.
			 // If the value is greater than 21 call showWinner
			
			 var hitBtn = document.getElementById('hit');
			 hitBtn.addEventListener('click', function(){
				player.push(deck.shift());
				var lastIndex= player.length-1;
				console.log(deck);
				console.log("player", player)
				console.log("dealer", dealer)
				var playerCards = document.getElementById("playerCards");
				showCardsOnTable(player[lastIndex], playerCards, true);
				console.log(hello);
			 });


	
	 		function getCardValue(card) {
	 			var value=0;
	 			if(card.length >2){
	 				return 10
	 			}
	 			switch (card[0]){
					 case '2':
					 case '3':
					 case '4':
					 case '5':
					 case '6':
					 case '7':
					 case '8':
					 case '9':
					 return parseInt (card[0]);
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