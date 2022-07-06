import { createContext, ReactNode, useContext, useState } from 'react'

export type SidebarContextData = {
  isOpen: boolean
  toggle: () => void
}

export const SidebarContextDefaultValues: SidebarContextData = {
  isOpen: false,
  toggle: () => null
}

export const SidebarContext = createContext<SidebarContextData>(
  SidebarContextDefaultValues
)

export type SidebarProviderProps = {
  children: ReactNode
}

function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(true)

  function toggle() {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

function useSidebar() {
  const context = useContext(SidebarContext)

  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}

export { SidebarProvider, useSidebar }
