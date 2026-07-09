export default function OrbBackground() {
  return (
    <>
      <div
        className="orb"
        style={{
          width: 520,
          height: 520,
          background: "var(--blue)",
          top: -180,
          left: -120,
        }}
      />
      <div
        className="orb"
        style={{
          width: 460,
          height: 460,
          background: "var(--pink)",
          top: "30%",
          right: -180,
        }}
      />
      <div
        className="orb"
        style={{
          width: 420,
          height: 420,
          background: "var(--purple)",
          bottom: -160,
          left: "20%",
        }}
      />
    </>
  );
}
