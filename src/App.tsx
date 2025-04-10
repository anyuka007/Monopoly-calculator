import { useState } from 'react'
import { UserRoundPlus } from 'lucide-react';
import './App.css'
import Player from './components/Player'
import { generateId } from './utils/generateId';
import { generateRandomName } from './utils/generateName';
import PropertyTable from './components/Tables/PropertyTable';
import Cash from './components/Cash';

export type Player = {
  name: string;
  score: {cash: number, properties: number, railroads: number, utilities: number, total: number};
  id: string;
}

type PlayersState = Player[];

function App() {
  const idPlayer1: string = generateId();
  const idPlayer2: string = generateId();
  const namePlayer1: string = generateRandomName();
  const namePlayer2: string = generateRandomName();
  const [players, setPlayers] = useState<PlayersState>([
    { id: idPlayer1, name: namePlayer1, score: {cash: 0, properties: 0, railroads: 0, utilities: 0, total: 0} },
    { id: idPlayer2, name: namePlayer2, score: {cash: 0, properties: 0, railroads: 0, utilities: 0, total: 0} },
  ]);
  const [mode, setMode] = useState<'classic' | 'wunderland'>('wunderland');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const addPlayer = () => {
    if (players.length >= 6) {
      alert('Cannot add more than 6 players');
      return;
    }
    const newPlayer: Player = { id: generateId(), name: generateRandomName(), score: {cash: 0, properties: 0, railroads: 0, utilities: 0, total: 0} };
    setPlayers([...players, newPlayer]);
    console.log(`Player ${newPlayer.name} is added`);
  }

  const deletePlayer = (id: string) => {
    const updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers);
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
    console.log(`Player is edited`);
  };

  const selectPlayer = (id: string) => {
  const selPlayer = players.find((player) => player.id === id) || null;
  setSelectedPlayer(selPlayer);
};

const updateCash = (id: string, cash: number) => {
  const updatedPlayers = players.map((player) => {  
    if (player.id === id) {
      const updatedScore = {
        ...player.score,
        cash: cash,
        total: cash + player.score.properties + player.score.railroads + player.score.utilities, // Berechne total neu
      };
      return { ...player, score: updatedScore };
    }
    return player;
  }
  );
  setPlayers(updatedPlayers);

  if (selectedPlayer?.id === id) {
    setSelectedPlayer({
      ...selectedPlayer,
      score: {
        ...selectedPlayer.score,
        cash: cash,
        total: cash + selectedPlayer.score.properties + selectedPlayer.score.railroads + selectedPlayer.score.utilities,
      },
    });
  }
  console.log(`Player ${id} cash is updated`);

}

const updateProperties = (playerId: string, properties: number) => {
  const updatedPlayers = players.map((player) => {
    if (player.id === playerId) {
      return {
        ...player,
        score: {
          ...player.score,
          properties: properties,
          total: player.score.cash + properties + player.score.railroads + player.score.utilities, // Aktualisiere total
        },
      };
    }
    return player;
  });
  setPlayers(updatedPlayers);

  if (selectedPlayer?.id === playerId) {
    setSelectedPlayer({
      ...selectedPlayer,
      score: {
        ...selectedPlayer.score,
        properties: properties,
        total: selectedPlayer.score.cash + properties + selectedPlayer.score.railroads + selectedPlayer.score.utilities,
      },
    });
  }
  console.log(`Player ${playerId} properties updated to ${properties}`);
};

  const modeButtonStyle = (buttonMode: 'classic' | 'wunderland') =>
    `w-[120px] border p-2 rounded-lg text-center cursor-pointer transition-all duration-200 ${mode === buttonMode
      ? "bg-blue-500 text-white shadow-md"
      : "bg-gray-200 text-black hover:bg-gray-300"
    }`;


  const modeHandler = (selectedMode: 'classic' | 'wunderland') => {
    setMode(selectedMode);
  }


  return (
    <>
      <div className="flex justify-center items-center m-5">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-600 bg-clip-text text-transparent text-center">
          Monopoly Calculator
        </h1>
      </div>
      <div className='flex flex-col  md:flex-row w-[95%] m-auto justify-between md:justify-center items-center gap-2'>
        <div className="flex flex-wrap gap-4 justify-center">
          {players.map((player) => (
            <Player key={player.id} name={player.name} score={player.score} deleteHandler={() => deletePlayer(player.id)} editHandler={(newName) => editPlayer(player.id, newName)} 
            setSelectedPlayer={() => selectPlayer(player.id)} />
          ))}
        </div>

        <div className='flex justify-center items-center'>
          <button className='h-10 p-2 bg-blue-500 rounded-lg shadow-[4px_4px_8px_#777777,-4px_-4px_8px_#ffffff]' onClick={addPlayer}><UserRoundPlus color='white' /></button>
        </div>
      </div>

      {selectedPlayer && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">Selected Player:</h2>
          <p className="text-lg">{selectedPlayer.name}</p>
          <p className="text-sm text-gray-500">Cash: {selectedPlayer.score.cash}</p>
          <p className="text-sm text-gray-500">Property: {selectedPlayer.score.properties}</p>
          <p className="text-sm text-gray-500">Railroads: {selectedPlayer.score.railroads}</p>
          <p className="text-sm text-gray-500">Utilities: {selectedPlayer.score.utilities}</p>
          <p className="text-sm text-gray-500">Total: {selectedPlayer.score.total}</p>
        </div>
      )}

      <Cash selectedPlayer={selectedPlayer} updateCash={updateCash}/>

      <div className="flex gap-2 justify-end items-center m-5">
        <div className={modeButtonStyle("classic")} onClick={() => modeHandler("classic")}>Classic</div>
        <div className={modeButtonStyle("wunderland")} onClick={() => modeHandler("wunderland")}>Wunderland</div>
      </div>
      <div>
        <PropertyTable 
        mode={mode}
        selectedPlayer= {selectedPlayer}
        updateProperties={updateProperties} />
      </div>
    </>
  )
}

export default App
