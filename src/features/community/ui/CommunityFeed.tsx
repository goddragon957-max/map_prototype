import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Button from "@/components/common/Button";

const communityPosts = [
  { id: 1, tag: "HOT", tagColor: "bg-orange-100 text-orange-700", title: "연남동 제육 6천원 실화냐?", content: "한빛식당 진짜 혜자네요... 요즘 물가에 이가격이면 무조건 가야함", likes: 42, time: "12분 전" },
  { id: 2, tag: "TIP", tagColor: "bg-blue-100 text-blue-700", title: "학식보다 저렴한 동네 식당 찾는 법", content: "일단 지도의 '분식' 카테고리부터 공략해보세요. 학생 할인 되는 곳 많아요", likes: 28, time: "1시간 전" },
  { id: 3, tag: "NEW", tagColor: "bg-green-100 text-green-700", title: "성수동 점심 회전 빠른 곳 추천", content: "델리박스 샐러드 신선하고 금방 나옵니다. 바쁜 직장인들 강추", likes: 15, time: "3시간 전" },
];

const CommunityFeed = observer(() => {
  return (
    <Box id="community-section" className="glass-card p-4 rounded-[28px] bg-white/86 flex flex-col gap-4">
      <Box className="flex items-center justify-between">
        <Box>
          <Typography className="text-[0.78rem] font-extrabold text-slate-400 tracking-[0.12em] uppercase mb-1">Community</Typography>
          <Typography variant="h3" className="text-xl font-bold">거지방 분위기 피드</Typography>
        </Box>
        <Button variant="text" className="ghost-button h-10 px-4">글쓰기</Button>
      </Box>

      <Box className="flex items-center gap-2 mb-2">
        <Box className="px-2.5 py-1 rounded-full bg-slate-800 text-white text-[0.78rem] font-bold">TOP</Box>
        <Typography className="text-slate-400 text-sm">절약 팁과 식당 후기를 빠르게 스캔</Typography>
      </Box>

      <Box className="grid gap-3">
        {communityPosts.map((post) => (
          <Box key={post.id} className="p-4 rounded-2xl bg-white/72 border border-slate-100 shadow-sm hover:translate-y-[-2px] transition-transform cursor-pointer">
            <Box className="flex items-center justify-between mb-2">
              <Box className="flex items-center gap-2">
                <Box className={`px-2 py-0.5 rounded-full text-[0.72rem] font-extrabold ${post.tagColor}`}>
                  {post.tag}
                </Box>
                <Typography weight="semibold" className="text-[1.1rem] tracking-tight">{post.title}</Typography>
              </Box>
              <Typography className="text-xs text-slate-400">{post.time}</Typography>
            </Box>
            <Typography className="text-slate-500 text-sm leading-relaxed mb-3">
              {post.content}
            </Typography>
            <Box className="flex items-center gap-3 text-slate-400 text-xs font-bold">
              <span>👍 {post.likes}</span>
              <span>💬 12</span>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default CommunityFeed;
