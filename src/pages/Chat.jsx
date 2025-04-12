
import { useState } from "react";
import { Layout, List, Input, Button, Typography } from "antd";
const { Sider, Content } = Layout;
const { Title } = Typography;




const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! Is your bike still available?", sender: "other" },
        { id: 2, text: "Yes! I’m looking to trade it for some books.", sender: "me" },
      ]);
      
    const [input, setInput] = useState("");
    const [SelectedChatUser, setSelectedChatUser]=useState(null);
    const conversations = [
        { id: 1, name: "Anna", topic: "Bicycle for Books" },
        { id: 2, name: "John", topic: "Old Laptop for Table" },
      ];


 
    const handleSend = () => {
        if (input.trim()){
            setMessages([...messages, { id: messages.length + 1, text: input, sender: "me" }]);
            setInput("");
        }
    };
 
    return( 
        
       <Layout style={{ height: "100vh" }}>
          {/* Sidebar */}
          <Sider width={300} style={{ background: "#fff", padding: "1rem", overflowY: "auto" }}>
             <Title level={4}>Conversations</Title>
             <List
                bordered
                dataSource={conversations}
                renderItem={(ChatUser) => (
                    <List.Item 
                    onClick={() => setSelectedChatUser(ChatUser)}
                    style={{ cursor: "pointer",
                             backgroundColor:
                             SelectedChatUser?.id === ChatUser.id ? "#e6f7ff" : "transparent",
                             fontWeight: SelectedChatUser?.id === ChatUser.id ? "bold" : "normal",
                    }} >
                    👤{ChatUser.name} - {ChatUser.topic}
                    
              </List.Item>
                )}
             />
          </Sider>
          {/* Chat area */}
          <Content style={{   display: "flex", flexDirection: "column" }}>
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
                    <Title level={5}>Chat with {SelectedChatUser ? SelectedChatUser.name : "—"}</Title>
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

    );
};


export default Chat;

