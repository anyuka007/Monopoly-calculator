export type PlayerProps = {
    name: string;
    score: number;
}

const Player = ({name, score}: PlayerProps) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center" >
                <p className="bg-blue-500">{name}</p>
            </div>
            <div>
                <p className="bg-yellow-500">{score}</p>
            </div>
        </div>
    );
}

export default Player;
