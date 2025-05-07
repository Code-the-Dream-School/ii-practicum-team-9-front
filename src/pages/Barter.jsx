import { useState, useEffect,useRef } from "react";
import { API_URL } from "../endpoints";
import callApi from "../util/api";
import { Layout,  List, Input, Button, Typography } from "antd";
const { Sider, Content } = Layout;
const { Title } = Typography;
import socket from "../util/socket";


const Barter = ({ item }) => {
    const messageEndRef = useRef(null);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentConversation, setCurrentConversation] = useState([]);
    const [input, setInput] = useState("");
    const [selectedChatUser, setSelectedChatUser] = useState(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = () => {
        const newMessage = {
            message_from: { _id: userId },
            message_to: { _id: selectedChatUser._id },
            message: input,
        };

        socket.emit("private-message", {
            message_from: userId,
            message_to: selectedChatUser._id,
            message: input,
        });

        // update messages
        setMessages((prev) => [...prev, newMessage]);

        //  if chat is active, update current conversation
        if (selectedChatUser?._id) {
            setCurrentConversation((prev) => [...prev, newMessage]);
        }

        setInput(""); // clean input
    };

    const register = () => {
        const userId = sessionStorage.getItem("userId");
        const userName = sessionStorage.getItem("userName");
        setUserName(userName);
        setUserId(userId);
        if (userId.trim()) {
            socket.emit("register", userId);
        }
    };

    const fetchData = async (userId) => {
        try {
            const response = await callApi(`${API_URL}/api/v1/messages`, "GET", {});
            const { data: result, status } = response;

            const messages = result?.data?.data?.messages;
            setMessages(messages);

            let senders = Object.values(
                messages
                    .filter((msg) => msg.message_from._id !== userId) // solo los mensajes que te mandaron
                    .reduce((acc, msg) => {
                        if (!acc[msg.message_from._id]) {
                            acc[msg.message_from._id] = { _id: msg.message_from._id, name: msg.message_from.name, topic: " " }; // o guarda más datos si quieres
                        }
                        return acc;
                    }, {})
            );
            setConversations(senders);
        } catch (error) {
            console.error("Error al obtener mensajes:", error);
        }
    };

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        const userName = sessionStorage.getItem("userName");
        setUserName(userName);
        setUserId(userId);
        setSelectedChatUser(item?.owner);
        register();

        fetchData(userId);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [currentConversation]);

    useEffect(() => {
        socket.on("private-message", (data) => {
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
        if (input.trim()) {
            sendMessage();
        }
    };

    const getConversation = (from) => {
        setSelectedChatUser(from);
        let currentConversation = messages.filter(
            (msg) =>
                (msg.message_from._id === userId && msg.message_to._id === from?._id) ||
                (msg.message_from._id === from?._id && msg.message_to._id === userId)
        );
        setCurrentConversation(currentConversation);
    };

    return (
        <Layout style={{ maxHeight: "100%" }}>
            <Layout>
                <Sider width={300} style={{ background: "#fff" }}>
                    <div style={{ height: "60px", padding: "7px 7px 10px 7px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Title style={{ margin: 10 }} level={5}>Chats of {userName}</Title>
                    </div>

                    <div style={{ maxHeight: "85%", overflowY: "auto", backgroundColor: "white" }}>
                        <List
                            dataSource={conversations}
                            renderItem={(ChatUser) => (
                                <List.Item
                                    onClick={() => getConversation(ChatUser)}
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor: selectedChatUser?._id === ChatUser._id ? "#e6f7ff" : "transparent",
                                        fontWeight: selectedChatUser?._id === ChatUser._id ? "bold" : "normal",
                                    }}
                                >
                                    👤{ChatUser.name} - {ChatUser.topic}
                                </List.Item>
                            )}
                        />
                    </div>
                </Sider>

                <Content style={{ width: "400px", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: "60px", background: "#fff", padding: "7px 7px 10px 7px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Title style={{ margin: 10 }} level={5}>Chat with {selectedChatUser ? selectedChatUser.name : "—"}</Title>
                    </div>

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
                        {currentConversation.map((msg) => (
                            <div
                                key={msg?._id}
                                style={{
                                    alignSelf: msg?.message_from?._id === userId ? "flex-end" : "flex-start",
                                    backgroundColor: msg?.message_from?._id === userId ? "#1890ff" : "#e4e6eb",
                                    color: msg?.message_from?._id === userId ? "#fff" : "#000",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "16px",
                                    maxWidth: "70%",
                                }}
                            >
                                {msg.message}
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </div>

                    <div
                        style={{
                            padding: "1rem",
                            borderTop: "1px solid #f0f0f0",
                            background: "#fff",
                            display: "flex",
                            gap: "1rem",
                            height: "60px",
                        }}
                    >
                        <Input
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onPressEnter={handleSend}
                            autoComplete="off"
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


export default Barter;
