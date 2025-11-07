// src/components/client/ProductList.jsx
import React, { useState } from 'react';
import { useLocalStorage } from '../../auth/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  const [products] = useLocalStorage('productos', {});
  const [cart] = useLocalStorage('carrito', []);
  const navigate = useNavigate();

  const addToCart = (productId) => {
    const product = products[productId];
    if (!product) return;

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      if (existingItem.cantidad >= product.stock) {
        alert('No hay suficiente stock disponible');
        return;
      }
      existingItem.cantidad += 1;
    } else {
      cart.push({
        productId,
        cantidad: 1
      });
    }

    localStorage.setItem('carrito', JSON.stringify(cart));
    alert('Producto agregado al carrito');
  };

  return (
    <div className="product-list-container">
      <h1>Productos Disponibles</h1>
      
      <div className="products-grid">
        {Object.values(products).map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.nombre}</h3>
            <p>{product.descripcion}</p>
            <p>Precio: ${product.precio}</p>
            <p>Stock: {product.stock}</p>
            
            <div className="product-actions">
              <button 
                onClick={() => addToCart(product.id)}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;