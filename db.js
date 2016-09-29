function Bestenliste () {

	this.lowdb = require('lowdb');
	var _ = require('lodash');

	const db = this.lowdb('db.json');

	db.defaults({ spiele: [], beste:[] })
	  .value();

	/*db.get('besten')
	  .push({name: 'Hans', siege: 5})
	  .value();

	db.get('spiele')
	.push({sieger: "Hans", 
		verlierer: "Wurst",
		toreverlierer: 5,
		timestamp: 45254234})
	.value()*/

	/*console.log(
		db.get('spiele')
  		.value()
  	);
  	console.log(
  		db.get('beste')
  		.value()
  	);*/

  	this.db = db;

  	this.calculateBests = function () {
  		console.log("calculating");
  		var bests = [];

  		var games = db.get('spiele')
  					  .value();

  		var winners = _.map(games, function (game) {
  			return game.sieger;
  		});  		

  		var winners = _.uniq(winners);


  		var winners = _.map(winners, function (winner) {
  			var obj = {};
  			obj.name = winner;
  			obj.siege = db.get('spiele')
  						  .filter({sieger: winner})
  						  .size()
  						  .value();
  			return obj;
  		});


  		var winners = _.orderBy(winners, ['siege'], ['desc']);
      console.log(winners);

  		var winners = _.dropRight(winners, winners.length - 10);
  		

  		db.get('beste')
  		  .remove()
  		  .value();

  		_.forEach(winners, function (winner) {
  			db.get('beste')
  			  .push(winner)
  			  .value();
  		});
  	};

  	this.saveGame = function (winner, looser, goalsLooser, time) {
  		db.get('spiele')
  		  .push({
  		  	sieger: winner,
  		  	verlierer: looser,
  		  	toreverlierer: goalsLooser,
  		  	timestamp: time
  		  })
  		  .value();

  		  this.calculateBests();
  	};

  	this.getBests = function () {
  		return db.get('beste')
  				 .value();
  	};

	//this.saveGame("Simon", "Patrick", 6, Math.random());

}


module.exports = new Bestenliste();