import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { useStateValue } from './Components/StateProvider';
import Pusher from 'pusher-js'
import Login from './Components/Login';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';

function App() {
  const [messages, setMessages] = useState([])
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
    axios.get("/messages/sync").then(res => {
      setMessages(res.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('92a36cb2621e9ed21ce0', {
      cluster: 'ap2'
    })
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      setMessages([...messages, data])
    })
  
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])
  console.log(messages)

  return (
    <div className='app'>
      { !user ? <Login/> : (
        <div className='app__body'>
          <Sidebar messages={messages}/>
          <Chat messages={messages}/>
        </div>
      )}
    </div>
  )
}

export default App;
