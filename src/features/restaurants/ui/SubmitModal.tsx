import React from "react";
import { observer } from "mobx-react-lite";
import { Dialog, DialogContent, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Button from "@/components/common/Button";
import { uiStore } from "@/store/uiStore";
import { toastStore } from "@/store/toastStore";

const SubmitModal = observer(() => {
  const handleClose = () => uiStore.setSubmitModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClose();
    toastStore.addToast({ message: "식당 제보가 성공적으로 접수되었습니다. 검토 후 반영됩니다.", severity: "success" });
  };

  return (
    <Dialog 
      open={uiStore.isSubmitModalOpen} 
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 6,
          p: 2,
          bgcolor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(20px)",
        }
      }}
    >
      <DialogContent>
        <Box className="flex items-center justify-between mb-4">
          <Box>
            <Typography className="text-[0.78rem] font-extrabold text-slate-400 tracking-[0.12em] uppercase mb-1">Submit</Typography>
            <Typography variant="h2" className="text-2xl font-bold tracking-tight">식당 제보하기</Typography>
          </Box>
          <Button onClick={handleClose} className="min-w-0 w-10 h-10 rounded-full text-2xl p-0">×</Button>
        </Box>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Box className="col-span-2 md:col-span-1">
            <TextField fullWidth label="식당명" placeholder="예: 학교 앞 한식뷔페" variant="outlined" margin="dense" />
          </Box>
          <Box className="col-span-2 md:col-span-1">
            <TextField fullWidth label="지역" placeholder="예: 성수 / 연남" variant="outlined" margin="dense" />
          </Box>
          <Box className="col-span-2">
            <FormControl fullWidth margin="dense">
              <InputLabel>가격대</InputLabel>
              <Select label="가격대" defaultValue="7000">
                <MenuItem value="5000">5,000원 이하</MenuItem>
                <MenuItem value="7000">7,000원 이하</MenuItem>
                <MenuItem value="10000">10,000원 이하</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="col-span-2">
            <TextField
              fullWidth
              multiline
              rows={4}
              label="메모"
              placeholder="대표 메뉴, 제보 날짜 등을 적어주세요."
              variant="outlined"
              margin="dense"
            />
          </Box>

          <Box className="col-span-2 flex justify-end gap-3 mt-4">
            <Button variant="text" onClick={handleClose} className="rounded-full px-6 text-slate-500">취소</Button>
            <Button type="submit" variant="contained" className="rounded-full px-8 bg-slate-800 text-white">제보하기</Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default SubmitModal;
