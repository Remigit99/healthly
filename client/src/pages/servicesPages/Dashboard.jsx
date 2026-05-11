import DashboardMain from "../../components/services/DashboardMain"
import Sidebar from "../../components/services/Sidebar"


export const Dashboard = () => {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar/>
      <DashboardMain/>
    </div>
  )
}
