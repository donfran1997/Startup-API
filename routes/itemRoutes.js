const express = require('express');
const router = express.Router();
const elastic = require('../elasticsearch');

router.post('/add', (req, res, next) => {

  let item = {
    item_name: 'name_name',
    brand: 'brand',
    price: 'price',
    description: 'description',
    tags: ['tag1', 'tag2'],
  }

  elastic.addItem(item).then(function(result) { res.json(result)});

});

router.post('search', (req, res, next) => {
  elastic.search('name').then(function (result) { res.json(result) });
});

module.exports = router;
