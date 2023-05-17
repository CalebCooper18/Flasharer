

export default function LoadingDots() {
  return (
    <div className="flex flex-col gap-2 w-full h-3/4 justify-center items-center">
        <h2 className="text-white text-2xl">Loading 
        <span className="animate-pulse">.</span>
        <span className="animate-pulse">.</span>
        <span className="animate-pulse">.</span>
        </h2>
        <div className="bg-semiLightPurple rounded-3xl flex justify-center items-end px-2 pb-1 pt-3 gap-3">
            <div className="rounded-full h-8 w-8 bg-white animate-alt-bounce xss:h-10 xss:w-10" style={{animationDelay: '0.1s'}}></div>
            <div className="rounded-full h-8 w-8 bg-white animate-alt-bounce xss:h-10 xss:w-10" style={{animationDelay: '0.2s'}}></div>
            <div className="rounded-full h-8 w-8 bg-white animate-alt-bounce xss:h-10 xss:w-10" style={{animationDelay: '0.3s'}}></div>       
        </div>
    </div>
  )
}
