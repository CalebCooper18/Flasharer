

export default function Create() {
  return (
    <div className="h-[800px] pt-10 w-full flex flex-col justify-center items-center text-white xss:h-[750px] xss:pt-20">
        <div className="bg-primary h-full w-5/6 rounded-lg py-4 px-3">
            <form className="w-full flex flex-col items-center gap-1 sm:gap-3">
                <h3 className="underline leading-4 mb-5 text-center">Create a new Deck:</h3>
                <div className="w-full flex gap-2 items-center flex-col sm:flex-row">
                    <label className="min-w-fit">Topic Name:</label>
                    <input type="text" className="input-field" />
                </div>
                <h3 className="underline leading-4 mt-2 text-center">Add Cards:</h3>
                <div className="w-full grid grid-cols-1 gap-y-2 justify-center items-center sm:gap-x-10 sm:gap-y-2 sm:grid-cols-2">
                    <div className="w-full flex flex-col items-center gap-1 sm:gap-0">
                        <label>Front:</label>
                        <input type="text" className="input-field" />
                    </div>
                    <div className="w-full flex flex-col items-center gap-1 sm:gap-0">
                        <label>Back:</label>
                        <input type="text" className="input-field" />
                    </div>
                    <div className="w-full">
                        <button type="button" className="form-card-button-template bg-green-600 hover:bg-green-700 
                        active:bg-green-800 group">
                            <span className="group-active:opacity-0 transition-all duration-200">Add Card</span>
                            <span className="absolute -translate-y-24 left-1/2 -translate-x-1/2 group-active:translate-y-0
                            transition-all duration-200">Card Added</span>
                        </button>
                    </div>
                    <div className="w-full">
                        <button type="button" className="form-card-button-template bg-red-600 hover:bg-red-700
                        active:bg-red-800 group">
                            <span className="group-active:opacity-0 transition-all duration-200">Delete</span>
                            <span className="absolute -translate-y-24 left-1/2 -translate-x-1/2 group-active:translate-y-0
                            transition-all duration-200">Card Deleted</span>
                        </button>
                    </div>
                </div>
                <div className="flex w-full flex-col">
                        <h3>All Cards:</h3>
                        <ul className="bg-white w-full h-32 rounded-md px-2 overflow-y-scroll">
                            <li className="text-black">Hello world</li>
                            <li className="text-black">Hello world</li>
                            <li className="text-black">Hello world</li>
                            <li className="text-black">Hello world</li>
                            <li className="text-black">Hello world</li>
                            <li className="text-black">Hello world</li>
                        </ul>
                    </div>
            </form>
        </div>  
    </div>
  )
}