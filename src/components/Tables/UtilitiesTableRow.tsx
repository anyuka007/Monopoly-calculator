import { Mode } from "./PropertyTable";
import { Player, PlayersState } from "../../App";
//import { railroadCards } from "../../variables/cardsInfo";
import { cellStyle } from "./PropertyTable";

type UtilitiesTableRowProps = {
    mode: Mode;
    card: {
        name: { classic: string; wunderland: string };
        price: number;
        mortgageValue: number;
    };
    selectedPlayer: Player | null;
    players: PlayersState;
    setPlayers: (players: PlayersState) => void;
};


const UtilitiesTableRow = ({mode, card, selectedPlayer, players, setPlayers}: UtilitiesTableRowProps) => {

    const nameJoined = card.name[mode].split(" ").join(""); // to create a unique id for the radio buttons

    // getting the utility info from the selected player
    const utility = selectedPlayer?.utilities.find((r) => r.name === card.name[mode]);
    const isCardChecked = utility?.owned || false;
    const isMortgageChecked = utility?.mortgaged || false;

    // Toggles the ownership of the utility
    const handleCardCheck = () => {
        if (!selectedPlayer) return;

        const updatedPlayers = players.map((player) => {
            if (player.id !== selectedPlayer.id) return player;

            const utilityName = card.name[mode];
            const existingUtility = player.utilities.find((r) => r.name === utilityName);

            let updatedUtilities;

            if (existingUtility) {
                // if utility already exists  then remove it
                updatedUtilities = player.utilities.filter((r) => r.name !== utilityName);
            } else {
                // if utility doesn't exist  then add it
                updatedUtilities = [
                    ...player.utilities,
                    {
                        name: utilityName,
                        owned: true,
                        mortgaged: false,
                        total: card.price,
                    },
                ];
            }

            // Calculate the total value of all utilities owned by the player
            const utilitiesTotal = updatedUtilities.reduce((sum, utilities) => sum + utilities.total, 0);
            return {
                ...player,
                utilities: updatedUtilities,
                score: {
                    ...player.score,
                    utilities: utilitiesTotal, // Update the player's score with the new total
                    total: utilitiesTotal + (player.score.cash || 0) + (player.score.properties || 0) + (player.score.railroads || 0), // Update the total score
                },
            };
        });

        setPlayers(updatedPlayers);    };


    

    // Handles the mortgage check on the utilities
    const handleMortgageCheck = () => {
        if (!selectedPlayer) return;

        const utilityName = card.name[mode]; // Name of the utility

        const updatedPlayers = players.map((player) => {
            if (player.id !== selectedPlayer.id) return player;

            // Check if the railroad exists in the player's railroads
            const utilityExists = player.utilities.some((utility) => utility.name === utilityName);

            const updatedUtilities = utilityExists
                ? player.utilities.map((utility) =>
                    utility.name === utilityName
                        ? {
                            ...utility,
                            mortgaged: !isMortgageChecked, // Toggle the mortgage status
                            total: !isMortgageChecked
                                ? card.price / 2 // Mortgaged value is half the price
                                : card.price  // Standard value with houses
                        }
                        : utility // Keep other utilities unchanged
                )
                : [
                    ...player.utilities,
                    {
                        name: utilityName,
                        owned: true, // Mark the utility as owned
                        mortgaged: true, // Set the utility as mortgaged
                        total: card.price / 2, // Mortgaged value is half the price
                    },
                ];

            // Calculate the total value of all utilities owned by the player
            const utilitiesTotal = updatedUtilities.reduce((sum, utility) => sum + utility.total, 0);

            return {
                ...player,
                utilities: updatedUtilities,
                score: {
                    ...player.score,
                    utilities: utilitiesTotal, // Update the player's score with the new total
                    total: utilitiesTotal + (player.score.cash || 0) + (player.score.properties || 0) + (player.score.railroads || 0), // Update the total score
                },
            };
        });

        setPlayers(updatedPlayers); // Update players state with the new utilities
    };

    const totalRow = utility?.total || 0; // Get the total for the current player and railroad

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

export default UtilitiesTableRow;
