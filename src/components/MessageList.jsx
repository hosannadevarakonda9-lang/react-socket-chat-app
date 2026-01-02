import MessageBubble from "./MessageBubble";

function MessageList({ messages, endRef }) {
  return (
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
      <div ref={endRef}></div>
    </div>
  );
}

export default MessageList;
