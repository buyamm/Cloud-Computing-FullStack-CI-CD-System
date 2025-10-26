const TextLimited = ({ text, max }) => {
  return (
    <p>
      {text.length > max ? text.slice(0, max) + '...' : text}
    </p>
  );
};
export default TextLimited;