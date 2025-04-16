import PropertyTableRow from "./PropertyTableRow";
import { propertyCards } from "../../variables/cardsInfo";
import { useEffect, useRef, useState } from "react";
import { Player } from "../../App";
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
    updateProperties: (playerId: string, properties: number) => void;
}

const PropertyTable = ({ mode, selectedPlayer, updateProperties }: PropertyTableProps) => {
    const [rowTotals, setRowTotals] = useState<number[]>([]);
    const [clearFlag, setClearFlag] = useState(false); // to trigger a reset of all rows in the table

    // Ref to track the previously selected player
    const previousPlayerRef = useRef<Player | null>(null);

    // Resets the table when the selected player changes
    useEffect(() => {
        if (
            selectedPlayer &&
            selectedPlayer.id !== previousPlayerRef.current?.id
        ) {
            setClearFlag(prev => !prev); // Toggle the clear signal
            setRowTotals([]);              
        }
        previousPlayerRef.current = selectedPlayer;
    }, [selectedPlayer]);


    // Handler to update the total for a specific row
    const handleRowTotalChange = (index: number, total: number) => {
        setRowTotals((prev) => {
            const updatedTotals = [...prev]; // Create a copy of the previous totals
            updatedTotals[index] = total;
            return updatedTotals;
        });
    };

    const propertyTotal = rowTotals.reduce((sum, rowTotal) => sum + rowTotal, 0);

    const onSaveHandler = () => {
        if (selectedPlayer) {
            updateProperties(selectedPlayer.id, propertyTotal); 
        } else {
            alert("No player selected!");
        }
    }

    // Clears the table
    const onClearHandler = () => {
        setClearFlag(prev => !prev); 
        setRowTotals([]);
    };

    return (
        <div>
            {/* Clear button */}   
            <div className="w-3/5 mx-auto flex gap-2 justify-end items-center mt-3">
                <button onClick={onClearHandler} className={OkButtonStyle}>Clear</button>
            </div>  
            {/* Table displaying property data */}       
            <table className="border border-gray-400 border-collapse text-center mt-3 mx-auto w-3/5">
                <thead>
                    <tr className="bg-gray-100">
                        <th className={cellStyle}>Name</th>
                        <th className={cellStyle}>Price</th>
                        <th className={cellStyle}>Got</th>
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
                            onRowTotalChange={(total: number) => handleRowTotalChange(index, total)}
                            clearFlag={clearFlag} // Signal to clear the row
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
                <button onClick={onSaveHandler} className={OkButtonStyle}>Save</button>            
                </div>
            
        </div>
    );
}

export default PropertyTable;
