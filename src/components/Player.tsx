import { Pencil, Trash2, X, Check } from "lucide-react";
import { /* useEffect, */ useRef, useState } from "react";

const iconStyle = "text-white";
const iconSize = 20;

export type PlayerProps = {
    name: string;
    score: {cash: number, properties: number, railroads: number, utilities: number, total: number};
    deleteHandler: () => void;
    editHandler: (newName: string) => void;
    setSelectedPlayer: () => void;
    isSelected: boolean;
}

const Player = ({ name, score, deleteHandler, editHandler, setSelectedPlayer, isSelected }: PlayerProps) => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [newName, setNewName] = useState(name);
    // Ref for the Player container
    const playerRef = useRef<HTMLDivElement>(null);

    // Handle clicks outside the Player component
    /* useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
                //setIsSelected(false); // Deselect the player
                setIsEditMode(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); */


    const onEdit = () => {
        setIsEditMode(true);
        setSelectedPlayer();;     
    }

    const onSave = () => {
        editHandler(newName);
        setIsEditMode(false);
    }

    const onCancel = () => {
        setNewName(name);
        setIsEditMode(false);
    }

    return (
        <div 
        ref={playerRef} // Attach the ref to the Player container
        className={`player flex flex-col justify-center items-center m-2 rounded-lg w-[300px] md:w-[250px] h-[100px] bg-[#eeeded] ${isSelected 
        ? "shadow-[inset 12px_12px_24px_#777777,inset -12px_-12px_24px_#ffffff] scale-115 border-4 border-blue-500" : "shadow-[12px_12px_24px_#777777,-12px_-12px_24px_#ffffff] "}`} 
        onClick={() => {setSelectedPlayer()}}>
            <div onDoubleClick={onEdit} className="bg-blue-500 h-[50%] w-full flex justify-between items-center p-2 rounded-t-lg">
                {!isEditMode ? (
                    <p className="truncate w-[80%] text-white">{name}</p>
                ) : (
                    <input
                        className="w-[80%] text-white bg-blue-500 border-b border-b-white focus:outline-none"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                )}
                {!isEditMode ? (
                    <div className="w-[18%] md:w-[20%] flex justify-between items-center">
                        <button onClick={onEdit}>
                            <Pencil size={iconSize} className={iconStyle}/>
                        </button>
                        <button onClick={deleteHandler}>
                            <Trash2 size={iconSize} className={iconStyle}/>
                        </button>
                    </div>
                ) : (
                    <div className="w-[18%] md:w-[20%] flex justify-between items-center">
                        <button onClick={onSave}>
                            <Check size={iconSize} className={iconStyle}/>
                        </button>
                        <button onClick={onCancel}>
                            <X size={iconSize} className={iconStyle}/>
                        </button>
                    </div>
                )}
            </div>
            <div className="bg-yellow-500 w-full h-[50%] flex justify-center items-center rounded-b-lg">
                <p className="text-2xl text-white">{score.total}</p>
            </div>
        </div>
    );
}

export default Player;
