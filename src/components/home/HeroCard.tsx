import React from "react";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";

const HeroCard = () => {
  return (
    <Box className="glass-card mt-4 p-6 grid gap-4 rounded-[28px] bg-white/86 shadow-soft">
      <Box className="max-w-[44rem] flex flex-col gap-3">
        <Box className="h-9 px-4 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm w-fit">
          거지맵 분석 기반 UI 스타터
        </Box>
        <Typography variant="h1" className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
          고물가 시대,<br /> 가격 제보가 쌓이는 식당 지도
        </Typography>
        <Typography className="text-slate-500 text-lg leading-relaxed">
          밝은 블루그레이 배경, 유리 카드, 지도 + 커뮤니티 + 핫딜 3축<br /> 구성을 살린 Next.js + MobX 프로토타입입니다.
        </Typography>
      </Box>

      <Box className="flex flex-wrap gap-2.5">
        {["🍚 한식", "🍜 면요리", "☕ 카페", "🥟 분식"].map((chip) => (
          <Box key={chip} className="px-4 py-2.5 rounded-full bg-blue-100/70 border border-white/72 font-bold text-slate-700">
            {chip}
          </Box>
        ))}
      </Box>

      <Box className="flex flex-wrap gap-4 mt-4">
        {[
          { label: "누적 제보", value: "1,284" },
          { label: "오늘 업데이트", value: "34" },
          { label: "평균 만족도", value: "4.7" },
        ].map((metric) => (
          <Box key={metric.label} className="min-w-[9rem] p-4 rounded-2xl bg-white/95 border border-white/72 shadow-soft">
            <Typography variant="h2" className="text-2xl font-black tracking-tighter">{metric.value}</Typography>
            <Typography className="text-slate-400 text-sm font-semibold">{metric.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HeroCard;
