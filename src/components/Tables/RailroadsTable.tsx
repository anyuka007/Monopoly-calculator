import RailroadsTableRow from "./RailroadsTableRow";
import { Mode } from "./PropertyTable";
import { Player, PlayersState } from "../../App";
import { cellStyle } from "./PropertyTable";
import {railroadCards} from "../../variables/cardsInfo";

type RailroadCard = {
    name: { classic: string; wunderland: string };
    price: number;
    rent: number[];
    mortgageValue: number;
};


// Define the type for the RailroadsTable props
type RailroadTableProps = {
    mode: Mode;
    selectedPlayer: Player | null;
    players: PlayersState;
    setPlayers: (players: PlayersState) => void;
}


const RailroadsTable = ({mode, selectedPlayer, players, setPlayers}: RailroadTableProps) => {
    const railroadsTotal = players
        .filter((player) => player.id === selectedPlayer?.id)
        .reduce((sum, player) => {
            return sum + player.railroads.reduce((railroadsSum, railroads) => railroadsSum + railroads.total, 0);
        }, 0);

// Clears the table
const onClearHandler = () => {
    if (!selectedPlayer) return;

    const updatedPlayers = players.map((player) => {
        if (player.id !== selectedPlayer.id) return player;

        // Berechne den neuen total-Wert, falls andere Felder fehlen
        const total = (player.score.cash || 0) + (player.score.properties || 0) + (player.score.utilities || 0);

        return {
            ...player,
            score: {
                ...player.score,
                railroads: 0, // Reset properties to 0
                total: total, // Aktualisiere total
            },
            railroads: [], // Reset railroads to an empty array
        };
    });

    setPlayers(updatedPlayers);
};

    return (
        <>
        
                    {/* Clear button */}
                    <div className=" flex gap-3 justify-end items-center mt-3 ">
                        <h2> Railroads:</h2>
                        <h2>{railroadsTotal}</h2>
                        <button onClick={onClearHandler} className="w-16 border p-1 rounded-lg text-center cursor-pointer bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:scale-110 text-white shadow-md">Clear</button>
                    </div>
                    {/* Table displaying railroads data */}
                    <table className="w-full border border-[var(--tertiary-color)] border-collapse text-center mt-3 mx-auto ">
                        <thead className="w-full">
                            <tr className="w-full bg-[var(--tertiary-color)] text-xs md:text-lg font-bold text-gray-700 *:not-last:border-r-gray-400">
                                <th className={`${cellStyle} w-2/6`}>Name</th>                               
                                <th className={`${cellStyle}  w-1/6`}>Price</th>
                                <th className={`${cellStyle} w-1/6`}>Owned</th>
                                <th className={`${cellStyle} w-1/6 `}>Mortgage</th>
                                <th className={`${cellStyle} w-1/6 `}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Render a row for each railroad card */}
                            {railroadCards.map((card: RailroadCard, index:number) => (
                                <RailroadsTableRow
                                    key={index}
                                    mode={mode} // Current game mode
                                    card={card}
                                    selectedPlayer={selectedPlayer} // Current selected player
                                    players={players} // List of players
                                    setPlayers={setPlayers} // Function to set the players
                                />
                            ))}
                        </tbody>
                    </table>
                    {/* Display total railroads value and save button */}
                    <div className=" flex gap-2 justify-end items-center mt-3">
                        <div className="flex gap-2">
                            <h2>Total Railroads:</h2>
                            <h2>{railroadsTotal}</h2>
                        </div>
                    </div>
        
        </>
            );
    
}

export default RailroadsTable;
