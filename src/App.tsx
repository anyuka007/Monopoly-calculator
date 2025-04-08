import { useState } from 'react'
import { UserRoundPlus } from 'lucide-react';
import './App.css'
import Player from './components/Player'
import { generateId } from './utils/generateId';
import { generateRandomName } from './utils/generateName';
import PropertyTable from './components/Tables/PropertyTable';

type Player = {
  name: string;
  score: number;
  id: string;
}

type PlayersState = Player[];

function App() {
  const idPlayer1: string = generateId();
  const idPlayer2: string = generateId();
  const namePlayer1: string = generateRandomName();
  const namePlayer2: string = generateRandomName();
  const [players, setPlayers] = useState<PlayersState>([
    { id: idPlayer1, name: namePlayer1, score: 0 },
    { id: idPlayer2, name: namePlayer2, score: 0 },
  ]);

  const addPlayer = () => {
    if (players.length >= 6) {
      alert('Cannot add more than 6 players');
      return;
    }
    const newPlayer: Player = { id: generateId(), name: generateRandomName(), score: 0 };
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



  return (
    <>
      <div className="flex justify-center items-center m-5">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-600 bg-clip-text text-transparent text-center">
          Monopoly Calculator
        </h1></div>
      <div className='flex flex-col  md:flex-row w-[95%] m-auto justify-between md:justify-center items-center gap-2'>
        <div className="flex flex-wrap gap-4 justify-center">
          {players.map((player) => (
            <Player key={player.id} name={player.name} score={player.score} deleteHandler={() => deletePlayer(player.id)} editHandler={(newName) => editPlayer(player.id, newName)} />
          ))}
          </div>

        <div className='flex justify-center items-center'>
          <button className='h-10 p-2 bg-blue-500 rounded-lg bg-[#eeeded] shadow-[4px_4px_8px_#777777,-4px_-4px_8px_#ffffff]' onClick={addPlayer}><UserRoundPlus color='white'/></button>
        </div>
      </div>
      <div>
        <PropertyTable />
      </div>
    </>
  )
}

export default App
