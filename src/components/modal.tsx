import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
type ButtonVariant = 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';

type ModalProps = {
  triggerLabel: string;
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  triggerAsChild?: boolean;
  modalFooter?: boolean;
  triggerVariant?: ButtonVariant;
  dialogContentClassName?: string;
};

function Modal({
  triggerLabel,
  title,
  description,
  children,
  onSubmit,
  submitLabel,
  triggerAsChild = true,
  modalFooter,
  triggerVariant,
  dialogContentClassName
}: ModalProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild={triggerAsChild}>
          <Button variant={triggerVariant}>{triggerLabel}</Button>
        </DialogTrigger>
        <DialogContent className={dialogContentClassName}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">{children}</div>
          {modalFooter && (
            <DialogFooter>
              <div>
                <Button type="button" onClick={onSubmit}>
                  {submitLabel}
                </Button>
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Modal;
