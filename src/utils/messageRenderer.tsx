import ReactMarkdown from "react-markdown";

const MessageRenderer = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none text-white">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MessageRenderer;
