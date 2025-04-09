type PropertyTableRowProps = {
    name: string;
};

const labelStyle =
    "w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md text-center peer-checked:bg-blue-500 peer-checked:text-white";

const PropertyTableRow = ({ name }: PropertyTableRowProps) => {
    const nameJoined = name.split(" ").join(""); // to create a unique id for the radio buttons

    return (
        <tr>
            <td>
                <div>{name}</div>
            </td>
            <td>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 0,].map((val) => (
                        <div key={val} className="relative">
                            <input
                                type="radio"
                                id={`houses${val}-${nameJoined}`}
                                name={`houses-${nameJoined}`}
                                value={val}
                                className="hidden peer"
                            />
                            <label
                                htmlFor={`houses${val}-${nameJoined}`}
                                className={labelStyle}
                            >
                                {val}
                            </label>
                        </div>
                    ))}
                </div>
            </td>
            <td>
            <div className="flex justify-center">
    <input
        type="checkbox"
        id={`checkbox-${nameJoined}`}
        className="hidden peer"
    />
    <label
        htmlFor={`checkbox-${nameJoined}`}
        className="w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md text-center bg-gray-200 peer-checked:bg-green-500 peer-checked:text-white transition-all duration-200"
    >
        ✓
    </label>
</div>

            </td>
            <td>
                <div>no</div>
            </td>
        </tr>
    );
};

export default PropertyTableRow;