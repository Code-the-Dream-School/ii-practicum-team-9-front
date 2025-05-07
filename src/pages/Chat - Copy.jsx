
import { useState, useEffect } from "react";
import { API_URL } from "../endpoints";
import callApi from "../util/api";
import { io } from "socket.io-client";
import { Layout,  List, Input, Button, Typography } from "antd";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const socket = io(API_URL);


const Chat = ({item}) => {

    const [userId, setUserId]=useState("");
    const [userName, setUserName]=useState("");
    const [receiverId, setReceiverId]=useState("");
    const [message, setMessage]=useState("");
    const [conversations,setConversations] = useState([]);
    const [messages,setMessages] = useState([]);
    const [currentConversation,setCurrentConversation] = useState([]);
      
    const [input, setInput] = useState("");
    const [selectedChatUser, setSelectedChatUser]=useState(null);
   
/*
    const sendMessage = () => {
        if (message.trim() && receiverId.trim() ){
            socket.emit("private-message", 
                        { message_from: sessionStorage.getItem("userid"),
                          message_to: selectedChatUser._id,
                          message: input,
                         // sender: "me",
                         // receiver: selectedChatUser._id,
                          });
                          //setMessages((prev) => [...prev,{sender: "Yo", message}]);
                          setMessage("");
        }
    };
    */
    const sendMessage = () => {
        const newMessage = {
          message_from:  {_id: userId} ,
          message_to: {_id: selectedChatUser._id} ,
          message: input,
        };
      
        debugger;
        socket.emit("private-message", {
            message_from:   userId ,
            message_to:  selectedChatUser._id,
            message: input,
          });
        //console.log("mensajes antes", messages);

        // update messages
        setMessages((prev) => [...prev, newMessage]);
        
        //  if chat is active, update current conversation
        if (selectedChatUser?._id) {
          setCurrentConversation((prev) => [...prev, newMessage]);
        }
       //console.log("current convers", currentConversation );

        setInput(""); // clean input
      };
      

    const register = () =>{
        //this register the user to chat
        const userId=sessionStorage.getItem("userId");
        const userName=sessionStorage.getItem("userName");
        setUserName(userName);
        setUserId(userId); 
        if (userId.trim() ){
            socket.emit ("register",userId);
        }
    };

 
     
  const fechtData =async( userId)=> {
    const response = await callApi(`${API_URL}/api/v1/messages`, "GET", { });
    const {data:result, status}=response;
    const messages=result?.data?.data?.messages;
    debugger;
    setMessages(messages);        
       let senders = Object.values(
            messages
              .filter((msg) => msg.message_from._id !== userId)     // solo los mensajes que te mandaron
              .reduce((acc, msg) => {
                if (!acc[msg.message_from._id]) {
                  acc[msg.message_from._id] = { _id: msg.message_from._id, name: msg.message_from.name, topic: " " }; // o guarda más datos si quieres
                }
                return acc;
              }, {})
          );
       setConversations(senders);



    //console.log("senders ", conversations);
    //console.log("messages ", messages);
       
  }
      useEffect(() => {
        const userId=sessionStorage.getItem("userId");
        const userName=sessionStorage.getItem("userName");
        setUserName(userName); 
        setUserId(userId);
        setSelectedChatUser(item?.owner);
        register();
        
        fechtData(userId);
   
      
     },[]);

    /* 
    useEffect (() => {
    socket.on("private-message", (data)=> { 
        // console.log("data",data); 
         debugger; 
         console.log(messages.length);
         //setMessages([...messages,{data}]);
         
         setMessages((prev)=>  [...prev, {data}]);
         console.log(messages.length);
         console.log(messages);
     });
     return () => {
         socket.off("private-message");
     };
    },[]); */

    useEffect(() => {
        socket.on("private-message", (data) => {
            debugger;
          console.log("Recibido mensaje:", data); 
          setMessages((prev) => [...prev, data]);
          // Si el mensaje corresponde a la conversación actual, actualiza también
          if (
            (data.message_from === userId && data.message_to === selectedChatUser?._id) ||
            (data.message_from === selectedChatUser?._id && data.message_to === userId)
          ) {
            setCurrentConversation((prev) => [...prev, data]);
          }
        });
        return () => {
          socket.off("private-message");
        };
      }, [userId, selectedChatUser]);



    const handleSend = () => {
        if (input.trim()){
            sendMessage();
           
        }
    };


    const getConversation=(from)=>{
        debugger;
        setSelectedChatUser(from);
        //console.log("messages antes", messages);
        let currentConversation = messages
                 .filter((msg) => 
                       (msg.message_from._id === userId && msg.message_to._id === from?._id) ||
                       (msg.message_from._id === from?._id && msg.message_to._id === userId)
                    );
                   
        setCurrentConversation(currentConversation);
    };


    
    
    return( 
       <Layout style={{ maxHeight: "100%" }} >
        <Layout >
            <Sider width={300} style={{ background: "#fff"}}> 
            <div style={{ height:"60px",  padding:"7px 7px 10px 7px", display:"flex", justifyContent: "space-between", alignItems: "center"}}>
                <Title style={{ margin: 10 }} level={5}>Chats of {userName }</Title>

              </div>
                
            <div style={{ maxHeight:"85%", overflowY: "auto", backgroundColor:"white"}}>            
            <List
             //bordered
             dataSource={conversations}
             renderItem={(ChatUser) => (
                 <List.Item 
                 onClick={() => getConversation(ChatUser)}
                 style={{ cursor: "pointer",
                          backgroundColor:
                          selectedChatUser?._id === ChatUser._id ? "#e6f7ff" : "transparent",
                          fontWeight: selectedChatUser?._id === ChatUser._id ? "bold" : "normal",
                 }} >
                 👤{ChatUser.name} - {ChatUser.topic}
                 
                 </List.Item>
              )}
            />
            
       </div> 
       </Sider>
             
            <Content  style={{  width:"400px", display: "flex", flexDirection: "column" }}>
              <div style={{ height:"60px", background:"#fff", padding:"7px 7px 10px 7px", display:"flex", justifyContent: "space-between", alignItems: "center"}}>
                <Title style={{ margin: 10 }} level={5}>Chat with {selectedChatUser ? selectedChatUser.name : "—"}</Title>
                <Button type="link">View Item</Button>
              </div>
              {/* Messages */}
              <div
                    style={{
                    flex: 1,
                    padding: "1rem",
                    overflowY: "auto",
                    background: "#fafafa",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    scrollBehavior: "smooth"
                    }}
                >
                    {currentConversation.map((msg) => (
                        
                    <div
                        key={msg?._id}
                        style={{
                        alignSelf: msg?.message_from?._id === userId ? "flex-end" : "flex-start",
                        backgroundColor: msg?.message_from?._id === userId ? "#1890ff" : "#e4e6eb",
                        color: msg?.message_from?._id === userId ? "#fff" : "#000",
                        padding: "0.5rem 1rem",
                        borderRadius: "16px",
                        maxWidth: "70%"
                        }}
                    >
                        {msg.content}
                        

                    </div>
                    ))}
                  </div> 
                
              {/* Input box */}
                <div
                    style={{
                    padding: "1rem",
                    borderTop: "1px solid #f0f0f0",
                    background: "#fff",
                    display: "flex",
                    gap: "1rem", height: "60px"
        
                    }}
                >
                    <Input
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onPressEnter={handleSend}
                    />
                    <Button type="primary" onClick={handleSend}>
                      Send
                    </Button>
                </div>
            </Content>
                 
        </Layout>
         
    </Layout>
 
   
  );
};


export default Chat;

