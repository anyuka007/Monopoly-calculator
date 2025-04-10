import { useEffect, useState } from "react";
import { cellStyle, Mode } from "./PropertyTable";

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
    onRowTotalChange: (total: number) => void;
};

const labelStyle =
    "w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md text-center peer-checked:bg-blue-500 peer-checked:text-white";

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

const PropertyTableRow = ({ mode, card, onRowTotalChange }: PropertyTableRowProps) => {
    const [totalRow, setTotalRow] = useState(0);
    const [isCardChecked, setIsCardChecked] = useState(false);
    const [housesChecked, setHousesChecked] = useState(0);
    const [isHotelChecked, setIsHotelChecked] = useState(false);
    const [isMortgageChecked, setIsMortgageChecked] = useState(false);
    

    // Define the type for the mode prop
    
    
    const nameJoined = card.name[mode].split(" ").join(""); // to create a unique id for the radio buttons


    const handleCardCheck = () => {
        const newCardCheckedState = !isCardChecked;
        setIsCardChecked(newCardCheckedState);
        // Wenn die Karte deaktiviert wird, setze alle anderen Werte zurück
        if (!newCardCheckedState) {
            setHousesChecked(0); 
            setIsHotelChecked(false); 
            setIsMortgageChecked(false); 
        }
    };

    const handleHousesCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHousesChecked(Number(e.target.value))
    }

    const handleHotelCheck = () => {
        setIsHotelChecked(!isHotelChecked);
    };

    const handleMortgageCheck = () => {
        setIsMortgageChecked(!isMortgageChecked);
    };

    useEffect(() => {
        let total = 0;
        if (isCardChecked) total += card.price;
        if (housesChecked) total += card.houseCost * housesChecked;
        if (isHotelChecked) total += card.houseCost;
        if (isMortgageChecked) total -= card.price / 2;
        setTotalRow(total);
        onRowTotalChange(total); 
        
      }, [isCardChecked, housesChecked, isHotelChecked, isMortgageChecked, card.price, card.houseCost]);

    return (
        <tr>
            <td className={`${cellStyle} text-left ${colors[card.color] || "bg-gray-500"}`}>
                <div >{card.name[mode]}</div>
            </td>
            <td className={`${cellStyle}`}>
                <div >{card.price}</div>
            </td>
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
        className="w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md text-center  peer-checked:bg-lime-500 peer-checked:text-white transition-all duration-200
             before:content-[''] peer-checked:before:content-['✓'] before:text-lg"
    >
        <span className="hidden peer-checked:inline-block">✓</span>
    </label>
</div>
            </td>
            <td className={cellStyle}>
                <div className="flex gap-2 justify-center items-center">
                    {[ 0, 1, 2, 3, 4,].map((val) => (
                        <div key={val} className="relative">
                            <input
                                type="radio"
                                id={`houses${val}-${nameJoined}`}
                                name={`houses-${nameJoined}`}
                                value={val}
                                className="hidden peer"
                                defaultChecked={val === 0}
                                checked={housesChecked === val}
                                onChange={handleHousesCheck}
                                disabled={!isCardChecked}
                            />
                            <label
                                htmlFor={`houses${val}-${nameJoined}`}
                                className={labelStyle}
                            >
                                {/* {val === 0 ? "-" : val} */}
                                {val}
                            </label>
                        </div>
                    ))}
                </div>
            </td>
            <td className={cellStyle}>
            <div className="flex justify-center">
    <input
        type="checkbox"
        id={`checkbox2-${nameJoined}`}
        className="hidden peer"
        checked={isHotelChecked}
        onChange={handleHotelCheck}
        disabled={!isCardChecked || housesChecked < 4} 
    />
    <label
        htmlFor={`checkbox2-${nameJoined}`}
        className="w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md text-center peer-checked:bg-green-500 peer-checked:text-white transition-all duration-200
             before:content-[''] peer-checked:before:content-['✓'] before:text-lg"
    >
    </label>
</div>

            </td>
            <td className={cellStyle}>
            <div className="flex justify-center">
    <input
        type="checkbox"
        id={`checkbox3-${nameJoined}`}
        className="hidden peer"
        checked={isMortgageChecked}
        onChange={handleMortgageCheck}
        disabled={!isCardChecked}
    />
    <label
        htmlFor={`checkbox3-${nameJoined}`}
        className="w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md text-center  peer-checked:bg-lime-500 peer-checked:text-white transition-all duration-200
             before:content-[''] peer-checked:before:content-['✓'] before:text-lg"
    >
        <span className="hidden peer-checked:inline-block">✓</span>
    </label>
</div>
            </td>
            <td >
                <div >
                    <p>{totalRow}</p></div>
            </td>
        </tr>
    );
};

export default PropertyTableRow;