var generators = {
  '/blog/tables/article': {
    './templates/create-table.handlebars': './data/article.sql',
    './templates/model.handlebars': './dist/app/models/article.js',
    './templates/view.handlebars': './dist/app/views/article.js'
  },
  '/blog/tables/post': {
    './templates/create-table.handlebars': './data/post.sql',
    './templates/model.handlebars': './dist/app/models/post.js',
    './templates/view.handlebars': './dist/app/views/post.js'
  }
};

module.exports = {
  generators: generators
};
