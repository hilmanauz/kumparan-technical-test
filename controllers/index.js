const {Article} = require("../models");
const MiniSearch = require('minisearch');
const Redis = require('ioredis-mock')
const redis = new Redis({
  port: 6379,
  host: "127.0.0.1",
})

class Controller {
  static async viewArticles(req, res) {
    let {query, author} = req.query
    try {
      const cache = await redis.get('articles')
      let data = null
      if(!cache) {
        data = await Article.findAll({
          order: [['createdAt', 'ASC']],
        })
        redis.set('articles', JSON.stringify(data))
      } else {
        data = JSON.parse(cache)
      }
      let filterAuthors = []
      if(author) {
        data.forEach(element => {
          if(element.author.includes(author)) filterAuthors.push(element)
        });
      } else {
        filterAuthors = [...data]
      }
      let results = []
      if(query) {
        let miniSearch = new MiniSearch({
          fields: ['title', 'body'], 
          storeFields: ['authors','title', 'body']
        })
        miniSearch.addAll(filterAuthors)
        let searchKeywords = miniSearch.search(query, { prefix: true })
        searchKeywords.forEach(element => {
          if (element.score > 1) {
            delete element.terms;
            delete element.match;
            delete element.score;
            results.push(element)
          }
        })
      } else {
        results = [...filterAuthors]
      }
      if(!results.length) throw { name: 'Error', message: "Keyword Not Found" }
      res.status(200).json(results)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static createArticles(req, res) {
    const data = {
      author: req.body.author,
      title: req.body.title,
      body: req.body.body,
    }
    Article.create(data)
    .then(() => {
        redis.del('articles') 
        res.status(200).json({message: "Success Create"})
      })
      .catch(err => {
        let errors
        if(err.errors) errors = err.errors.map(error => error.message)
        res.status(400).json({errors})
      })
  }
}

module.exports = Controller