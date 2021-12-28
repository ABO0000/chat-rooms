import { isSet } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react'; 
import {Link,useParams } from 'react-router-dom';
import { socketConnect } from 'socket.io-react'
import io from 'socket.io-client'
import api from '../../Api'
import '../../../css/chat.css'



var socket = io.connect("https://socketiochat10.herokuapp.com", {secure: true, port: '3000',transports : ['websocket'] });

const ChatRoom = () => {
  let user = JSON.parse(localStorage.getItem('userData'))[0]
 
  const { id: roomId } = useParams()

  const [users, setUsers] = useState([])

  const [sendMessage, setSendMessage] = useState('')
  const [messages,setMessages] = useState([])

  
  
  
  const SendMsgToRoom = () => {
    if(sendMessage){
      api
        .post(`/send_msg/${roomId}`,
        {
          user_id:user.id,
          msg: sendMessage
        }
        )   
        .then(res => {
          socket.emit('sendChatToServer', res.messages)  
          setSendMessage('')
        })
      }
    }
    
    useEffect(() => {
    var myDiv = document.querySelector(".messages-chat");
      myDiv.scrollTop = myDiv.scrollHeight;

    socket.on("sendChatToClient", data => {
      setMessages(data)
    });
    if (users.length == 0) {
      api.post("/users_chat/"+roomId)   
      .then(res => {
        setUsers(res.users)
      })
    }

    if (!messages.length) {
      api.post("/allmsg_chat/"+roomId)   
      .then(res => {
        setMessages(res.messages)
      })
    }
    if (socket) {
      socket.on("sendChatToClient", data => {
        setMessages(data)
      });
    }
    if (!socket) return startSocket()
  }, [users, messages])


  return (<div>
      <div className='ext' style={{width:'100%',height:'66px', display:'flex',justifyContent:'space-between',alignItems:' center', padding:' 20px',background:'#563d7c', position:'sticky',top:'0',zIndex: '1071'}}>
        <Link to='/profile' href="profile.php" style={{textDecoration:'none'}}><h1 style={{color:'white' ,marginLeft: '25px',fontSize:'40px'}}>Profile</h1></Link>
        {
            (user)? 
                    <div style={{ display:'flex',justifyContent: 'center',alignItems: 'center'}}>
                        <h1 style={{color:'white' ,marginLeft: '25px'}}>{user.name}</h1>
                        <h1 style={{color:'white',marginLeft: '10px'}}>{user.surname}</h1>
                        {/* <p style={{marginLeft: '25px'}}><a href='addproduct.php' style="color:white "> Add Product</a> </p> */}
                        <p style={{marginLeft: '25px',marginop: '10px' , paddingRight: '30px'}} ><Link to='/' style={{color:'white' }}> Logout</Link> </p>
                    </div>
            :
            <p style={{paddingRight: '30px'}}><Link to='/' style={{color:'white' }}> Login</Link> </p>
        }   
      </div>
    <div className="container" style={{marginTop:'20px'}}>

      <div className="row">
      
        <section className="discussions" style={{height:'600px'}}>
        <div className="header-chat">
            <p className="name"><Link to="/profile">Back</Link></p>
          </div>
          {
            users.map(function(users, i){
              return(
                <div className="discussion message-active" key={i}>
                
                  <div className="photo" style={{backgroundImage: `url(${users.avatar})`}}>
                  </div>
                  <div className="desc-contact" style={{display:'flex',alignItems:'center'}}>
                    <p className="name">{users.name} {users.surname}</p>
                  </div>
                </div>
              )
            })
          }
          
        </section>
        <section className="chat" style={{height:'600px' , borderTop:'1px solid gray'}}>
          <div className="messages-chat">

            
          {
            messages.length?messages.map(function(message, i){
              return(
                <div key={i}>
                  {
                    users.map(function(users, j){
                      return(
                        <div key={j}>


                          {
                            (users.id == message.user_id && users.id !==user.id)
                            ?
                              <div className="message" style={{display:'flex' }}>
                                
                                <div className="photo" style={{backgroundImage: `url(${users.avatar})`}}>
                                  <div className="online"></div>
                                </div>
                                <div>{users.name}</div>
                                <p className="text"> {message.message} </p>
                              </div>
                            
                            :(users.id == message.user_id && users.id ==user.id)
                            ?
                              <div className="message text-only">
                                <div className="response">
                                  <p className="text"> {message.message}</p>
                                </div>
                              </div>
                            :""  
                        }
                        </div>
                      )
                    })
                  }
                </div>
              )
            }):""
          }
          </div> 
          <div className="footer-chat" style={{marginBottom:'60px'}}>
            <input style={{width:'100%'}} type="text" className="message write-message" placeholder="Type your message here" name="message" value={sendMessage} onChange={(e) => setSendMessage(e.target.value)}></input>
            <button className='btn btn<i class="fa fa-caret-left" aria-hidden="true"></i>' onClick={SendMsgToRoom}>Send</button>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}
export default ChatRoom;







