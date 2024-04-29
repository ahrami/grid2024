import Sidebar from "./sidebar/Sidebar"
import Navbar from "./Navbar"
import Counter from "./Counter"

function App() {  
  
  let numbers: number[] = []
  for (let i = 0; i < 0; i++) {
    numbers.push(i)
  }
  
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className='min-h-screen box-border pt-16 ml-0 lg:ml-64 px-4 bg-white font-medium'>
        <Counter></Counter>
        <div className="my-3">
          {numbers.map(i => {
            return (
              <div className="py-1 px-2 text-zinc-600 my-0.5 bg-zinc-100 rounded 
              hover:bg-zinc-200 cursor-pointer" key={i}>
                Array Element {i}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
