var express = require('express');
var router = express.Router();
const SqlRunner = require('../db/sql_runner');

// CREATE a new character
router.post('/', function(req, res){
  SqlRunner.run('INSERT INTO characters (name, darkside, age) VALUES ($1, $2, $3)', [req.body.name, req.body.darkside, req.body.age])
  .then((result) => {
    res.status(201).json(result);
  });
});

// READ darkside characters
router.get('/dark', function(req, res){
  SqlRunner.run('SELECT * FROM characters WHERE darkside = TRUE')
  .then((result) => {
    res.status(200).json(result.rows);
  });
});

// READ all characters
router.get('/', function(req, res){
  SqlRunner.run("SELECT * FROM characters")
  .then((result) => {
    res.status(200).json(result.rows);
  });
});


// UPDATE
router.patch('/:id', function(req, res) {
  SqlRunner.run
  ('UPDATE characters SET name = $1, darkside = $2, age = $3 where id = $4', [req.body.name, req.body.darkside, req.body.age, req.params.id])
  .then((result) => {
    res.status(201).json(result);
    });
});

// DELETE
router.delete('/:id', function(req, res) {
  SqlRunner.run('DELETE FROM characters WHERE id = $1', [req.params.id])
  .then((result) => {
    res.status(202).json(result);
    });
});

// READ all characters with their lightsabers
router.get('/sabers', function(req, res){
  SqlRunner.run("SELECT characters.name AS character_name, lightsabers.colour FROM characters LEFT JOIN lightsabers ON lightsabers.owner_id = characters.id")
  .then((result) => {
    res.status(200).json(result.rows);
  });
});


module.exports = router;
