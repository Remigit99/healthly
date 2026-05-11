import { Search } from "lucide-react"


const DashboardMain = () => {
  return (
    <main className="py-6 px-4">
        {/* Top  */}
        <div>
            <div className="flex justify-start items-center  border p-2 border-gray-200  rounded-full w-max shadow-lg ">
                <div>
                    <input type="text" name="search" id="search" placeholder="Search" className="outline-none w-full flex-1 " />
                </div>
                <button className="pl-2 cursor-pointer">
                    <Search/>
                </button>
            </div>
            <div></div>
        </div>
    </main>
  )
}

export default DashboardMain