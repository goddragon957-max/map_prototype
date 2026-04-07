import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Button from "@/components/common/Button";

const communityPosts = [
  { id: 1, tag: "🔥 HOT", tagColor: "bg-warn/20 text-warn border-warn/30", title: "연남동 제육 6천원 실화냐?", content: "한빛식당 진짜 혜자네요... 요즘 물가에 이가격이면 무조건 가야함", likes: 142, time: "5분 전" },
  { id: 2, tag: "💡 TIP", tagColor: "bg-accent/20 text-accent border-accent/30", title: "학식보다 저렴한 동네 식당 찾는 법", content: "일단 지도의 '분식' 카테고리부터 공략해보세요. 학생 할인 되는 곳 많아요", likes: 87, time: "23분 전" },
  { id: 3, tag: "✨ NEW", tagColor: "bg-accent2/20 text-accent2 border-accent2/30", title: "성수동 점심 회전 빠른 곳 추천", content: "델리박스 샐러드 신선하고 금방 나옵니다. 바쁜 직장인들 강추", likes: 15, time: "3시간 전" },
  { id: 4, tag: "🔖 제보", tagColor: "bg-accent/20 text-accent border-accent/30", title: "강남역 2,500원 라면집 위치 공유", content: "역 7번 출구에서 300m 정도 가면 무인 라면집 있는데 진짜 저렴해요.", likes: 201, time: "어제" },
];

const CommunityFeed = observer(() => {
  return (
    <Box className="flex flex-col gap-6">
      {/* Community Banner (Prototyped) */}
      <Box 
        className="relative overflow-hidden rounded-[20px] p-6 bg-linear-to-br from-accent/20 to-accent2/20 border border-accent/30 cursor-pointer hover:border-accent transition-all group"
      >
        <Box className="relative z-10 flex flex-col gap-1 text-center">
          <Typography className="text-[18px] font-extrabold text-text tracking-tight uppercase">
            💬 오픈채팅 참여하기
          </Typography>
          <Typography className="text-[13px] text-text3 font-medium">
            스팟 정보를 이웃들과 실시간으로 공유해요
          </Typography>
        </Box>
        <Box className="absolute inset-0 bg-linear-to-br from-accent/5 to-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Box>

      {/* Post List */}
      <Box className="flex flex-col gap-3">
        <Typography className="text-[13px] font-bold text-text3 uppercase tracking-[1px] mb-1 px-1">
          최신 게시글
        </Typography>
        
        {communityPosts.map((post, index) => (
          <Box 
            key={post.id} 
            className="post-item glass-card p-5 cursor-pointer hover:border-accent2/60 transition-all animate-fadeIn"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <Box className="flex items-center justify-between mb-2">
              <Box className="flex items-center gap-3">
                <Box className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${post.tagColor}`}>
                  {post.tag}
                </Box>
                <Typography className="text-[15px] font-bold text-text tracking-tight hover:text-accent2 transition-colors">
                  {post.title}
                </Typography>
              </Box>
              <Typography className="text-[11px] text-text3 font-medium">{post.time}</Typography>
            </Box>
            
            <Typography className="text-[13px] text-text2 leading-relaxed mb-4 line-clamp-2">
              {post.content}
            </Typography>
            
            <Box className="flex items-center justify-between">
              <Box className="flex items-center gap-4 text-[12px] font-bold text-text3">
                <span className="flex items-center gap-1.5 hover:text-accent transition-colors">👍 {post.likes}</span>
                <span className="flex items-center gap-1.5 hover:text-accent2 transition-colors">💬 12</span>
              </Box>
              <Button variant="text" className="w-8 h-8 min-w-0 p-0 text-text3 hover:text-accent transition-colors">↗</Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default CommunityFeed;
