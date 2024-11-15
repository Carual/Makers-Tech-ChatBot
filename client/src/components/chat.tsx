import React from "react";
import axios from "axios";
import './chat.scss';

function BotMessage(props: {
    message: string
}) {
    return <div className="message new"><figure className="avatar"><img src="/imgs/makers-logo.png" /></figure>{ props.message }<div className="timestamp">22:39</div></div>
}

function UserMessage(props: {
    message: string
}) {
    return <div className="message message-personal new">{props.message}<div className="timestamp">22:41</div></div>
}

export default function ChatTest() {
    
    const [chat, setChat] = React.useState<Chat>([])
  const sendMessage = async (event: React.FormEvent) => {
    
    event.preventDefault()

    const message = ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value
    const newChat = chat;

    ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value = ''
    newChat.push({ sender: 'user', message, timestamp: Date.now() })
    setChat([...newChat])
    await axios.post('api/chat', {
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


    return (<div>
  <div className="chat">
    <div className="chat-title">
      <h1>Makers ChatBot</h1>
      <h2>Bot</h2>
      <figure className="avatar">
        <img src="/imgs/makers-logo.png" /></figure>
    </div>
    <div className="messages">
          <div className="messages-content" />
          
                <div id="mCSB_1_container" className="mCSB_container" dir="ltr" style={{ position: 'relative', top: 0, left: 0, padding: 10 }}>
                    <BotMessage message="Hola, en que puedo ayudarte?" />
                    {
                        chat.map((message, index) => {
                            if (message.sender === 'user') {
                                return <UserMessage message={message.message} />
                            } else {
                                return <BotMessage message={message.message} />
                            }
                        })
                    }
                </div>



                
    </div>
    <form className="message-box" onSubmit={sendMessage}>
      <input type="text" className="message-input" placeholder="Type message..." defaultValue={""} />
      <button type="submit" className="message-submit">Send</button>
    </form>
  </div>
  <div className="bg" />
</div>
    )
}