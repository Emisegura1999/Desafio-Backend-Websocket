const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager.js");
const cartManager = new CartManager("./src/models/carts.json");

// Crear un nuevo carrito
router.post("/carts", async (req, res) => {
    try {
        const newCart = await cartManager.createNewCart();
        res.json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener productos por ID de carrito
router.get("/carts/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    try {
        const cart = await cartManager.getCartById(cartId);
        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Agregar un producto a un carrito
router.post("/carts/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);
        res.json(updatedCart.products);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
