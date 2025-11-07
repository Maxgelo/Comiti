// src/components/client/Cart.jsx
import React, { useState } from 'react';
import { useLocalStorage } from '../../auth/hooks/useLocalStorage';

const Cart = () => {
  const [cart, setCart] = useLocalStorage('carrito', []);
  const [session] = useLocalStorage('sesionActiva', null);
  const [products] = useLocalStorage('productos', {});
  const [, setOrders] = useLocalStorage('pedidos', []);

  // Funciones auxiliares
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    const product = products[productId];
    if (!product || quantity > product.stock) {
      alert('Cantidad inválida o sin stock suficiente');
      return;
    }

    setCart(prev => prev.map(item => 
      item.productId === productId ? {...item, cantidad: quantity} : item
    ));
  };

  const removeItem = (productId) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const calculateSubtotal = (price, quantity) => price * quantity;

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const productPrice = products[item.productId].precio;
      return total + (productPrice * item.cantidad);
    }, 0);
  };

  const finalizeOrder = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Validar stock antes de finalizar
    const isValidStock = cart.every(item => {
      const product = products[item.productId];
      return product.stock >= item.cantidad;
    });

    if (!isValidStock) {
      alert('Algunos productos no tienen suficiente stock');
      return;
    }

    try {
      const newOrder = {
        id: Date.now().toString(),
        clienteId: session.id,
        fecha: new Date().toISOString(),
        total: calculateTotal(),
        estado: 'pendiente',
        productos: cart.map(item => ({
          productoId: item.productId,
          cantidad: item.cantidad,
          precioUnitario: products[item.productId].precio
        }))
      };

      setOrders(prev => [...prev, newOrder]);
      
      // Actualizar el stock de los productos
      Object.values(newOrder.productos).forEach(orderItem => {
        const updatedProducts = {...products};
        updatedProducts[orderItem.productoId].stock -= orderItem.cantidad;
        localStorage.setItem('productos', JSON.stringify(updatedProducts));
      });

      // Limpiar el carrito
      setCart([]);
      alert('¡Pedido realizado con éxito!');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Hubo un error al procesar su pedido. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="cart-container">
      <h2>Mi Carrito</h2>
      
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => {
              const product = products[item.productId];
              return (
                <div key={index} className="cart-item">
                  <h3>{product.nombre}</h3>
                  <p>Cantidad: {item.cantidad}</p>
                  <p>Subtotal: ${calculateSubtotal(product.precio, item.cantidad)}</p>
                  
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.productId, item.cantidad - 1)}>-</button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={item.cantidad}
                      onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                    />
                    <button onClick={() => updateQuantity(item.productId, item.cantidad + 1)}>+</button>
                  </div>
                  
                  <button onClick={() => removeItem(item.productId)} className="remove-button">
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Resumen del Pedido</h3>
            <p>Total: ${calculateTotal()}</p>
            <button onClick={finalizeOrder} className="checkout-button">
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;