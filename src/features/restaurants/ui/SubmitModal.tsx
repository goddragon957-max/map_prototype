import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Typography from "@/components/common/Typography";
import Button from "@/components/common/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    <Dialog open={uiStore.isSubmitModalOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader className="mb-5">
          <Box className="flex items-start justify-between gap-4">
            <Box>
              <Typography className="mb-1 text-[0.78rem] font-extrabold tracking-[0.12em] text-text3 uppercase">
                Submit
              </Typography>
              <DialogTitle className="text-2xl font-bold tracking-tight">식당 제보하기</DialogTitle>
            </Box>
            <Button
              type="button"
              variant="text"
              onClick={handleClose}
              className="h-10 w-10 min-w-0 rounded-full p-0 text-2xl text-text2 hover:text-text"
            >
              ×
            </Button>
          </Box>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <label className="col-span-2 grid gap-2 md:col-span-1">
            <Typography component="span" className="text-[12px] font-bold text-text2">
              식당명
            </Typography>
            <Input placeholder="예: 학교 앞 한식뷔페" />
          </label>
          <label className="col-span-2 grid gap-2 md:col-span-1">
            <Typography component="span" className="text-[12px] font-bold text-text2">
              지역
            </Typography>
            <Input placeholder="예: 성수 / 연남" />
          </label>
          <label className="col-span-2 grid gap-2">
            <Typography component="span" className="text-[12px] font-bold text-text2">
              가격대
            </Typography>
            <select
              defaultValue="7000"
              className="flex h-11 w-full rounded-2xl border border-input bg-card/80 px-4 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:border-accent2 focus-visible:ring-2 focus-visible:ring-accent2/25"
            >
              <option value="5000">5,000원 이하</option>
              <option value="7000">7,000원 이하</option>
              <option value="10000">10,000원 이하</option>
            </select>
          </label>
          <label className="col-span-2 grid gap-2">
            <Typography component="span" className="text-[12px] font-bold text-text2">
              메모
            </Typography>
            <Textarea
              rows={4}
              placeholder="대표 메뉴, 제보 날짜 등을 적어주세요."
              className="min-h-[132px]"
            />
          </label>

          <DialogFooter className="col-span-2 mt-2">
            <Button type="button" variant="text" onClick={handleClose} className="rounded-full px-6 text-text2">
              취소
            </Button>
            <Button type="submit" variant="contained" className="rounded-full bg-linear-to-br from-accent to-accent2 px-8 text-bg">
              제보하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default SubmitModal;
