import { useState } from 'react'
import { UserRoundPlus } from 'lucide-react';
import './App.css'
import Player from './components/Player'
import { generateId } from './utils/generateId';
import { generateRandomName } from './utils/generateName';

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
    const newPlayer: Player = {id: generateId(), name: generateRandomName(), score: 0 };
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
      <div className="flex justify-center items-center m-10">  
      <h1 className="text-green-500 text-3xl font-bold underline">Monopoly Calculator</h1></div>
      <div className="flex justify-center items-center">
      {players.map((player) => (
        <Player key={player.id} name={player.name} score={player.score} deleteHandler = {() => deletePlayer(player.id)} editHandler={() => editPlayer(player.id, "newName")} />
      ))}
      <button className='p-2 bg-blue-500' onClick={addPlayer}><UserRoundPlus /></button>
      </div> 
    </>
  )
}

export default App
