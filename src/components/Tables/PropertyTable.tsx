import PropertyTableRow from "./PropertyTableRow";
import { propertyCards } from "../../variables/cardsInfo";
import { useState } from "react";
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


    const handleRowTotalChange = (index: number, total: number) => {
        setRowTotals((prev) => {
            const updatedTotals = [...prev];
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

    return (
        <div>            
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
                    {propertyCards.map((card: PropertyCard, index) => (
                        <PropertyTableRow key={index}
                            mode={mode}
                            card={card}
                            onRowTotalChange={(total: number) => handleRowTotalChange(index, total)} />
                    ))}
                </tbody>
            </table>
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
