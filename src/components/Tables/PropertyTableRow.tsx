import { useEffect, useState } from "react";
import { cellStyle, Mode } from "./PropertyTable";
import { Player, PlayersState, /* PropertyState */ } from "../../App";

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
    // Function to handle the total change for this row
    onRowTotalChange: (total: number) => void;
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

const PropertyTableRow = ({ mode, card, onRowTotalChange,  selectedPlayer,  players, setPlayers }: PropertyTableRowProps) => {
    const [totalRow, setTotalRow] = useState(0);
   
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
              },
            ];
          }
      
          return {
            ...player,
            properties: updatedProperties,
          };
        });
      
        setPlayers(updatedPlayers);
      };
      
      
       
      const handleHousesCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedPlayer) return;
    
        const newHousesChecked = Number(e.target.value);
        const propertyName = card.name[mode];
    
        const updatedPlayers = players.map((player) => {
            if (player.id !== selectedPlayer.id) return player;
    
            const propertyIndex = player.properties.findIndex(p => p.name === propertyName);
            const updatedProperties = [...player.properties];
    
            const updatedProperty = {
                name: propertyName,
                owned: true,
                houses: newHousesChecked,
                hotel: newHousesChecked === 4,
                mortgaged: false,
            };
    
            if (propertyIndex >= 0) {
                updatedProperties[propertyIndex] = {
                    ...updatedProperties[propertyIndex],
                    ...updatedProperty,
                };
            } else {
                updatedProperties.push(updatedProperty);
            }
    
            return {
                ...player,
                properties: updatedProperties,
            };
        });
    
        setPlayers(updatedPlayers);
    };
    
        
        const handleHotelCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!selectedPlayer) return;
          
            const isChecked = e.target.checked;
            const propertyName = card.name[mode];
          
            const updatedPlayers = players.map((player) => {
              if (player.id !== selectedPlayer.id) return player;
          
              const existingProperty = player.properties.find((p) => p.name === propertyName);
          
              // When Property already exists => update it
              if (existingProperty) {
                return {
                  ...player,
                  properties: player.properties.map((p) =>
                    p.name === propertyName
                      ? {
                          ...p,
                          owned: true,
                          hotel: isChecked,
                          houses: isChecked ? 4 : 0, // Hotel means 4 houses
                        }
                      : p
                  ),
                };
              }
          
              // If Property doesn't exist → add it
              return {
                ...player,
                properties: [
                  ...player.properties,
                  {
                    name: propertyName,
                    owned: true,
                    houses: isChecked ? 4 : 0,
                    hotel: isChecked,
                    mortgaged: false,
                  },
                ],
              };
            });
          
            setPlayers(updatedPlayers);
          };
          

          const handleMortgageCheck = () => {
            if (!selectedPlayer) return;
        
            const propertyName = card.name[mode];
        
            const updatedPlayers = players.map((player) => {
                if (player.id !== selectedPlayer.id) return player;
        
                const propertyIndex = player.properties.findIndex(p => p.name === propertyName);
                const updatedProperties = [...player.properties];
        
                const updatedProperty = {
                    name: propertyName,
                    owned: true,
                    houses: numberOfHouses,
                    hotel: isHotelChecked,
                    mortgaged: !isMortgageChecked,
                };
        
                if (propertyIndex >= 0) {
                    updatedProperties[propertyIndex] = {
                        ...updatedProperties[propertyIndex],
                        ...updatedProperty,
                    };
                } else {
                    updatedProperties.push(updatedProperty);
                }
        
                return {
                    ...player,
                    properties: updatedProperties,
                };
            });
        
            setPlayers(updatedPlayers);
        };
        
        

        useEffect(() => {
            if (!selectedPlayer) {
                setTotalRow(0);
                onRowTotalChange(0);
                return;
            }
            let total = 0;
            if (isCardChecked) total += card.price;
            if (numberOfHouses) total += card.houseCost * numberOfHouses;
            if (isHotelChecked) total += card.houseCost;
            if (isMortgageChecked) total -= card.price / 2;
            setTotalRow(total);
            onRowTotalChange(total);

        }, [isCardChecked, numberOfHouses, isHotelChecked, isMortgageChecked, card.price, card.houseCost]);


        

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