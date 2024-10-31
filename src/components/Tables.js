import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { ref, onValue, update } from "firebase/database";
import '../styles/tables.css';

function Tables() {
  const [tables, setTables] = useState({});

  useEffect(() => {
    const tablesRef = ref(database, 'tavoli/');
    const unsubscribe = onValue(tablesRef, (snapshot) => {
      const data = snapshot.val();
      setTables(data || {});
    });

    return () => unsubscribe();
  }, []);

  // Funzione per gestire il reset del tavolo
  const handleTablePaid = (tableId) => {
    update(ref(database, `tavoli/${tableId}`), {
      contatore: 0,
      totale: 0,
      ordini: null, // Rimuove tutti gli ordini
    });
  };

  // Funzione per aggiornare lo stato "Da Servire" a "Servito"
  const handleServeOrder = (tableId, orderId) => {
    update(ref(database, `tavoli/${tableId}/ordini/${orderId}`), { servito: 1 });
  };

  return (
    <div className="tables">
      <h1>Lista Tavoli</h1>
      {Object.entries(tables).length === 0 ? (
        <p>Nessun tavolo disponibile.</p>
      ) : (
        Object.entries(tables).map(([tableId, tableData]) => (
          <div key={tableId} className="table">
            <h2>{tableId}</h2>
            <p>Contatore: {tableData.contatore}</p>
            <p>Totale: €{tableData.totale}</p>
            <h3>Ordini:</h3>
            <ul>
              {tableData.ordini ? (
                Object.entries(tableData.ordini).map(([orderId, orderData]) => (
                  <li key={orderId} className="order-item">
                    <p><strong>Cocktail:</strong> {orderData.cocktailName}</p>
                    <p><strong>Nome:</strong> {orderData.nome}</p>
                    <p><strong>Cognome:</strong> {orderData.cognome}</p>
                    <p><strong>Prezzo:</strong> €{orderData.prezzo}</p>
                    {orderData.servito === 1 ? (
                      <span className="served">Servito</span>
                    ) : (
                      <button 
                        className="serve-button" 
                        onClick={() => handleServeOrder(tableId, orderId)}
                      >
                        Da Servire
                      </button>
                    )}
                  </li>
                ))
              ) : (
                <li>Nessun ordine effettuato.</li>
              )}
            </ul>
            <button className="paid-button" onClick={() => handleTablePaid(tableId)}>
              Pagato
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Tables;
