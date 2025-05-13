import { useState } from 'react'
import { UserRoundPlus } from 'lucide-react';
import './App.css'
import Player from './components/Player'
import { generateId } from './utils/generateId';
import { generateRandomName } from './utils/generateName';
import PropertyTable from './components/Tables/PropertyTable';
import Cash from './components/Cash';
import RailroadsTable from './components/Tables/RailroadsTable.tsx';

export type Player = {
  name: string;
  score: { cash: number, properties: number, railroads: number, utilities: number, total: number };
  id: string;
  properties: PropertyState[];
}

export type PlayersState = Player[];

export type PropertyState = {
  name: string;
  owned: boolean;
  houses: number;
  hotel: boolean;
  mortgaged: boolean;
  total: number;
}

const initialPlayersData: PlayersState = [
  { id: generateId(), name: generateRandomName(), score: { cash: 0, properties: 0, railroads: 0, utilities: 0, total: 0 }, properties: [] },
  { id: generateId(), name: generateRandomName(), score: { cash: 0, properties: 0, railroads: 0, utilities: 0, total: 0 }, properties: [] },
];

function App() {
  const [players, setPlayers] = useState<PlayersState>(
    initialPlayersData);
  const [mode, setMode] = useState<'classic' | 'wunderland'>('wunderland');
  const [selectedPlayer, setSelectedPlayer] = useState<string>(initialPlayersData[0].id);

  const addPlayer = () => {
    if (players.length >= 6) {
      alert('Cannot add more than 6 players');
      return;
    }
    const newPlayer: Player = { id: generateId(), name: generateRandomName(), score: { cash: 0, properties: 0, railroads: 0, utilities: 0, total: 0 }, properties: [] };
    setPlayers([...players, newPlayer]);
    console.log(`Player ${newPlayer.name} is added`);
  }

  const deletePlayer = (id: string) => {
    if (players.length <= 2) {
      console.warn('Cannot delete player. At least 2 players are required.');
      return;
    }
    const updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers);
    setSelectedPlayer(updatedPlayers[0]?.id); // Set the first player as selected if available
    console.log(`Player is deleted`);
  };

  const editPlayer = (id: string, newName: string) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === id) {
        return { ...player, name: newName };
      }
      return player;
    });
    setPlayers(updatedPlayers);

    if (selectedPlayer === id) {
      setSelectedPlayer(id);
    }

    console.log(`Player is edited`);
  };

  const selectPlayer = (id: string) => {
    const selPlayer = players.find((player) => player.id === id) || players[0];
    setSelectedPlayer(selPlayer.id); // Set the first player as selected if available
  };
  
  const modeButtonStyle = (buttonMode: 'classic' | 'wunderland') =>
    `w-[120px] border p-2 rounded-lg text-center cursor-pointer transition-all duration-200 shadow-md text-white hover:scale-110 ${mode === buttonMode
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-yellow-500 hover:bg-yellow-600"
    }`;


  const modeHandler = (selectedMode: 'classic' | 'wunderland') => {
    setMode(selectedMode);
  }

  const currentPlayer = players.find((player) => player.id === selectedPlayer) || players[0];


  return (
    <>
      <div className="flex justify-center items-center m-5">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-600 bg-clip-text text-transparent text-center">
          Monopoly Calculator
        </h1>
      </div>
      <div className='flex flex-col  md:flex-row w-[95%] m-auto justify-between md:justify-center items-center gap-5'>
        <div className="flex flex-wrap gap-4 justify-center">
          {players.map((player) => (
            <Player
              key={player.id}
              name={player.name}
              score={player.score}
              deleteHandler={() => deletePlayer(player.id)}
              editHandler={(newName) => editPlayer(player.id, newName)}
              setSelectedPlayer={() => selectPlayer(player.id)}
              isSelected={selectedPlayer === player.id} />
          ))}
        </div>

        <div className='flex justify-center items-center'>
          <button className='h-10 p-2 bg-blue-500 rounded-lg shadow-[4px_4px_8px_#777777,-4px_-4px_8px_#ffffff]' onClick={addPlayer}><UserRoundPlus color='white' /></button>
        </div>
      </div>
      <div className='flex justify-center mt-5'> <p>Select a player</p></div>


      {selectedPlayer && (
        <>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">Selected Player:</h2>
            <p className="text-lg">{currentPlayer.name}</p>
            <p className="text-sm text-gray-500">Cash: {currentPlayer.score.cash}</p>
            <p className="text-sm text-gray-500">Property: {currentPlayer.score.properties}</p>
            <p className="text-sm text-gray-500">Railroads: {currentPlayer.score.railroads}</p>
            <p className="text-sm text-gray-500">Utilities: {currentPlayer.score.utilities}</p>
            <p className="text-sm text-gray-500">Total: {currentPlayer.score.total}</p>
            {currentPlayer.properties.map((property, index) => (
              <div key={index}>
                <ul>Name: {property.name}
                  <li>owned: {property.owned ? "Yes" : "No"}</li>
                  <li>houses: {property.houses}</li>
                  <li>hotel: {property.hotel ? "Yes" : "No"}</li>
                  <li>mortgaged: {property.mortgaged ? "Yes" : "No"}</li></ul>
              </div>
            ))}
          </div>


          <Cash selectedPlayer={currentPlayer} players={players} setPlayers={setPlayers} />

          <div className="flex w-3/5 mx-auto gap-2 justify-end items-center m-5">
            <div className={modeButtonStyle("classic")} onClick={() => modeHandler("classic")}>Classic</div>
            <div className={modeButtonStyle("wunderland")} onClick={() => modeHandler("wunderland")}>Wunderland</div>
          </div>
          <div>
            <PropertyTable
              mode={mode}
              selectedPlayer={currentPlayer}
              players={players}
              setPlayers={setPlayers} />
          </div>
          <div>
            <RailroadsTable />
          </div>
        </>
      )}
    </>
  )
}

export default App
