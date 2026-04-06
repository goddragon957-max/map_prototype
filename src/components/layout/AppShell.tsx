import React from "react";
import Box from "@/components/common/Box";

interface Props {
  children: React.ReactNode;
}

const AppShell = ({ children }: Props) => {
  return (
    <Box className="h-screen w-full relative overflow-hidden bg-[#f1f5fb] selection:bg-blue-100/50">
      {/* 
        Note: The background map will be rendered by KakaoMapBackground
        inside the page, occupying the fixed inset-0 layer.
      */}
      
      {/* Noise Texture Overlay (Optional, but kept for prototype vibe) */}
      <Box 
        className="fixed inset-0 pointer-events-none z-[1] opacity-40 mix-blend-overlay noise-bg" 
        aria-hidden="true" 
      />

      {/* 
        Main content layer: 
        Unlike the previous version, we don't use a max-width container here
        because panels are floating independently on the map.
      */}
      <Box className="relative h-full w-full z-10 pointer-events-none">
        {/* Pointer events are disabled for the container, 
            but will be re-enabled for individual panels inside it. */}
        {children}
      </Box>
    </Box>
  );
};

export default AppShell;
