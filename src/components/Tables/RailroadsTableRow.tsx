import { Mode } from "./PropertyTable";
import { Player, PlayersState } from "../../App";
//import { railroadCards } from "../../variables/cardsInfo";
import { cellStyle } from "./PropertyTable";

type RailroadsTableRowProps = {
    mode: Mode;
    card: {
        name: { classic: string; wunderland: string };
        price: number;
        rent: number[];
        mortgageValue: number;
    };
    selectedPlayer: Player | null;
    players: PlayersState;
    setPlayers: (players: PlayersState) => void;
};

const RailroadsTableRow = ({mode, card, selectedPlayer, players, setPlayers}: RailroadsTableRowProps) => {

    const nameJoined = card.name[mode].split(" ").join(""); // to create a unique id for the radio buttons

    // getting the railroad info from the selected player
    const railroad = selectedPlayer?.railroads.find((r) => r.name === card.name[mode]);
    const isCardChecked = railroad?.owned || false;
    const isMortgageChecked = railroad?.mortgaged || false;

    // Toggles the ownership of the property
    const handleCardCheck = () => {
        if (!selectedPlayer) return;

        const updatedPlayers = players.map((player) => {
            if (player.id !== selectedPlayer.id) return player;

            const railroadsName = card.name[mode];
            const existingRailroad = player.railroads.find((r) => r.name === railroadsName);

            let updatedRailroads;

            if (existingRailroad) {
                // if railroad already exists  then remove it
                updatedRailroads = player.railroads.filter((r) => r.name !== railroadsName);
            } else {
                // if railroad doesn't exist  then add it
                updatedRailroads = [
                    ...player.railroads,
                    {
                        name: railroadsName,
                        owned: true,
                        mortgaged: false,
                        total: card.price,
                    },
                ];
            }

            // Calculate the total value of all railroads owned by the player
            const railroadsTotal = updatedRailroads.reduce((sum, railroads) => sum + railroads.total, 0);
            return {
                ...player,
                railroads: updatedRailroads,
                score: {
                    ...player.score,
                    railroads: railroadsTotal, // Update the player's score with the new total
                    total: railroadsTotal + (player.score.cash || 0) + (player.score.properties || 0) + (player.score.utilities || 0), // Update the total score
                },
            };
        });

        setPlayers(updatedPlayers);    };


    

    // Handles the mortgage check on the railroad
    const handleMortgageCheck = () => {
        if (!selectedPlayer) return;

        const railroadName = card.name[mode]; // Name of the railroad

        const updatedPlayers = players.map((player) => {
            if (player.id !== selectedPlayer.id) return player;

            // Check if the railroad exists in the player's railroads
            const railroadExists = player.railroads.some((railroad) => railroad.name === railroadName);

            const updatedRailroads = railroadExists
                ? player.railroads.map((railroad) =>
                    railroad.name === railroadName
                        ? {
                            ...railroad,
                            mortgaged: !isMortgageChecked, // Toggle the mortgage status
                            total: !isMortgageChecked
                                ? card.price / 2 // Mortgaged value is half the price
                                : card.price  // Standard value with houses
                        }
                        : railroad // Keep other railroads unchanged
                )
                : [
                    ...player.railroads,
                    {
                        name: railroadName,
                        owned: true, // Mark the railroad as owned
                        mortgaged: true, // Set the railroad as mortgaged
                        total: card.price / 2, // Mortgaged value is half the price
                    },
                ];

            // Calculate the total value of all railroads owned by the player
            const railroadsTotal = updatedRailroads.reduce((sum, railroad) => sum + railroad.total, 0);

            return {
                ...player,
                railroads: updatedRailroads,
                score: {
                    ...player.score,
                    railroads: railroadsTotal, // Update the player's score with the new total
                    total: railroadsTotal + (player.score.cash || 0) + (player.score.properties || 0) + (player.score.utilities || 0), // Update the total score
                },
            };
        });

        setPlayers(updatedPlayers); // Update players state with the new railroads
    };

    const totalRow = railroad?.total || 0; // Get the total for the current player and railroad

    const checkboxStyle = "peer-checked:bg-[var(--primary-color)] hover:border-[var(--primary-color)] before:content-[''] peer-checked:before:content-['✓'] w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md text-center  peer-checked:text-white transition-all duration-200 before:text-lg hover:scale-110 hover:border-3"
    


    return (
        <tr>
                   {/* Railroad Name and Price */}
                   <td className={`w-2/10 ${cellStyle} text-left text-xs md:text-lg "bg-gray-500"}`}>
                       <div >{card.name[mode]}</div>                       
                   </td>
                   <td className={`${cellStyle}  w-1/10`}>
                       <div >{card.price}</div>
                   </td>
       
                   {/* Is card purchased */}
                   <td className={`w-1/10 ${cellStyle}`}>
                       <div className="flex justify-center">
                           <input
                               type="checkbox"
                               id={`checkbox1-${nameJoined}`}
                               className="hidden peer"
                               checked={isCardChecked}
                               onChange={handleCardCheck}
                           />
                           <label
                               htmlFor={`checkbox1-${nameJoined}`}
                               className={checkboxStyle}
                           >
                               <span className="hidden peer-checked:inline-block">✓</span>
                           </label>
                       </div>
                   </td>       
                   
       
                   {/* Is card in mortgage */}
                   <td className={`w-1/10  ${cellStyle}`}>
                       <div className="flex justify-center">
                           <input
                               type="checkbox"
                               id={`checkbox3-${nameJoined}`}
                               className="hidden peer"
                               checked={isMortgageChecked}
                               onChange={handleMortgageCheck}
                           />
                           <label
                               htmlFor={`checkbox3-${nameJoined}`}
                               className={checkboxStyle}
                           >
                               <span className="hidden peer-checked:inline-block">✓</span>
                           </label>
                       </div>
                   </td>
       
                   {/* Total */}
                   <td className={`w-1/10 ${cellStyle}`}>
                       <div>
                           <p>{totalRow}</p></div>
                   </td>
               </tr>
    );
}

export default RailroadsTableRow;
