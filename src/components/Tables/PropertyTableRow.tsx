import { cellStyle } from "./PropertyTable";

type PropertyTableRowProps = {
    name: string;
    color: string;
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

const PropertyTableRow = ({ name, color }: PropertyTableRowProps) => {
    const nameJoined = name.split(" ").join(""); // to create a unique id for the radio buttons


    return (
        <tr>
            <td className={`${cellStyle} text-left ${colors[color] || "bg-gray-500"}`}>
                <div >{name}</div>
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
        id={`checkbox-${nameJoined}`}
        className="hidden peer"
    />
    <label
        htmlFor={`checkbox-${nameJoined}`}
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
        id={`checkbox2-${nameJoined}`}
        className="hidden peer"
    />
    <label
        htmlFor={`checkbox2-${nameJoined}`}
        className="w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md text-center  peer-checked:bg-lime-500 peer-checked:text-white transition-all duration-200
             before:content-[''] peer-checked:before:content-['✓'] before:text-lg"
    >
        <span className="hidden peer-checked:inline-block">✓</span>
    </label>
</div>
            </td>
        </tr>
    );
};

export default PropertyTableRow;