import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Youssef Mohey — Content Writer for Startups";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#FBF6EC",
          padding: "80px 100px",
          fontFamily: "Georgia, serif",
        }}
      >
        <p
          style={{
            fontSize: 18,
            fontFamily: "Arial, sans-serif",
            color: "#888",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 24,
          }}
        >
          Content Writer for Startups
        </p>
        <h1
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "#211E1B",
            lineHeight: 1.05,
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          I Write Content That Helps Startups Grow
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 40,
          }}
        >
          <div
            style={{
              width: 40,
              height: 2,
              background: "#C1392B",
            }}
          />
          <p
            style={{
              fontSize: 28,
              fontFamily: "Arial, sans-serif",
              color: "#211E1B",
              fontWeight: 600,
            }}
          >
            Youssef Mohey
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
