function SidebarButton(props: { children?: JSX.Element }) {
  return (
    <div className="px-4 py-2 border-b border-zinc-300 text-lg 
      hover:bg-zinc-200 cursor-pointer transition-all select-none">
      <>{props.children}</>
    </div>
  )
}

export default SidebarButton