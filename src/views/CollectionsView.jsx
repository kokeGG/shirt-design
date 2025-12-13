import React from 'react';
import CollectionItem from '../components/CollectionItem';

export default function CollectionsView({ onAddToCart }) {
  // Aquí defines tu catálogo de playeras
  const catalogItems = [
    {
      id: 'cat-001',
      name: 'Playera Básica Negra',
      description: 'Playera de algodón 100%, corte clásico',
      price: 150,
      stock: 25,
      image: `${process.env.PUBLIC_URL}/images/playera-negra-frente.jpeg`,
      color: 'black',
      type: 'catalog'
    },
    {
      id: 'cat-002',
      name: 'Playera Básica Blanca',
      description: 'Playera de algodón 100%, corte clásico',
      price: 150,
      stock: 30,
      image: `${process.env.PUBLIC_URL}/images/playera-blanca-frente.jpeg`,
      color: 'white',
      type: 'catalog'
    },
    // {
    //   id: 'cat-003',
    //   name: 'Playera Logo Kinelo',
    //   description: 'Diseño exclusivo con logo frontal',
    //   price: 200,
    //   stock: 8,
    //   // image: `${process.env.PUBLIC_URL}/images/catalog/playera-logo.jpg`,
    //   color: 'black',
    //   type: 'catalog'
    // },
    // {
    //   id: 'cat-004',
    //   name: 'Playera Edición Especial',
    //   description: 'Diseño limitado, 100% algodón premium',
    //   price: 250,
    //   stock: 0,
    //   image: `${process.env.PUBLIC_URL}/images/catalog/playera-especial.jpg`,
    //   color: 'white',
    //   type: 'catalog'
    // },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          🛍️ Nuestras Colecciones
        </h2>
        <p className="text-gray-600">
          Selecciona tus playeras favoritas de nuestro catálogo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogItems.map(item => (
          <CollectionItem
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}