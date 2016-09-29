function Bestenliste () {

	this.lowdb = require('lowdb');

	const db = this.lowdb('db.json');

	db.defaults({ posts: [], user: {} })
	  .value();

	db.get('posts')
	  .push({ id: 1, title: 'lowdb is awesome'})
	  .value();

	db.set('user.name', 'typicode')
	  .value();

	console.log(
		db.get('posts')
  		.find({ id: 1 })
  		.value()
  	);

  	this.db = db;

}

module.exports = new Bestenliste();