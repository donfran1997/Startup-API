const elasticsearch = require('elasticsearch');

// Elastic
var esclient = new elasticsearch.Client({
  host: 'localhost:9200',
});

module.exports.addItem = function(item) {
  return esclient.index({
    index: 'item',
    type: "document",
    body: item,
  });
}

module.exports.search = function (query) {
  return esclient.search({
    index: 'item',
    body: {
      query: {
        query_string: {
          default_field: "item_name",
          query: query,
        }
      }
    }
  });
}
