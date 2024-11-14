import React from 'react';
import axios from 'axios';

function App() {

  const [chat, setChat] = React.useState<Chat>([])
  const sendMessage = async ( event: React.FormEvent ) => {
    event.preventDefault()
    const message = ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value
    const newChat = chat
    newChat.push({ sender: 'user', message, timestamp: Date.now() })
    setChat([...newChat])
    await axios.post('http://localhost:3001/api/chat', {
      chat
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response: { data: Message }) => {
      newChat.push(response.data)
    setChat([...newChat])
    })
  }
  return (
    <div className="App">
      {chat.map((message, index) => {
        return (
          <div key={index}>
            <p>{message.message}</p>
          </div>
        )
      })
      }
      <form onSubmit={sendMessage} >
      <input type="text" placeholder='Haz tú pregunta' />
      <button>Send</button></form>
    </div>
  );
}

export default App;
