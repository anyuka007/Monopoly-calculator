import './App.css'
import Player from './components/Player'

function App() {

  return (
    <>      
      <h1 className="text-red-500 text-3xl font-bold underline">Monopoly Calculator</h1>
      <div className="player-container flex">
      <Player name = 'Player 1' score = {25} />  
      <Player name = 'Player 2' score = {35} />  
      <Player name = 'Player 3' score = {100} /> 
      </div> 
    </>
  )
}

export default App
