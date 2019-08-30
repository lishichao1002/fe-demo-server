const orderConfirmData = require('./mock/orderConfirm')
const newOrder0 = require('./mock/newOrder0')
const newOrder1 = require('./mock/newOrder1')

function registerBPC (app) {

  let confirmTimes = 0

  const newOrderFun = (req, resp) => {
    if (confirmTimes % 2 === 0) {
      newOrder1.data.newOrders[0].orderId = confirmTimes
      resp.send(newOrder1)
    } else {
      resp.send(newOrder0)
    }
  }

  app.get('/bpc/newOrders', newOrderFun)
  app.post('/bpc/newOrders', newOrderFun)

  const orderConfirmFun = (req, resp) => {
    orderConfirmData.data.confirmedIds = [confirmTimes++]
    resp.send(orderConfirmData)
  }

  app.get('/bpc/orderConfirm', orderConfirmFun)
  app.post('/bpc/orderConfirm', orderConfirmFun)
}

module.exports = {
  registerBPC
}