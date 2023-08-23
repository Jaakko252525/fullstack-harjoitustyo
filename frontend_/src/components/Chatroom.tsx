


// bootstrap
import { Button } from "react-bootstrap";

// state and effect
import { useEffect, useState } from "react"


// socket io connection
import { socket } from "../socketIoConnection";

// interface
interface chatReqID {
    chatRequestIDProp: string
}


// Chatroom component
const Chatroom = ({ chatRequestIDProp }: chatReqID) => {

    const [messages, setMessages] = useState('')

    const [receivedMessage, setReceivedMessage] = useState('')

    const [currentRoom, setCurrentRoom] = useState('')


    

    useEffect(() => {

        console.log('ran chatroom!')


        // joining socket io room
        socket.emit('joining-room', chatRequestIDProp )

        setCurrentRoom(chatRequestIDProp)


    }, [])




    // function to send messages
    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()



        // sending message to backend
        await socket.emit('message', messages)

        socket.on("message-back-to-client", (message: string) => {
            setReceivedMessage(message)
        })




    }





    return (
        <div>
            <p>Current room {currentRoom}</p>
            <form onSubmit={sendMessage} >

                Message: <input 
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}
                />
                
                <Button variant="dark" type="submit" >Send message to seller</Button>

            </form>

            <div>
                Received message: {receivedMessage}
            </div>
        </div>
    )
}



export default Chatroom










