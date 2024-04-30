import Button from "./Button"
import axios from "axios"
import { useEffect, useState } from "react"



//const BACKEND = import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT
//const BACKEND = window.location.protocol + "//" + window.location.hostname + ":" + import.meta.env.VITE_BACKEND_PORT
//const BACKEND = window.location.protocol + "//" + window.location.hostname + "/api"
const BACKEND = window.location.origin + "/api"

function Counter() {
  const [count, setCount] = useState<null | number>(null)
  const [addValue, setAddValue] = useState(1)
  const [subtractValue, setSubtractValue] = useState(1)

  useEffect(() => {
    console.log(BACKEND)
    const abortController = new AbortController();
    axios.get(BACKEND, { signal: abortController.signal }).then(res => {
      setCount(res.data.count)
    }).catch(err => {
      if (err.name !== 'CanceledError') {
        console.log(err.message);
      }
    })
    return () => { abortController.abort() }
  }, [])

  function add(value: number) {
    setCount(null)
    axios.post(BACKEND + "/add", { value }).then(res => {
      setCount(res.data.count)
    }).catch(err => {
      console.log(err.message);
    })
  }

  function subtract(value: number) {
    setCount(null)
    axios.post(BACKEND + "/subtract", { value }).then(res => {
      setCount(res.data.count)
    }).catch(err => {
      console.log(err.message);
    })
  }

  function requestCount() {
    setCount(null)
    axios.get(BACKEND).then(res => {
      setCount(res.data.count)
    }).catch(err => {
      console.log(err.message);
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium text-xl">
        <i className="fa-solid fa-calculator mr-3"></i>
        <span>Counter</span>
      </div>
      <div className="my-2 border-b border-zinc-300"></div>
      <div className="flex gap-2 items-center">
        <Button callback={() => { add(1) }}
          icon={<div className="w-8">+1</div>} />
        <Button callback={() => { add(5) }}
          icon={<div className="w-8">+5</div>} />
        <Button callback={() => { add(10) }}
          icon={<div className="w-8">+10</div>} />
      </div>
      <div className="flex gap-2 items-center">
        <input className="outline-none w-20 py-2 px-3 border 
        border-zinc-300 bg-zinc-100 rounded-md"
          type="number" value={addValue} 
          onChange={e => {setAddValue(parseInt(e.target.value) || 0)}} />
        <i className="fa-solid fa-rotate-left p-2 
        hover:bg-zinc-300 rounded hover:cursor-pointer" 
        onClick={() => { setAddValue(1) }}></i>
        <Button callback={() => { add(addValue) }} 
          icon={<i className="fa-solid fa-plus"></i>} showCount={true}/>
      </div>
      <div className="my-2 border-b border-zinc-300"></div>
      <div className="flex gap-2 items-center">
        <Button callback={() => { subtract(1) }}
          icon={<div className="w-8">-1</div>} />
        <Button callback={() => { subtract(5) }}
          icon={<div className="w-8">-5</div>} />
        <Button callback={() => { subtract(10) }}
          icon={<div className="w-8">-10</div>} />
      </div>
      <div className="flex gap-2 items-center">
        <input className="outline-none w-20 py-2 px-3 border 
        border-zinc-300 bg-zinc-100 rounded-md"
          type="number" value={subtractValue} 
          onChange={e => { setSubtractValue(parseInt(e.target.value) || 0) }} />
        <i className="fa-solid fa-rotate-left p-2 
        hover:bg-zinc-300 rounded hover:cursor-pointer" 
        onClick={() => { setSubtractValue(1) }}></i>
        <Button callback={() => { subtract(subtractValue) }} 
        icon={<i className="fa-solid fa-minus"></i>} showCount={true}/>
      </div>
      <div className="my-2 border-b border-zinc-300"></div>
      <div className="flex gap-2 items-center">
        <div className="w-20">Get Count</div>
        <Button callback={requestCount}/>
      </div>
      <div className="my-2 border-b border-zinc-300"></div>
      <div className="text-xl">
        <span className="font-normal">Current Count: </span>
        {count !== null && <span className="text-red-600 font-bold">{count}</span>}
        {count === null && <span className="text-blue-600 font-bold">Loading...</span>}
      </div>
      <div className="my-2 border-b border-zinc-300"></div>
    </div>
  )
}

export default Counter