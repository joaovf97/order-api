const express = require("express")
const router = express.Router()

const Order = require("../models/order")

// "banco de dados" em memória
const orders = []

// =======================
// CRIAR PEDIDO
// =======================
router.post("/order", (req, res) => {

 const body = req.body

 const order = new Order(
  body.numeroPedido,
  body.valorTotal,
  body.dataCriacao,
  body.items.map(item => ({
   productId: item.idItem,
   quantity: item.quantidadeItem,
   price: item.valorItem
  }))
 )

 orders.push(order)

 res.status(201).json({
  message: "Pedido criado com sucesso",
  order: order
 })

})

// =======================
// BUSCAR PEDIDO POR ID
// =======================
router.get("/order/:orderId", (req, res) => {

 const orderId = req.params.orderId

 const order = orders.find(o => o.orderId === orderId)

 if (!order) {
  return res.status(404).json({
   message: "Pedido não encontrado"
  })
 }

 res.json(order)

})

// =======================
// LISTAR PEDIDOS
// =======================
router.get("/order/list", (req, res) => {

 res.json(orders)

})

// =======================
// ATUALIZAR PEDIDO
// =======================
router.put("/order/:orderId", (req, res) => {

 const orderId = req.params.orderId
 const body = req.body

 const order = orders.find(o => o.orderId === orderId)

 if (!order) {
  return res.status(404).json({
   message: "Pedido não encontrado"
  })
 }

 order.value = body.valorTotal
 order.creationDate = body.dataCriacao

 res.json({
  message: "Pedido atualizado com sucesso",
  order: order
 })

})

// =======================
// DELETAR PEDIDO
// =======================
router.delete("/order/:orderId", (req, res) => {

 const orderId = req.params.orderId

 const index = orders.findIndex(o => o.orderId === orderId)

 if (index === -1) {
  return res.status(404).json({
   message: "Pedido não encontrado"
  })
 }

 orders.splice(index, 1)

 res.json({
  message: "Pedido deletado com sucesso"
 })

})

module.exports = router