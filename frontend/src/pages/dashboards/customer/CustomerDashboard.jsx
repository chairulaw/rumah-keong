import React from 'react'

const CustomerDashboard = () => {
  return (
    <div className='h-fit flex justify-center '>
      <div className="bg-white  shadow-md p-8 rounded-md w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Hi, Remainsguy
        </h2>
        <form className="space-y-4">
          {/* First Name + Last Name */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="asda"
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
            <input
              type="text"
              placeholder="asdad"
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>

          <input
            type="email"
            placeholder="Email@gmail.com"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />

          <input
            type="password"
            placeholder="*******"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />

          <input
            type="password"
            placeholder="*******"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2"
          />
          </form>
          
          <div className='flex gap-4 mt-5 justify-between'>
          <button className='w-fit bg-gray-700 cursor-pointer text-white p-2 rounded hover:bg-gray-600'>Save Changes</button>
          <button className='w-fit bg-gray-700 cursor-pointer text-white p-2 rounded hover:bg-red-600'>Log Out</button>
          </div>
          </div>
    </div>
  )
}

export default CustomerDashboard