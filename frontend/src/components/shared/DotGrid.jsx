/**
 * DotGrid
 * Decorative background: subtle dot pattern + soft radial color blobs.
 * Positioned fixed so it sits behind all screen content.
 */
export default function DotGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dots opacity-40" />

      {/* Orange glow — top right */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 68%)" }}
      />

      {/* Green glow — bottom left */}
      <div
        className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 68%)" }}
      />

      {/* Blue glow — center */}
      <div
        className="absolute top-1/2 left-1/3 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }}
      />

      {/* Navy glow — bottom right */}
      <div
        className="absolute bottom-8 right-4 w-64 h-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(14,27,77,0.05) 0%, transparent 70%)" }}
      />
    </div>
  );
}
