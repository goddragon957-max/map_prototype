import React from 'react';
import Box from '@/components/common/Box';

const Ticker = () => {
  const messages = [
    "스팟맵에 오신 것을 환영합니다!",
    "새로운 스팟은 관리자 승인 후 지도에 반영됩니다",
    "허위 정보 제보 시 이용이 제한될 수 있습니다",
    "좋은 스팟을 발견하셨나요? 제보하기 버튼을 눌러주세요!",
  ];

  return (
    <Box className="fixed top-0 left-0 right-0 z-200 bg-linear-to-r from-accent to-accent2 h-[34px] overflow-hidden flex items-center shadow-md">
      <Box className="shrink-0 px-4 h-full flex items-center bg-black/15">
        <Box className="text-[11px] font-bold tracking-[1px] text-bg uppercase whitespace-nowrap">
          📢 공지
        </Box>
      </Box>
      <Box className="flex-1 overflow-hidden">
        <Box 
          className="flex gap-20 whitespace-nowrap animate-[ticker_28s_linear_infinite]"
        >
          {[...messages, ...messages].map((msg, idx) => (
            <Box key={idx} className="text-[12px] font-medium text-bg flex items-center">
              <span className="mr-2">✦</span> {msg}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Ticker;
