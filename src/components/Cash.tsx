import { useEffect, useState } from "react";
import { Player } from "../App";

type CashProps = {
    selectedPlayer: Player | null;
    updateCash: (id: string, cash: number) => void;
}

export const OkButtonStyle = "w-16 border p-2 rounded-lg text-center cursor-pointer transition-all duration-200 bg-yellow-500 text-white shadow-md"

const Cash = ({ selectedPlayer, updateCash }: CashProps) => {
    const [amount, setAmount] = useState<number>(selectedPlayer ? selectedPlayer.score.cash : 0);

    useEffect(() => {
        if (selectedPlayer) {
          setAmount(selectedPlayer.score.cash); 
        } else {
          setAmount(0); 
        }
      }, [selectedPlayer]);
    
    
    const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    }
    const handleOkClick = () => {
        if (selectedPlayer) {
            updateCash(selectedPlayer.id, amount);
        } else {
            alert("No player selected");
        }
    }

return (
    <div className='flex justify-start items-center gap-4 w-3/5 mx-auto mt-7'>
        <p>Cash</p>
        <input className="border p-2 rounded-lg" type="number" 
        onChange={handleCashChange} 
        value={amount === 0 ? "" : amount}/>
        <button className={OkButtonStyle} onClick={handleOkClick}>Ok</button>
    </div>
);
}

export default Cash;
