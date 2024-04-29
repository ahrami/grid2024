import { useState } from "react"

function Button(props: {
  callback?: () => void,
  icon?: JSX.Element,
  showCount?: boolean
} = {
  showCount: false
}) {
  const [count, setCount] = useState(0)
  const [showPressed, setShowPressed] = useState(false)
  const [to, setTo] = useState<number | undefined>();
  function handleClick() { 
    setCount(count + 1)

    setShowPressed(true)
    clearTimeout(to)
    setTo(setTimeout(() => { setShowPressed(false)}, 500))
    
    props.callback && props.callback()
  }
  return (
    <>
      <button className='rounded-md bg-blue-300 py-2 px-4 hover:bg-blue-400 
      text-zinc-800 font-medium select-none transition-colors'
        onClick={handleClick}>
        {(!showPressed || !props.showCount) && props.icon}
        {((showPressed && props.showCount) || !props.icon) && <>Pressed: {count}</>}
      </button>
    </>
  )
}

export default Button