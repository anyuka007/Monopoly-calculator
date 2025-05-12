import PropertyTableRow from "./PropertyTableRow";
import { propertyCards } from "../../variables/cardsInfo";
import { Player, PlayersState } from "../../App";
import { OkButtonStyle } from "../Cash";

export const cellStyle = "border border-gray-400 p-2 text-center";

type PropertyCard = {
    name: { classic: string; wunderland: string };
    color: string;
    price: number;
    rent: number[];
    houseCost: number;
    mortgageValue: number;
};

// Define the type for the mode prop
export type Mode = "classic" | "wunderland";

// Define the type for the PropertyTable props
type PropertyTableProps = {
    mode: Mode;
    selectedPlayer: Player | null;
    players: PlayersState;
    setPlayers: (players: PlayersState) => void;
}

const PropertyTable = ({ mode, selectedPlayer, players, setPlayers, }: PropertyTableProps) => {
    // Calculate the total property value for the selected player
    const propertyTotal = players
        .filter((player) => player.id === selectedPlayer?.id)
        .reduce((sum, player) => {
            return sum + player.properties.reduce((propertySum, property) => propertySum + property.total, 0);
        }, 0);


    // Clears the table
    const onClearHandler = () => {
        if (!selectedPlayer) return;

        const updatedPlayers = players.map((player) => {
            if (player.id !== selectedPlayer.id) return player;

            // Berechne den neuen total-Wert, falls andere Felder fehlen
            const total = (player.score.cash || 0) + (player.score.railroads || 0) + (player.score.utilities || 0);

            return {
                ...player,
                score: {
                    ...player.score,
                    properties: 0, // Reset properties to 0
                    total: total, // Aktualisiere total
                },
                properties: [], // Reset properties to an empty array
            };
        });

        setPlayers(updatedPlayers);
    };



    return (
        <div>
            {/* Clear button */}
            <div className="w-3/5 mx-auto flex gap-3 justify-end items-center mt-3">
                <h2>Total Property:</h2>
                <h2>{propertyTotal}</h2>
                <button onClick={onClearHandler} className={OkButtonStyle}>Clear</button>
            </div>
            {/* Table displaying property data */}
            <table className="border border-gray-400 border-collapse text-center mt-3 mx-auto w-3/5">
                <thead>
                    <tr className="bg-gray-100">
                        <th className={cellStyle}>Name</th>
                        <th className={cellStyle}>Price</th>
                        <th className={cellStyle}>House Price</th>
                        <th className={cellStyle}>Owned</th>
                        <th className={cellStyle}>Houses</th>
                        <th className={cellStyle}>Hotel</th>
                        <th className={cellStyle}>Mortgage</th>
                        <th className={cellStyle}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render a row for each property card */}
                    {propertyCards.map((card: PropertyCard, index) => (
                        <PropertyTableRow
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
            {/* Display total property value and save button */}
            <div className="w-3/5 mx-auto flex gap-2 justify-end items-center mt-3">
                <div className="flex gap-2">
                    <h2>Total Property:</h2>
                    <h2>{propertyTotal}</h2>
                </div>
            </div>

        </div>
    );
}

export default PropertyTable;
