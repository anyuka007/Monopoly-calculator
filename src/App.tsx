import { useState } from 'react'
import { UserRoundPlus } from 'lucide-react';
import './App.css'
import Player from './components/Player'
import { generateId } from './utils/generateId';
import { generateRandomName } from './utils/generateName';
import PropertyTable from './components/Tables/PropertyTable';
import Cash from './components/Cash';
import RailroadsTable from './components/Tables/RailroadsTable.tsx';
import UtilitiesTable from './components/Tables/UtilitiesTable.tsx';

export type Player = {
  name: string;
  score: { cash: number, properties: number, railroads: number, utilities: number, total: number };
  id: string;
  properties: PropertyState[];
  railroads: RailroadsState[];
  utilities: UtilitiesState[];
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

export type RailroadsState = {
  name: string;
  owned: boolean;
  mortgaged: boolean;
  total: number;
}
export type UtilitiesState = {
  name: string;
  owned: boolean;
  mortgaged: boolean;
  total: number;
}

const initialPlayersData: PlayersState = [
  { id: generateId(), name: generateRandomName(), score: { cash: 0, properties: 0, railroads: 0, utilities: 0, total: 0 }, properties: [], railroads: [], utilities: [] },
  { id: generateId(), name: generateRandomName(), score: { cash: 0, properties: 0, railroads: 0, utilities: 0, total: 0 }, properties: [], railroads: [], utilities: [] },
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
    const newPlayer: Player = { id: generateId(), name: generateRandomName(), score: { cash: 0, properties: 0, railroads: 0, utilities: 0, total: 0 }, properties: [], railroads: [], utilities: [] };
    setPlayers([...players, newPlayer]);
    setSelectedPlayer(newPlayer.id); // Set the new player as selected
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
    `w-[120px] border p-2 rounded-lg text-center cursor-pointer transition-all duration-200 shadow-md text-white hover:scale-105 ${mode === buttonMode
      ? "border-2 border-[var(--secondary-color)] bg-[var(--primary-color)] hover:bg-[var(--primary-color)]"
      : "opacity-50 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:opacity-100"
    }`;


  const modeHandler = (selectedMode: 'classic' | 'wunderland') => {
    setMode(selectedMode);
  }

  const currentPlayer = players.find((player) => player.id === selectedPlayer) || players[0];


  return (
    <>
      <div className="flex justify-center items-center my-5">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--secondary-color)] via-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent text-center">
          Monopoly Calculator
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center my-5">
        <h2 className="hidden md:block text-xl font-bold text-[var(--tertiary-color)]">Select Your Assets, Add Cash - I Do The Math</h2>
        <h2 className="md:hidden text-xl font-bold text-[var(--tertiary-color)]">Select Your Assets, Add Cash </h2>
        <h2 className="md:hidden text-xl font-bold text-[var(--tertiary-color)]">I Do The Math</h2>
      </div>
      <div className='flex flex-col  md:flex-row  w-[95%] md:w-4/5 m-auto justify-between md:justify-center items-center gap-5'>
        
          {players.map((player) => (
            <Player
              key={player.id}
              name={player.name}
              score={player.score}
              deleteHandler={() => deletePlayer(player.id)}
              editHandler={(newName) => editPlayer(player.id, newName)}
              setSelectedPlayer={() => selectPlayer(player.id)}
              isSelected={selectedPlayer === player.id} 
              numberOfPlayers= {players.length}/>
          ))}

        <div className='flex justify-center items-center'>
          <button className='h-10 p-2 bg-[var(--primary-color)] rounded-lg hover:bg-[var(--secondary-color)] hover:scale-110' onClick={addPlayer}><UserRoundPlus color='white' /></button>
        </div>
      </div>


      {selectedPlayer && (
        <>
          <div className="w-[95%] md:w-4/5 mx-auto my-7 text-center py-3 ">
            <div className="flex flex-col md:flex-row items-center justify-center mb-4">
              {/* <h2 className="text-sm font-semibold">Selected Player:</h2> */}
              <p className="text-xl font-bold ml-2">{currentPlayer.name}</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 ">

              <div className="flex flex-col items-center">
                <p className="text-sm text-[var(--tertiary-color)]">Cash</p>
                <p className="text-lg font-bold">{currentPlayer.score.cash}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-[var(--tertiary-color)]">Property</p>
                <p className="text-lg font-bold">{currentPlayer.score.properties}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-[var(--tertiary-color)]">Railroads</p>
                <p className="text-lg font-bold">{currentPlayer.score.railroads}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-[var(--tertiary-color)]">Utilities</p>
                <p className="text-lg font-bold">{currentPlayer.score.utilities}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-[var(--tertiary-color)]">Total</p>
                <p className="text-lg font-bold">{currentPlayer.score.total}</p>
              </div>
            </div>
            {/* {currentPlayer.properties.map((property, index) => (
              <div key={index}>
                <ul>Name: {property.name}
                  <li>owned: {property.owned ? "Yes" : "No"}</li>
                  <li>houses: {property.houses}</li>
                  <li>hotel: {property.hotel ? "Yes" : "No"}</li>
                  <li>mortgaged: {property.mortgaged ? "Yes" : "No"}</li></ul>
              </div>
            ))} */}
          </div>


          <Cash selectedPlayer={currentPlayer} players={players} setPlayers={setPlayers} />

          <div className="flex w-[95%] md:w-4/5 mx-auto gap-5 justify-end items-center m-5">
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
          <div className='w-[95%] mx-auto md:w-4/5 flex flex-col md:flex-row  justify-between items-start md:gap-7 mt-3'>
            <div className='w-full md:w-1/2'>
              <RailroadsTable
                mode={mode}
                selectedPlayer={currentPlayer}
                players={players}
                setPlayers={setPlayers} />
            </div>
            <div className='w-full md:w-1/2'>
              <UtilitiesTable
                mode={mode}
                selectedPlayer={currentPlayer}
                players={players}
                setPlayers={setPlayers} />
            </div>
          </div>
        </>
      )}
      <footer className="w-full bg-[var(--primary-color)] text-white text-center py-6 mt-10">
  <div className="flex flex-col items-center gap-1">
    <p className="text-sm">© 2025 Monopoly Calculator</p>
    <p className="text-sm flex items-center gap-1">
      Built with ❤️ by <a href="https://github.com/anyuka007" className="underline hover:text-[var(--secondary-color)]">Anna Popova</a>
    </p>
  </div>
</footer>
    </>
  )
}

export default App
