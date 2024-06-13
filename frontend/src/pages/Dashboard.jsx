import React from 'react'
import  {Balance}  from '../components/Balance'
import { Appbar } from '../components/Appbar'
import Users from '../components/Users'

function Dashboard() {
  return (
    <div>
       <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
  )
}

export default Dashboard
