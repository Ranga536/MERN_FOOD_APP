import { Circle, CircleXIcon } from "lucide-react";

const SuperAdmin = () =>  {
    return (
        // <div className="flex items-center justify-center h-[80vh]">
        //     <CircleXIcon color="red" size={50} /> 
        //     <h1 className="font-bold ">You Need Super Admin Access To View This Details</h1>
        // </div>.

        <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50 p-6 rounded-lg shadow-md space-y-6">
  <div className="bg-red-100 p-4 rounded-full shadow">
    <CircleXIcon color="red" size={60} />
  </div>
  <h1 className="text-2xl font-semibold text-gray-800 text-center max-w-md">
    You Need <span className="text-red-600">Super Admin</span> Access To View This Detail
  </h1>
  {/* <button className="mt-4 px-6 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition">
    Request Access
  </button> */}
</div>

    )
}

export default SuperAdmin;