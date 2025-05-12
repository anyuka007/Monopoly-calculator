import { cellStyle, Mode } from "./PropertyTable";
import { Player, PlayersState } from "../../App";

type PropertyTableRowProps = {
    mode: Mode;
    card: {
        name: { classic: string; wunderland: string };
        color: string;
        price: number;
        rent: number[];
        houseCost: number;
        mortgageValue: number;
    };
    selectedPlayer: Player | null;
    players: PlayersState;
    setPlayers: (players: PlayersState) => void;
};

const colors: { [key: string]: string } = {
    brown: "bg-[#A13C33]",
    sky: "bg-[#C3CED8]",
    pink: "bg-[#E51D72]",
    orange: "bg-[#FF8111]",
    red: "bg-[#ED0030]",
    yellow: "bg-[#F5C700]",
    green: "bg-[#00744A]",
    indigo: "bg-[#17589D]",

};

const PropertyTableRow = ({ mode, card, selectedPlayer, players, setPlayers }: PropertyTableRowProps) => {

    const nameJoined = card.name[mode].split(" ").join(""); // to create a unique id for the radio buttons

    // getting the property info from the selected player
    const property = selectedPlayer?.properties.find((p) => p.name === card.name[mode]);
    const isCardChecked = property?.owned || false;
    const numberOfHouses = property?.houses || 0;
    const isHotelChecked = property?.hotel || false;
    const isMortgageChecked = property?.mortgaged || false;

    // Toggles the ownership of the property
    const handleCardCheck = () => {
        if (!selectedPlayer) return;

        const updatedPlayers = players.map((player) => {
            if (player.id !== selectedPlayer.id) return player;

            const propertyName = card.name[mode];
            const existingProperty = player.properties.find((p) => p.name === propertyName);

            let updatedProperties;

            if (existingProperty) {
                // if property already exists  then remove it
                updatedProperties = player.properties.filter((p) => p.name !== propertyName);
            } else {
                // if property doesn't exist  then add it
                updatedProperties = [
                    ...player.properties,
                    {
                        name: propertyName,
                        owned: true,
                        houses: 0,
                        hotel: false,
                        mortgaged: false,
                        total: card.price,
                    },
                ];
            }

            // Calculate the total value of all properties owned by the player
            const propertiesTotal = updatedProperties.reduce((sum, property) => sum + property.total, 0);
            return {
                ...player,
                properties: updatedProperties,
                score: {
                    ...player.score,
                    properties: propertiesTotal, // Update the player's score with the new total
                    total: propertiesTotal + (player.score.cash || 0) + (player.score.railroads || 0) + (player.score.utilities || 0), // Update the total score
                },
            };
        });

        setPlayers(updatedPlayers);
    };


    // Handles the number of houses on the property
    const handleHousesCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedPlayer) return;

        const newHousesChecked = Number(e.target.value); // Get the selected number of houses
        const propertyName = card.name[mode]; // Get the property name based on the current mode

        const updatedPlayers = players.map((player) => {
            if (player.id !== selectedPlayer.id) return player;

            // Check if the property exists in the player's properties
            const propertyExists = player.properties.some((property) => property.name === propertyName);

            const updatedProperties = propertyExists
                ? player.properties.map((property) =>
                    property.name === propertyName
                        ? {
                            ...property,
                            owned: true,
                            houses: newHousesChecked,
                            hotel: newHousesChecked === 4, // If 4 houses, mark as hotel
                            mortgaged: false, // Ensure the property is not mortgaged
                            total: card.price + card.houseCost * newHousesChecked, // Calculate total
                        }
                        : property // Keep other properties unchanged
                )
                : [
                    ...player.properties,
                    {
                        name: propertyName,
                        owned: true,
                        houses: newHousesChecked,
                        hotel: newHousesChecked === 4,
                        mortgaged: false,
                        total: card.price + card.houseCost * newHousesChecked,
                    },
                ];

            // Calculate the total value of all properties owned by the player
            const propertiesTotal = updatedProperties.reduce((sum, property) => sum + property.total, 0);

            return {
                ...player,
                properties: updatedProperties,
                score: {
                    ...player.score,
                    properties: propertiesTotal, // Update the player's score with the new total
                    total: propertiesTotal + (player.score.cash || 0) + (player.score.railroads || 0) + (player.score.utilities || 0), // Update the total score
                },
            };
        });

        setPlayers(updatedPlayers); // Update the players state
    };

    // Handles the hotel purchase on the property
    const handleHotelCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedPlayer) return;

        const isChecked = e.target.checked; // Whether the hotel is being added or removed
        const propertyName = card.name[mode]; // Get the property name based on the current mode

        const updatedPlayers = players.map((player) => {
            if (player.id !== selectedPlayer.id) return player;

            // Check if the property exists in the player's properties
            const propertyExists = player.properties.some((property) => property.name === propertyName);

            const updatedProperties = propertyExists
                ? player.properties.map((property) =>
                    property.name === propertyName
                        ? {
                            ...property,
                            owned: true,
                            hotel: isChecked,
                            houses: isChecked ? 4 : 0, // Hotel means 4 houses
                            mortgaged: false, // Ensure the property is not mortgaged
                            total: isChecked
                                ? card.price + card.houseCost * 5 // Hotel adds 5x house cost
                                : card.price, // Base price if no hotel
                        }
                        : property // Keep other properties unchanged
                )
                : [
                    ...player.properties,
                    {
                        name: propertyName,
                        owned: true,
                        hotel: isChecked,
                        houses: isChecked ? 4 : 0,
                        mortgaged: false,
                        total: isChecked
                            ? card.price + card.houseCost * 5 // Hotel adds 5x house cost
                            : card.price, // Base price if no hotel
                    },
                ];

            // Calculate the total value of all properties owned by the player
            const propertiesTotal = updatedProperties.reduce((sum, property) => sum + property.total, 0);

            return {
                ...player,
                properties: updatedProperties,
                score: {
                    ...player.score,
                    properties: propertiesTotal, // Update the player's score with the new total
                    total: propertiesTotal + (player.score.cash || 0) + (player.score.railroads || 0) + (player.score.utilities || 0), // Update the total score
                },
            };
        });

        setPlayers(updatedPlayers); // Update the players state
    };

    // Handles the mortgage check on the property
    const handleMortgageCheck = () => {
        if (!selectedPlayer) return;

        const propertyName = card.name[mode]; // Name of the property

        const updatedPlayers = players.map((player) => {
            if (player.id !== selectedPlayer.id) return player;

            // Check if the property exists in the player's properties
            const propertyExists = player.properties.some((property) => property.name === propertyName);

            const updatedProperties = propertyExists
                ? player.properties.map((property) =>
                    property.name === propertyName
                        ? {
                            ...property,
                            mortgaged: !isMortgageChecked, // Toggle the mortgage status
                            houses: 0, // Houses must be sold before mortgaging
                            hotel: false, // Hotels must be sold before mortgaging
                            total: !isMortgageChecked
                                ? card.price / 2 // Mortgaged value is half the price
                                : card.price + card.houseCost * numberOfHouses, // Standard value with houses
                        }
                        : property // Keep other properties unchanged
                )
                : [
                    ...player.properties,
                    {
                        name: propertyName,
                        owned: true, // Mark the property as owned
                        mortgaged: true, // Set the property as mortgaged
                        houses: 0, // No houses when mortgaged
                        hotel: false, // No hotel when mortgaged
                        total: card.price / 2, // Mortgaged value is half the price
                    },
                ];

            // Calculate the total value of all properties owned by the player
            const propertiesTotal = updatedProperties.reduce((sum, property) => sum + property.total, 0);

            return {
                ...player,
                properties: updatedProperties,
                score: {
                    ...player.score,
                    properties: propertiesTotal, // Update the player's score with the new total
                    total: propertiesTotal + (player.score.cash || 0) + (player.score.railroads || 0) + (player.score.utilities || 0), // Update the total score
                },
            };
        });

        setPlayers(updatedPlayers); // Update players state with the new properties
    };

    const totalRow = property?.total || 0; // Get the total for the current player and property

    const checkboxStyle = (color: string) => {
        const colorClasses: { [key: string]: string } = {
            green: "peer-checked:bg-green-500 hover:border-green-500 before:content-[''] peer-checked:before:content-['✓']",
            lime: "peer-checked:bg-lime-500 hover:border-lime-500 before:content-[''] peer-checked:before:content-['✓']",
            blue: "peer-checked:bg-blue-500 hover:border-blue-500",
        };
        return `w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md text-center  peer-checked:text-white transition-all duration-200
        before:text-lg 
        hover:scale-110 ${colorClasses[color] || ""} hover:border-3`
    }

    return (
        <tr>
            {/* Property Name and Price */}
            <td className={`${cellStyle} text-left ${colors[card.color] || "bg-gray-500"}`}>
                <div >{card.name[mode]}</div>
            </td>
            <td className={`${cellStyle}`}>
                <div >{card.price}</div>
            </td>
            <td className={`${cellStyle}`}>
                <div >{card.houseCost}</div>
            </td>

            {/* Is card purchased */}
            <td className={cellStyle}>
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
                        className={checkboxStyle("lime")}
                    >
                        <span className="hidden peer-checked:inline-block">✓</span>
                    </label>
                </div>
            </td>

            {/* Number of houses */}
            <td className={cellStyle}>
                <div className="flex gap-2 justify-center items-center">
                    {[0, 1, 2, 3, 4,].map((val) => (
                        <div key={val} className="relative">
                            <input
                                type="radio"
                                id={`houses${val}-${nameJoined}`}
                                name={`houses-${nameJoined}`}
                                value={val}
                                className="hidden peer"
                                checked={numberOfHouses === val}
                                onChange={handleHousesCheck}
                            />
                            <label
                                htmlFor={`houses${val}-${nameJoined}`}
                                className={checkboxStyle("blue")}
                            >
                                {/* {val === 0 ? "-" : val} */}
                                {val}
                            </label>
                        </div>
                    ))}
                </div>
            </td>

            {/* Is hotel purchased */}
            <td className={cellStyle}>
                <div className="flex justify-center">
                    <input
                        type="checkbox"
                        id={`checkbox2-${nameJoined}`}
                        className="hidden peer"
                        checked={isHotelChecked}
                        onChange={handleHotelCheck}
                    />
                    <label
                        htmlFor={`checkbox2-${nameJoined}`}
                        className={checkboxStyle("green")}
                    >
                    </label>
                </div>

            </td>

            {/* Is card in mortgage */}
            <td className={cellStyle}>
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
                        className={checkboxStyle("lime")}
                    >
                        <span className="hidden peer-checked:inline-block">✓</span>
                    </label>
                </div>
            </td>

            {/* Total */}
            <td className={cellStyle}>
                <div>
                    <p>{totalRow}</p></div>
            </td>
        </tr>
    );
};

export default PropertyTableRow;