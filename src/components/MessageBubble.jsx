function MessageBubble({ message }) {
  if (message.type === "system") {
    return (
      <div className="message system">
        {message.text} • {message.time}
      </div>
    );
  }

  return (
    <div className={`message ${message.type}`}>
      {message.username && (
        <div className="username">{message.username}</div>
      )}
      <div>{message.text}</div>
      <div className="time">{message.time}</div>
    </div>
  );
}

export default MessageBubble;
