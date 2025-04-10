import { Pencil, Trash2, X, Check } from "lucide-react";
import { useState } from "react";

const iconStyle = "text-white";
const iconSize = 20;

export type PlayerProps = {
    name: string;
    score: number;
    deleteHandler: () => void;
    editHandler: (newName: string) => void;
    setSelectedPlayer: () => void;
}

const Player = ({ name, score, deleteHandler, editHandler, setSelectedPlayer }: PlayerProps) => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [newName, setNewName] = useState(name);

    const onEdit = () => {
        setIsEditMode(true);
        console.log(`Player ${name} is in edit mode`);     
    }

    const onSave = () => {
        editHandler(newName);
        setIsEditMode(false);
        console.log(`Player ${name} is saved`);
    }

    const onCancel = () => {
        setNewName(name);
        setIsEditMode(false);        
        console.log(`Player ${name} is cancelled`);
    }

    return (
        <div className="player flex flex-col justify-center items-center m-2 rounded-lg w-[300px] md:w-[250px] h-[100px] bg-[#eeeded] shadow-[12px_12px_24px_#777777,-12px_-12px_24px_#ffffff]" >
            <div className="bg-blue-500 h-[50%] w-full flex justify-between items-center p-2 rounded-t-lg">
                {!isEditMode ? (
                    <p className="truncate w-[80%] text-white">{name}</p>
                ) : (
                    <input
                        className="w-[80%] text-white bg-blue-500 border-b border-b-white "
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
            <div className="bg-yellow-500 w-full h-[50%] flex justify-center items-center rounded-b-lg" onDoubleClick={() => setSelectedPlayer()}>
                <p className="text-2xl text-white">{score}</p>
            </div>
        </div>
    );
}

export default Player;
