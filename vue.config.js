// function mock(app, url, data) {
//     app.get(url, (request, response) => {
//       response.json(data)
//     })
//   }

//   const homeData = require('./src/mock/bookHome')
//   const shelfData = require('./src/mock/bookShelf')
//   const listData = require('./src/mock/bookList')
//   const flatListData = require('./src/mock/bookFlatList')

//   module.exports = {
//     publicPath: process.env.NODE_ENV === 'production'
//       ? './'
//       : '/',
//     devServer: {
      
//       before(app) {
//         mock(app, '/book/home', homeData)
//         mock(app, '/book/shelf', shelfData)
//         mock(app, '/book/list', listData)
//         mock(app, '/book/flat-list', flatListData)
//       }
      
//     },
//     // configureWebpack: {
//     //   performance: {
//     //     hints: 'warning',
//     //     maxAssetSize: 524288 * 10,
//     //     maxEntrypointSize: 524288 * 10
//     //   }
//     // }
//   }
const express = require('express')
const app = express()

function mock(app, url, data) {
  app.get(url, (request, response) => {
    response.json(data)
  })
}
const mockBookHomeData = require('./src/mock/bookHome')
const mockBookShelfData = require('./src/mock/bookShelf')
const mockBookList = require('./src/mock/bookCategoryList')
const mockBookFlatList = require('./src/mock/bookFlatList')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  devServer: {
    before(app) {
      mock(app, '/book/home', mockBookHomeData)
      mock(app, '/book/shelf', mockBookShelfData)
      mock(app, '/book/list', mockBookList)
      mock(app, '/book/flat-list', mockBookFlatList)
    }
  }
}
 