import React from 'react'

const Loading = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-900 text-white">
            <h1 className="text-2xl animate-pulse font-bold">Fetching Weather Details...</h1>
        </div>
    )
}

export default Loading
