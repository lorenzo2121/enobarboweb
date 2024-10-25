
// src/components/Magazzino.js
import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, set, push, onValue, update } from 'firebase/database';
import '../styles/magazzino.css';

function Magazzino() {
  const [alcoholName, setAlcoholName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [alcoholStock, setAlcoholStock] = useState({});

  useEffect(() => {
    const stockRef = ref(database, 'magazzino/');
    onValue(stockRef, (snapshot) => {
      const data = snapshot.val();
      setAlcoholStock(data || {});
    });
  }, []);

  // Aggiungi nuovo alcolico al magazzino
  const handleAddAlcohol = () => {
    if (alcoholName && quantity > 0) {
      const newAlcoholRef = push(ref(database, 'magazzino/'));
      set(newAlcoholRef, {
        name: alcoholName,
        quantity: quantity,
        finished: false,
      });
      setAlcoholName('');
      setQuantity(0);
    }
  };

  // Decrementa la quantità o segna come finito
  const handleFinishAlcohol = (alcoholId) => {
    const currentQuantity = alcoholStock[alcoholId].quantity || 0;
    if (currentQuantity > 1) {
      update(ref(database, `magazzino/${alcoholId}`), { quantity: currentQuantity - 1 });
    } else {
      update(ref(database, `magazzino/${alcoholId}`), { quantity: 0, finished: true });
    }
  };

  // Aggiungi quantità a un alcolico finito
  const handleAddStock = (alcoholId, addQuantity) => {
    const newQuantity = (alcoholStock[alcoholId].quantity || 0) + addQuantity;
    update(ref(database, `magazzino/${alcoholId}`), { quantity: newQuantity, finished: false });
  };

  return (
    <div className="magazzino-container">
      <h1 className="white-text">Magazzino</h1>
      
      {/* Form per aggiungere un nuovo alcolico */}
      <div className="add-alcohol-form">
        <input
          type="text"
          placeholder="Nome alcolico"
          value={alcoholName}
          onChange={(e) => setAlcoholName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantità"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button onClick={handleAddAlcohol}>Aggiungi Alcolico</button>
      </div>

      {/* Lista di alcolici con gestione delle scorte */}
      <div className="alcohol-list">
        {Object.entries(alcoholStock).map(([id, alcohol]) => (
          <div key={id} className="alcohol-item">
            <h3 className="white-text">{alcohol.name}</h3>
            <p className="white-text">Quantità: {alcohol.quantity}</p>

            {alcohol.finished ? (
              <div className="restock-container">
                <input
                  type="number"
                  placeholder="Quantità da aggiungere"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button onClick={() => handleAddStock(id, quantity)}>Aggiungi</button>
              </div>
            ) : (
              <button onClick={() => handleFinishAlcohol(id)}>Finito</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Magazzino;
