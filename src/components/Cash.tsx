import { useEffect, useState } from "react";
import { Player, PlayersState } from "../App";

type CashProps = {
    selectedPlayer: Player | null;
    players: PlayersState;
    setPlayers: (players: PlayersState) => void;
}

const Cash = ({ selectedPlayer, players, setPlayers, }: CashProps) => {
    const [amount, setAmount] = useState<number>(0);

    // Find the current player based on the selectedPlayer prop
    const currentPlayer = players.find((player) => player.id === selectedPlayer?.id);

    // Update the amount state when selectedPlayer changes
    useEffect(() => {
        if (selectedPlayer) {
            setAmount(currentPlayer?.score.cash || 0);
        } else {
            setAmount(0);
        }
    }, [selectedPlayer, players]);


    // Handle changes to the cash input field
    const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, Number(e.target.value)); // Ensure value is non-negative
        setAmount(value);
    }

    // Save the updated cash amount when the input field loses focus 
    const handleSave = () => {
        if (selectedPlayer) {
            const updatedPlayers: PlayersState = players.map((player) => {
                if (player.id === selectedPlayer.id) {
                    const updatedScore = {
                        ...player.score,
                        cash: amount,
                        total: amount + player.score.properties + player.score.railroads + player.score.utilities, // Calculate total again
                    };
                    return { ...player, score: updatedScore };
                }
                return player;
            });
            setPlayers(updatedPlayers);
        }

    }

    // Handle the Enter key to save the cash amount
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && selectedPlayer) {
            handleSave();
        }
    };

    return (
        <div>
            <div className='flex justify-start items-center gap-4 w-3/5 mx-auto mt-7'>
                <p>Cash</p>
                <input className="border p-2 rounded-lg" type="number"
                    onChange={handleCashChange} // Update amount on change
                    value={amount === 0 ? "" : amount} // Display empty string if amount is 0
                    onBlur={handleSave} // Save on blur (when the input loses focus)
                    onKeyDown={handleKeyDown}  // Save the cash amount when Enter is pressed
                    />
            </div>
        </div>
    );
}

export default Cash;
