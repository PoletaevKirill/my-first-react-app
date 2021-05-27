export default function Square({onClick, className, value}) {
  return (
    <button className={`square ${className}`}
            onClick={onClick}>
      {value}
    </button>
  );
}