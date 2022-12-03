import styles from "../styles/chatView.module.css";
import ChatHeader from "./ChatHeader";
import MessageForm from "./MessageForm";
import MessageCard from "./MessageCard";

const ChatView = () => {
    return (
        <div className={styles.chatView}>
            <ChatHeader />
            <div className={styles.messagesContainer}>
                {/* <MessageCard
                    key={index}
                    avatar={message.avatar}
                    sender={message.sender}
                    timestamp={message.createdAt}
                    content={message.content}
                /> */}
            </div>
            <MessageForm />
        </div>
    );
};

export default ChatView;
