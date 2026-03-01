const PX = 20; // 山のピクセルサイズ
const CPX = 13; // 雲のピクセルサイズ

function mountainPath(peakX: number, peakY: number, baseY: number): string {
  const steps = Math.floor((baseY - peakY) / PX);
  let d = `M ${peakX} ${peakY}`;
  for (let i = 0; i < steps; i++) {
    d += ` H ${peakX + (i + 1) * PX} V ${peakY + (i + 1) * PX}`;
  }
  d += ` H ${peakX - steps * PX}`;
  for (let i = steps; i >= 1; i--) {
    d += ` V ${peakY + (i - 1) * PX} H ${peakX - (i - 1) * PX}`;
  }
  return d + " Z";
}

type Rect = { x: number; y: number; w: number; h: number };

function cloudRects(cx: number, cy: number, p: number): Rect[] {
  return [
    { x: cx - p,     y: cy,       w: p * 2, h: p },
    { x: cx - p * 2, y: cy + p,   w: p * 4, h: p },
    { x: cx - p * 2, y: cy + p*2, w: p * 4, h: p },
  ];
}

// 鳥（M字型ドット絵）: 4ピクセルで構成
function birdRects(cx: number, cy: number, p: number): Rect[] {
  return [
    { x: cx - 2*p, y: cy,   w: p, h: p }, // 左翼先端
    { x: cx + p,   y: cy,   w: p, h: p }, // 右翼先端
    { x: cx - p,   y: cy+p, w: p, h: p }, // 左翼内側
    { x: cx,       y: cy+p, w: p, h: p }, // 右翼内側
  ];
}

const BIRDS: { cx: number; cy: number; p: number; animClass: string }[] = [
  { cx: 360,  cy: 430, p: 7, animClass: "bird-1" },
  { cx: 490,  cy: 400, p: 5, animClass: "bird-2" },
  { cx: 425,  cy: 460, p: 4, animClass: "bird-3" },
  { cx: 960,  cy: 415, p: 6, animClass: "bird-4" },
  { cx: 1110, cy: 390, p: 5, animClass: "bird-5" },
];

export default function PixelBg() {
  const BASE_Y = 900;

  const backMountains = [
    mountainPath(380, 560, BASE_Y),
    mountainPath(1080, 580, BASE_Y),
  ];

  const frontMountains = [
    mountainPath(100, 670, BASE_Y),
    mountainPath(600, 645, BASE_Y),
    mountainPath(1200, 660, BASE_Y),
  ];

  const clouds: Rect[] = [
    ...cloudRects(180, 360, CPX),
    ...cloudRects(1080, 330, 10),
    ...cloudRects(640, 345, 8),
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "#5BC8E8" }} />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
      >
        <style>{`
          @keyframes birdFloat {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-14px); }
          }
          .bird-1 { animation: birdFloat 3.2s ease-in-out infinite; }
          .bird-2 { animation: birdFloat 3.8s ease-in-out infinite 0.6s; }
          .bird-3 { animation: birdFloat 4.4s ease-in-out infinite 1.2s; }
          .bird-4 { animation: birdFloat 3.5s ease-in-out infinite 0.3s; }
          .bird-5 { animation: birdFloat 4.0s ease-in-out infinite 0.9s; }
        `}</style>

        {/* 奥の山の地面帯（隙間を埋める） */}
        <rect x="0" y="860" width="1440" height="40" fill="#A07850" />

        {/* 奥の山（霞色） */}
        {backMountains.map((d, i) => (
          <path key={`back-${i}`} d={d} fill="#90CEBE" />
        ))}

        {/* 手前の山の地面帯（隙間を埋める） */}
        <rect x="0" y="875" width="1440" height="25" fill="#8B5E3C" />

        {/* 手前の山（緑） */}
        {frontMountains.map((d, i) => (
          <path key={`front-${i}`} d={d} fill="#4FAD72" />
        ))}

        {/* 雲 */}
        {clouds.map((r, i) => (
          <rect key={`cloud-${i}`} x={r.x} y={r.y} width={r.w} height={r.h} fill="white" opacity="0.92" />
        ))}

        {/* 鳥（浮遊アニメーション付き） */}
        {BIRDS.map(({ cx, cy, p, animClass }) => (
          <g key={animClass} className={animClass}>
            {birdRects(cx, cy, p).map((r, i) => (
              <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="#1A3A2A" opacity="0.75" />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
