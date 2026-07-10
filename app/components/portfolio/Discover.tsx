export default function Discover() {
  return (
    <section
      id="discover"
      className="snap-section relative overflow-hidden"
      style={{ padding: 0 }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/portfolio/discover.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </section>
  );
}
