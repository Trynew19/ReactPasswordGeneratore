import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);

  const [numbersAllowed, setNumbersAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [password,setPassword] = useState("");

  // useRef hook

  const passwordRef = useRef(null)

  const passwordGeneratore = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numbersAllowed) str += '0123456789'
    if(charAllowed) str += '!@#$%^&*()_{}+~|'

    for (let i = 0; i < length; i++) {

      let char = Math.floor(Math.random() * str.length +1)

       pass += str.charAt(char)

      setPassword(pass)
      
    }

  },[length,numbersAllowed,charAllowed,setPassword])

  useEffect(()=>{   //kai kam ko ak sath karne ke liye useEffect ka use hota hai in charo m se koi bhi change hoga to vah callback fun ko chala dega 
    passwordGeneratore()
  },[length, numbersAllowed ,charAllowed ,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()  // user ko batane ke liye ki password copy ho gya hai
    // passwordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500'>
      <h1 className='text-white text-center my-10'>password generator</h1>
      <div className=' flex shadow rounded-lg overflow-hidden my-9 '>
        <input 
        className='outline-none w-full py-1 px-3 '
        type="text"
        value={password}
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-800 text-white px-3 py-1 '
        >click</button>
      </div>
      <div className='flex text-sm gap-x-2' >
        <div className='flex items-center gap-x-1' >
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
            />
            <label>length :{length}</label>
        </div>
        <div className='flex items-center gap-x-1' >
            <input 
            type="checkbox"
            defaultChecked={numbersAllowed}
            id='numberInput'
            onChange={() => {
              setNumbersAllowed((prev) => !prev);
            }}
        />
        <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1' >
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id='characterInput'
          onChange={()=>{
            setCharAllowed((prev) => !prev);
          }}
           />
           <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
