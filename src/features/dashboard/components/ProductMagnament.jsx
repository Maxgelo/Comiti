// src/components/admin/ProductManagement.jsx
import React, { useState } from 'react';
import { useLocalStorage } from '../../auth/hooks/useLocalStorage';

const ProductManagement = () => {
  const [products, setProducts] = useLocalStorage('productos', {});
  
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const product = {
      ...newProduct,
      id: Date.now().toString()
    };
    
    setProducts(prev => ({
      ...prev,
      [product.id]: product
    }));
    
    setNewProduct({ nombre: '', descripcion: '', precio: 0, stock: 0 });
  };

  const deleteProduct = (id) => {
    const confirmed = window.confirm('¿Está seguro de eliminar este producto?');
    if (confirmed) {
      const updatedProducts = {...products};
      delete updatedProducts[id];
      setProducts(updatedProducts);
    }
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      
      {/* Formulario de nuevo producto */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={newProduct.nombre}
          onChange={(e) => setNewProduct({...newProduct, nombre: e.target.value})}
          placeholder="Nombre del producto"
          required
        />
        <textarea
          value={newProduct.descripcion}
          onChange={(e) => setNewProduct({...newProduct, descripcion: e.target.value})}
          placeholder="Descripción"
          required
        />
        <input 
          type="number"
          value={newProduct.precio}
          onChange={(e) => setNewProduct({...newProduct, precio: Number(e.target.value)})}
          placeholder="Precio"
          required
        />
        <input 
          type="number"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
          placeholder="Stock"
          required
        />
        <button type="submit">Agregar Producto</button>
      </form>

      {/* Lista de productos */}
      <div className="product-list">
        {Object.values(products).map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.nombre}</h3>
            <p>Descripción: {product.descripcion}</p>
            <p>Precio: ${product.precio}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;