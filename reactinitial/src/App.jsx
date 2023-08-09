import React, { useState, useEffect } from 'react';
import LoadingMask from './LoadingMask';
import Character from './Character';
import data from './data';


const App = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [subShow, setSubShow] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setClients(data);
      setLoading(false);
    }, 1000); 
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSubShow(true);
    }, 10000);
  }, []);

  const handleSubscribed = () => {
    setTimeout(() => {
      setSubShow(false);
    }, 5000);
  }

  return (
    <div>
      <h1>Veterinarian admin - clients</h1>
      {loading ? (
        <LoadingMask />
      ) : (
        clients.map((client, clientIndex) => (
          <div key={clientIndex}>
            <h2>{client.name}</h2>
            {client.pets.map((pet, petIndex) => (
              <Character
                key={petIndex}
                name={pet.name}
                details={`Animal: ${pet.animal}, Vaccinated: ${pet.isVaccinated}`}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default App;
