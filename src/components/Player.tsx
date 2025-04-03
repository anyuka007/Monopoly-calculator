import { Pencil, X } from "lucide-react";

export type PlayerProps = {
    name: string;
    score: number;
    deleteHandler: () => void;
    editHandler: () => void;
}

const Player = ({name, score, deleteHandler, editHandler}: PlayerProps) => {
    
    return (
        <div  className="player flex flex-col justify-center items-center mr-4" >
            <div className="bg-blue-500 w-full flex justify-between items-center">
                <p>{name}</p>
                <div>
                    <button><Pencil onClick={editHandler} /></button>
                    <button onClick={deleteHandler}><X/></button>
                </div>
                
            </div>
            <div  className="bg-yellow-500 w-full flex justify-center items-center">
                <p className="text-2xl">{score}</p>
            </div>
        </div>
    );
}

export default Player;
