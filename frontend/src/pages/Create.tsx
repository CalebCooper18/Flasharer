

export default function Create() {
  return (
    <div className="h-[600px] w-full pt-20 flex flex-col justify-center items-center xss:h-[750px] text-white">
        <div className="bg-primary h-full w-5/6 rounded-lg py-4 px-3">
            <form className="w-full flex flex-col items-center gap-2 xss:gap-6">
                <h3 className="underline leading-4 mb-5 text-center">Create a new Deck:</h3>
                <div className="w-full flex gap-2 items-center flex-col xss:flex-row">
                    <label className="min-w-fit">Topic Name:</label>
                    <input type="text" className="input-field" />
                </div>
                <h3 className="underline leading-4 mb-5 text-center">Add Cards:</h3>
                <div className="w-full grid grid-cols-1 gap-3 justify-center items-center xss:gap-x-10 xss:gap-y-3 xss:grid-cols-2">
                    <div className="w-full flex flex-col items-center gap-1 xss:gap-0">
                        <label>Front:</label>
                        <input type="text" className="input-field" />
                    </div>
                    <div className="w-full flex flex-col items-center gap-1 xss:gap-0">
                        <label>Back:</label>
                        <input type="text" className="input-field" />
                    </div>
                    <div className="w-full">
                        <button type="button" className="form-card-button-template bg-green-600 hover:bg-green-700 
                        active:bg-green-800 group">
                            <span className="group-active:opacity-0 transition-all duration-200">Add Card</span>
                            <span className="absolute -translate-y-10 left-1/2 -translate-x-1/2 group-active:translate-y-0
                            transition-all duration-200">Card Added</span>
                        </button>
                    </div>
                    <div className="w-full">
                        <button type="button" className="form-card-button-template bg-red-600 hover:bg-red-700
                        active:bg-red-800 group">
                            <span className="group-active:opacity-0 transition-all duration-200">Delete</span>
                            <span className="absolute -translate-y-10 left-1/2 -translate-x-1/2 group-active:translate-y-0
                            transition-all duration-200">
                                Card Deleted
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </div>  
    </div>
  )
}
