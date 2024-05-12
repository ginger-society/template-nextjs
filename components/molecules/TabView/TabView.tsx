// Tabs.tsx
import React from 'react'

interface TabProps {
  id: string
  label: string
}

const Tab: React.FC<{ tab: TabProps, isActive: boolean, onClick: () => void }> = ({
  tab,
  isActive,
  onClick
}) => {
  const tabClasses = isActive ? 'border-b-2 border-green-700' : ''

  return (
    <div
      className={`cursor-pointer py-2 px-4 ${tabClasses} hover:bg-gray-200`}
      onClick={onClick}
    >
      {tab.label}
    </div>
  )
}

interface TabsProps {
  tabs: TabProps[]
  activeTab: string
  setActiveTab: (currentTab: string) => void
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex z-10 fixed  bg-white w-full shadow-md">
      {tabs.map((tab) => {
        return <Tab
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => { setActiveTab(tab.id) }}
        />
      })}
    </div>
  )
}

export default Tabs
