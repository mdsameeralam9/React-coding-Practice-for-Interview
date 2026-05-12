import React from 'react';
import { ChevronDown } from 'lucide-react';
import FileExplorer from './FileExplorer';

const FileExplorerLayout = () => {
  return (
    <div className='flex w-full h-screen'>
        <div className="left border-r-2 border-red-400 bg-blue-500 py-1 px-3 text-white" style={{width: "40%"}}>
            <h1>Explorer</h1>

            <div className="flex gap-0.5 items-center border-b">
              <ChevronDown /> 
              <span>MyWealth UI</span>
            </div>

            <FileExplorer />
        </div>
         <div className="left bg-white" style={{width: "60%"}}>
            Right
         </div>
    </div>
  )
}

export default FileExplorerLayout