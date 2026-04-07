import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@/components/common/Box';
import { uiStore, ViewMode } from '@/store/uiStore';

const BottomTab = observer(() => {
  const tabs: { label: string; value: ViewMode; icon: string }[] = [
    { label: '맵', value: 'map', icon: '🗺' },
    { label: '목록', value: 'community', icon: '☰' }, // Use community as proxy for list for now
    { label: '랭킹', value: 'deal', icon: '🏆' }, // Use deal as proxy for ranking for now
    { label: '커뮤니티', value: 'community', icon: '💬' },
  ];

  return (
    <Box className="fixed bottom-0 left-0 right-0 z-100 h-[50px] bg-[#0d0f14]/95 backdrop-blur-[20px] border-t border-border flex items-center justify-center">
      {tabs.map((tab, idx) => (
        <Box
          key={idx}
          onClick={() => uiStore.setMode(tab.value)}
          className={`flex-1 max-w-[140px] h-full flex items-center justify-center gap-1.5 cursor-pointer transition-colors relative text-[13px] font-semibold ${
            uiStore.mode === tab.value ? "text-accent" : "text-text3 hover:text-text2"
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
          {uiStore.mode === tab.value && (
            <Box className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-t-sm" />
          )}
        </Box>
      ))}
    </Box>
  );
});

export default BottomTab;
