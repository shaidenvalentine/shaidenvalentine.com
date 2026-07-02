import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Carlisle vs Steven — hermit crab showdown";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #04263b 0%, #075e7a 55%, #0a7d8c 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120, display: "flex" }}>🦀⚔️🦀</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, marginTop: 12 }}>
          <span style={{ color: "#FF7A45" }}>Carlisle</span>
          <span style={{ color: "white", margin: "0 20px" }}>vs</span>
          <span style={{ color: "#2DD4BF" }}>Steven</span>
        </div>
        <div style={{ fontSize: 34, marginTop: 20, color: "rgba(255,255,255,0.8)" }}>
          Hermit crab arena brawl · tap to play 🦀
        </div>
      </div>
    ),
    { ...size },
  );
}
