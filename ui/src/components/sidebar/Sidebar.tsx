import SidebarButton from "./SidebarButton"

function Sidebar() {
  return (
    <div className='fixed left-0 top-12 h-[calc(100%-3rem)] w-64 
    -translate-x-full lg:translate-x-0 bg-white border-r border-zink-300'>
      <SidebarButton>
        <>
          <i className='fa-solid fa-pen mr-3'></i>
          <span>Sidebar Button 1</span>
        </>
      </SidebarButton>
      <SidebarButton>
        <>
          <i className='fa-solid fa-inbox mr-3'></i>
          <span>Sidebar Button 2</span>
        </>
      </SidebarButton>
      <SidebarButton>
        <>
          <i className='fa-solid fa-book mr-3'></i>
          <span>Sidebar Button 3</span>
        </>
      </SidebarButton>
      <SidebarButton>
        <>
          <i className='fa-solid fa-bookmark mr-3'></i>
          <span>Sidebar Button 4</span>
        </>
      </SidebarButton>
    </div>
  )
}

export default Sidebar