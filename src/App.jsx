import { useCallback, useEffect, useState, useRef } from 'react'
import './index.css'


function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numAllowed, setNumAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)


  const passWordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numAllowed) str += '0123456789'
    if (charAllowed) str += '~!@#$%^&*(){}?/'

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
   
  }, [password])

  useEffect(() => {
    passWordGenerator()
  }, [length, numAllowed, charAllowed, passWordGenerator])
  return (
    <>
      <div className='bg-gray-300 mt-16 text-slate-700 max-w-xl mx-auto rounded-xl py-2 px-3  '>
      <h1 className='text-center pb-4 text-2xl '>PASSWORD GENERATOR</h1>
        <div className='flex gap-x-2 items-center'>
          <input type="text"
            className=' w-full label outline-none rounded-full'
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='btn bg-orange-500 hover:text-black text-white btn-sm'>Copy</button>
        </div>
        <div className='flex lg:flex-row gap-x-6 items-center mt-4 flex-col justify-center' >
          <div className='flex items-center space-x-3'>
          <input type="range"
            max={100}
            min={6}
            value={length}
            onChange={(e) => {
              setLength(e.target.value)
            }}
          />
          <label >length: {length}</label>
          </div>
          <div className='flex items-center space-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }} />
            <label >numbers</label>
          </div>

          <div className='flex items-center space-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label >characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
