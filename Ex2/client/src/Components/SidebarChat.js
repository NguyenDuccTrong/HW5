import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'

const SidebarChat = ({messages}) => {
    const [seed, setSeed] = useState("")

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

  return (
    <div className='siderChat'>
        <Avatar src={`https://i.imgflip.com/3u04h5.jpg?a463872`}/>
        <div className='sidebarChat__info'>
            <h2>Dev Help</h2>
            <p>{messages[messages.length -1]?.message}</p>
        </div>
    </div>
  )
}

export default SidebarChat