import PropertyTableRow from "./PropertyTableRow";
import { propertyCards } from "../../variables/cardsInfo";

const PropertyTable = () => {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Houses</th>
                    <th>Hotels</th>
                    <th>Mortgage</th>
                </tr>
                </thead>
                <tbody>
                {propertyCards.map((card, index) => (
                        <PropertyTableRow key={index} name={card.name}  />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PropertyTable;
