import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [logoPng, heroJpg] = await Promise.all([
    readFile(join(process.cwd(), "src/app/apple-icon.png")),
    readFile(join(process.cwd(), "public", "hero.jpg")),
  ]);

  const logoSrc = `data:image/png;base64,${logoPng.toString("base64")}`;
  const heroSrc = `data:image/jpeg;base64,${heroJpg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f8f7f4",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "64px 56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img src={logoSrc} width={72} height={72} alt="" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 700,
                  color: "#1c431d",
                  lineHeight: 1.1,
                }}
              >
                {site.name}
              </div>
              <div style={{ fontSize: 20, color: "#79747e" }}>
                {site.poweredBy}
              </div>
            </div>
          </div>

          <div
            style={{
              width: 56,
              height: 4,
              background: "#28652b",
              borderRadius: 999,
              marginTop: 32,
              marginBottom: 28,
            }}
          />

          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#1c431d",
              lineHeight: 1.25,
              maxWidth: 520,
            }}
          >
            Compassionate Care, Conveniently On-Demand
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#79747e",
              lineHeight: 1.45,
              maxWidth: 520,
              marginTop: 16,
            }}
          >
            On-demand care for independent living communities
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 520,
            padding: "48px 48px 48px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              borderRadius: 24,
              overflow: "hidden",
              border: "4px solid #e8f2e9",
              boxShadow: "0 20px 50px rgba(28, 67, 29, 0.12)",
            }}
          >
            <img
              src={heroSrc}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
