interface SparkleProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Sparkle({ size = 18, className = "", style }: SparkleProps) {
  return (
    <span
      className={`sparkle-icon inline-block shrink-0 ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    />
  );
}
