// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// require handlebars in the project
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// routes setting首頁
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

//search頁面
app.get('/search', (req, res) => {
  const querySearch = req.query.keyword.toLowerCase()
  const restaurants = restaurantList.results.filter(function (item) {
    return item.name.toLowerCase().includes(querySearch) || item.category.toLowerCase().includes(querySearch)
  })
  res.render('index', { restaurant: restaurants, keyword: req.query.keyword })
})

//show頁面
app.get('/restaurants/:id', (req, res) => {
  const showRestaurant = restaurantList.results.find(function (item) {
    return item.id.toString() === req.params.id
  })
  res.render('show', { restaurantInfo: showRestaurant })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`express is listen on http://localhost:${port}`)
})