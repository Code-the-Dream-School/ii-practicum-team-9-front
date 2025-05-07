
import { useState, useEffect } from "react";
import { API_URL } from "../endpoints";
import { io } from "socket.io-client";
import { Layout, List, Input, Button, Typography } from "antd";
const { Sider, Content } = Layout;
const { Title } = Typography;

const socket = io(API_URL);


const Chat = ({toUserId}) => {

    const [userId, setUserId]=useState("");
    const [userName, setUserName]=useState("");
    const [receiverId, setReceiverId]=useState("");
    const [message, setMessage]=useState("");
    
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! Is your bike still available?", sender: "other" },
        { id: 2, text: "Yes! I’m looking to trade it for some books.", sender: "me" },
      ]);
      
    const [input, setInput] = useState("");
    const [selectedChatUser, setSelectedChatUser]=useState(null);
   
    
    const conversations = [


        { id: "6800d93709e39cdae57f1610", name: "Pedro Parker", topic: "Bicycle for Books" },
        { id: "680148a651c8d2648fcdfe93", name: "Norma Moguel", topic: "Old laptop for Table" },
        { id: "3", name: "Anita", topic: "Bicycle for Books" },
        { id: "4", name: "Juan", topic: "Old laptop for Table" },

 //];

          { id: "5", name: "Luis", topic: "Bicycle for Books" },
        { id: "6", name: "Jaime", topic: "Old laptop for Table" },
        { id: "7", name: "Ingrid", topic: "Bicycle for Books" },
        { id: "8", name: "Jose", topic: "Old laptop for Table" },
        { id: "9", name: "Amalia", topic: "Bicycle for Books" },
        { id: "10", name: "Jesus", topic: "Old laptop for Table" },
        { id: "11", name: "Anyfer", topic: "Bicycle for Books" },
        { id: "12", name: "Jonathan", topic: "Old laptop for Table" },
        { id: "13", name: "Adamaris", topic: "Bicycle for Books" },
        { id: "14", name: "Josue", topic: "Old laptop for Table" },
        { id: "15", name: "Alisson", topic: "Bicycle for Books" },
        { id: "16", name: "Joan", topic: "Old laptop for Table" },
      ];
    

      // This is item's user or first of list de users that left messages
      //toUserId = "1";
      //setSelectedChatUser(toUserId);
        
/*
      const sendMessage = () => {
        if (message.trim() && receiverId.trim() ){
            socket.emit("private_message", { sender:userId, receiver: receiverId, message});
            setMessages((prev) => [...prev,{sender: "Yo", message}]);
            setMessage("");
        }
    };
 */

    const sendMessage = () => {
        if (message.trim() && receiverId.trim() ){
            socket.emit("private_message", 
                        { message_from: sessionStorage.getItem("userid"),
                          message_to: 2,
                          message: input,
                          sender: "me",
                          receiver: selectedChatUser.id,
                          });
                          setMessages((prev) => [...prev,{sender: "Yo", message}]);
                          setMessage("");
        }
    };
/*
    const registerUser = () =>{
        //this register the user to chat
        if (userId.trim() ){
            socket.emit ("register",userId);
        }
    };
*/
    const register = () =>{
        //this register the user to chat
        const userId=sessionStorage.getItem("userId");
      //  alert (userId);
        const userName=sessionStorage.getItem("userName");
       // alert (userName);
        setUserName(userName);
      
        if (userId.trim() ){
            socket.emit ("register",userId);
        }
    };
/*
 
     useEffect(()=> {
        socket.on("private_message", ({sender,message})=> {
                     setMessages((prev)=>  [...prev, {sender,message}]);
        });
        return () => {
            socket.off("private_message");
        };
     },[]);
 */

     useEffect(() => {
        
        setSelectedChatUser(toUserId);

       // alert(toUserId);
      //  register();
     },[]);



    const handleSend = () => {
        if (input.trim()){
            setMessages([...messages, { id: messages.length + 1, text: input, sender: "me" }]);
            setInput("");
        }
    };


    
    
    return( 

     
       
       <Layout style={{ maxHeight: "100%" }} >
        
         {/* Sidebar */}
         <Sider width={300} style={{ border: "1px solid red",background: "#fff", padding: "1rem",display: "flex", flexDirection: "column"   }}>
             {/* Header */}
             <div
                    style={{
                    padding: "1rem",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "gray",
                    }}
                >
                  <Title level={4}>Conversations chat {userName} -to-one con socket IO</Title>
            </div>
            {/* User List */}
            <div style={{ maxHeight: "100%", overflowY: "auto" }}>
               <List
                bordered
                dataSource={conversations}
                renderItem={(ChatUser) => (
                    <List.Item 
                    onClick={() => setSelectedChatUser(ChatUser)}
                    style={{ cursor: "pointer",
                             backgroundColor:
                             selectedChatUser?.id === ChatUser.id ? "#e6f7ff" : "transparent",
                             fontWeight: selectedChatUser?.id === ChatUser.id ? "bold" : "normal",
                    }} >
                    👤{ChatUser.name} - {ChatUser.topic}
                    
                    </List.Item>
                 )}
               />
          </div> 
          </Sider>
        
        
         <div style={{ maxHeight: "100%" }}> 
          {/* Chat area */}
          <Layout  style={{ height: "100%"}}>
             <Content  style={{   display: "flex", flexDirection: "column" }}>
             {/* Header */}
                <div
                    style={{
                    padding: "1rem",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#fff",
                    }}
                >
                    <Title level={5}>Chat with {selectedChatUser ? selectedChatUser.name : "—"}</Title>
                    <Button type="link">View Item</Button>
                </div>
              {/* Messages */}
              <div style={{ maxHeight: "100%", overflowY: "auto" }}>
                <div
                    style={{
                    flex: 1,
                    padding: "1rem",
                    overflowY: "auto",
                    background: "#fafafa",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    scrollBehavior: "smooth", 
                    }}
                >
                    {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                        alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                        backgroundColor: msg.sender === "me" ? "#1890ff" : "#e4e6eb",
                        color: msg.sender === "me" ? "#fff" : "#000",
                        padding: "0.5rem 1rem",
                        borderRadius: "16px",
                        maxWidth: "70%",
                        }}
                    >
                        {msg.text}

                    </div>
                    ))}
                  </div> 
                </div>
              {/* Input box */}
                <div
                    style={{
                    padding: "1rem",
                    borderTop: "1px solid #f0f0f0",
                    background: "#fff",
                    display: "flex",
                    gap: "1rem",
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
         </div>
    </Layout>
 
   
  );
};


export default Chat;

