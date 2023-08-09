import React, { useState, useEffect } from 'react';

const Client = ({ client, onToggleVaccinated }) => {
  const [toggling, setToggling] = useState(false);

  const toggleVaccinated = async () => {
    setToggling(true);
    try {
      await fetch(`https://demoapi.com/api/vet/clients?search=AMIT-A-FELHASZN%C3%81L%C3%93-%C3%8DRT`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'Bodri', isVaccinated: !client.pet.isVaccinated })
      });

      onToggleVaccinated(client.id);
    } catch (error) {
      console.error('Error toggling vaccinated status:', error);
    } finally {
      setToggling(false);
    }
  };

  return (
    <div>
      <h3>{client.name}</h3>
      <p>Pet: {client.pet.name}</p>
      <p>Vaccinated: {toggling ? '...' : client.pet.isVaccinated.toString()}</p>
      <button onClick={toggleVaccinated} disabled={toggling}>
        Toggle Vaccinated
      </button>
    </div>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setLoading(true);
      fetch(`/api/vet/clients?search=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          setClients(data);
        })
        .catch(error => {
          console.error('Error fetching clients:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setClients([]);
    }
  }, [searchTerm]);

  const handleToggleVaccinated = (clientId) => {
    setClients(prevClients => {
      return prevClients.map(client => {
        if (client.id === clientId) {
          return {
            ...client,
            pet: {
              ...client.pet,
              isVaccinated: !client.pet.isVaccinated
            }
          };
        }
        return client;
      });
    });
  };

  return (
    <div>
      <h1>veterinarian admin - clients</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search clients"
      />
      <button disabled={searchTerm.length < 3 || loading}>Search</button>
      <div>
        {clients.map(client => (
          <Client
            key={client.id}
            client={client}
            onToggleVaccinated={handleToggleVaccinated}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
