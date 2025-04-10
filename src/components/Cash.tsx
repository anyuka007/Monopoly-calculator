const OkButtonStyle= "w-10 border p-2 rounded-lg text-center cursor-pointer transition-all duration-200 bg-yellow-500 text-white shadow-md"

const Cash = () => {
    return (
        <div className='flex justify-start items-center gap-4 w-3/5 mx-auto mt-5'>
        <p>Cash</p>
        <input className="border p-2 rounded-lg" type="number" onChange={(e) => console.log(e.target.value)} />
        <button className={OkButtonStyle}>Ok</button>
      </div>
    );
}

export default Cash;
