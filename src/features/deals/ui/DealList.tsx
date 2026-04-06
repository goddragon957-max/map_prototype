import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Button from "@/components/common/Button";

const deals = [
  { id: 1, title: "GS25 도시락 2개 구매시 1개 무료", discount: "50% OFF", time: "오늘 마감", icon: "🍱" },
  { id: 2, title: "요기요 연남동 배달비 무료 쿠폰", discount: "0원", time: "진행 중", icon: "🛵" },
  { id: 3, title: "컴포즈커피 아메리카노 1,500원 행사", discount: "특가", time: "오늘 18시까지", icon: "☕" },
];

const DealList = observer(() => {
  return (
    <Box id="deal-section" className="glass-card p-4 rounded-[28px] bg-white/86 flex flex-col gap-4">
      <Box className="flex items-center justify-between">
        <Box>
          <Typography className="text-[0.78rem] font-extrabold text-slate-400 tracking-[0.12em] uppercase mb-1">Deals</Typography>
          <Typography variant="h3" className="text-xl font-bold">핫딜 레이더</Typography>
        </Box>
        <Button variant="text" className="ghost-button h-10 px-4">정렬</Button>
      </Box>

      <Box className="flex items-center gap-2 mb-2">
        <Box className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[0.78rem] font-bold">실시간</Box>
        <Typography className="text-slate-400 text-sm">브랜드 딜과 식비 절약 팁을 한 화면에서</Typography>
      </Box>

      <Box className="grid gap-3">
        {deals.map((deal) => (
          <Box key={deal.id} className="p-4 rounded-2xl bg-white/72 border border-slate-100 shadow-sm flex items-center gap-4 hover:translate-y-[-2px] transition-transform cursor-pointer">
            <Box className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shadow-sm">
              {deal.icon}
            </Box>
            <Box className="flex-1">
              <Typography weight="semibold" className="text-[1.05rem] tracking-tight">{deal.title}</Typography>
              <Typography className="text-xs text-slate-400 mt-1">{deal.time} / {deal.discount}</Typography>
            </Box>
            <Button variant="text" color="primary" className="font-bold">보기</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default DealList;
