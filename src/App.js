// src/App.js
import React, { useEffect, useState } from 'react';
import { database } from './firebase'; // Importa la tua configurazione Firebase
import { ref, onValue } from "firebase/database"; // Importa le funzioni necessarie dal database
import './App.css';

function App() {
  const [tables, setTables] = useState({}); // Stato per memorizzare i tavoli

  useEffect(() => {
    const tablesRef = ref(database, 'tavoli/'); // Riferimento alla parte 'tavoli' del database
    const unsubscribe = onValue(tablesRef, (snapshot) => {
      const data = snapshot.val(); // Ottieni i dati
      setTables(data || {}); // Aggiorna lo stato con i dati (o oggetto vuoto se null)
    });

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1>Lista Tavoli</h1>
      {Object.entries(tables).length === 0 ? ( // Controllo per l'oggetto vuoto
        <p>Nessun tavolo disponibile.</p>
      ) : (
        Object.entries(tables).map(([tableId, tableData]) => (
          <div key={tableId} className="table">
            <h2>{tableId}</h2>
            <p>Contatore: {tableData.contatore}</p>
            <p>Totale: €{tableData.totale}</p>
            <h3>Ordini:</h3>
            <ul>
              {tableData.ordini ? ( // Verifica se ci sono ordini
                Object.entries(tableData.ordini).map(([orderId, cocktailName]) => (
                  <li key={orderId}>{cocktailName}</li>
                ))
              ) : (
                <li>Nessun ordine effettuato.</li>
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
