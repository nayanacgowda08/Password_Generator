import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
 const [length,setLength] = useState(8);
 const[numAllowed, setNumAllowed] = useState(false);
 const [charAllowed, setCharAllowed] = useState(false);
 const [password,setPassword]= useState("");

const usePassRef = useRef(null)

const passGenerator = useCallback(()=>{
  let pass = "";
  let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if(numAllowed) str += "0123456789";
  if(charAllowed) str += "!@#$%^&*()_+-=+$,{}/";
  for(let i =1;i<=length;i++){
    let char = Math.floor(Math.random()*str.length + 1)
    pass += str.charAt(char)
  }

  setPassword(pass)

},
  
  [length,numAllowed,charAllowed,setPassword])


const copyPassToClipboard = useCallback(()=>{
  usePassRef.current?.select();
  usePassRef.current?.setSelectionRange(0,40);
  window.navigator.clipboard.writeText(password)
},[password])



useEffect(()=>{
  passGenerator();
},[length,numAllowed,charAllowed,passGenerator])




  return (
    <>
     <div className=' bg-gray-700 w-full max-w-md shadow-md px-4 py-3 my-8 mx-auto rounded-lg '>
       <h1 className='text-white text-center my-3 font-bold'>Password Generator</h1>
     
     <div className='flex shadow rounded-xl overflow-hidden mb-4 text-blue-700'>
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3 '
      placeholder='password'
      readOnly
      ref={usePassRef}
      />
      <button 
      onClick={copyPassToClipboard}
      className='bg-blue-800 text-white px-3 '>copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{
          setLength(e.target.value)
        }}
        />
        <label className='text-orange-500' >Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {numAllowed}
        id='numberInput'
        onChange={()=>{
          setNumAllowed((prev)=>!prev)
        }}
        />
        <label className='text-orange-500'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {charAllowed}
        id='charInput'
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}
        />
        <label className='text-orange-500'>Characters</label>
      </div>
     </div>
     </div>
    </>
  )
}

export default App
