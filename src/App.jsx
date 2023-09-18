import { useCallback, useEffect, useState, useRef } from 'react'
import './index.css'

function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numAllowed, setNumAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [copySuccess, setcopySuccess] = useState(false)

  const passwordRef = useRef(null)
const copied = <p>copied</p>

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
    setcopySuccess(true)
    setTimeout(()=>{
      setcopySuccess(false)
    }, 400)
   
  }, [password])

  useEffect(() => {
    passWordGenerator()
  }, [length, numAllowed, charAllowed, passWordGenerator])
  return (
    <>
      <div  className='bg-gray-300 mt-16 text-slate-700  max-w-xl mx-auto rounded-xl py-2 px-3  '>
      <h1 className='text-center pb-4 text-2xl font-semibold'>PASSWORD GENERATOR</h1>
      
        <div className='flex space-x-5 items-center'>
          <input type="text"
            className=' w-full label  outline-none rounded-full'
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className={`btn btn-accent hover:text-white text-white btn-sm`}> {copySuccess? 'Copied' : 'Copy'}</button>
        </div>
        <div className='flex lg:flex-row gap-x-12 items-center mt-4 flex-col justify-center' >
          <div className='flex items-center space-x-5'>
          <input type="range"
          className='range range-xs '
            max={50}
            min={6}
            value={length}
            onChange={(e) => {
              setLength(e.target.value)
            }}
          />
          <label className='label'>length:{length}</label>
          </div>
          <div className='flex items-center space-x-1'>
            <input type="checkbox"
            className='checkbox checkbox-info checkbox-sm'
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }} />
            <label >numbers</label>
          </div>

          <div className='flex items-center space-x-1'>
            <input type='checkbox'
            className='checkbox checkbox-info checkbox-sm'
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
