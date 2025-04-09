import PropertyTableRow from "./PropertyTableRow";
import { propertyCards } from "../../variables/cardsInfo";

export const cellStyle = "border border-gray-400 p-2 text-center";

type PropertyCard = {
    name: {
        classic: string;
        wunderland: string;
    };
    color: string;
};

// Define the type for the mode prop
type Mode = "classic" | "wunderland";

// Define the type for the PropertyTable props
interface PropertyTableProps {
    mode: Mode;
}

const PropertyTable = ({mode}: PropertyTableProps) => {
    return (
        <div>
            <table className="border border-gray-400 border-collapse text-center mt-3 mx-auto w-3/5">
                <thead>
                <tr className="bg-gray-100">
                    <th className={cellStyle}>Name</th>
                    <th className={cellStyle}>Houses</th>
                    <th className={cellStyle}>Hotel</th>
                    <th className={cellStyle}>Mortgage</th>
                </tr>
                </thead>
                <tbody>
                {propertyCards.map((card: PropertyCard, index) => (
                        <PropertyTableRow key={index} name={card.name[mode]} color={card.color}  />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PropertyTable;
