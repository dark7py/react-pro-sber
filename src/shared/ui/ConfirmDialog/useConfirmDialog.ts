import { useState, useCallback, useRef } from "react";

interface DialogOptions {
  title: string;
  description: string;
}

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<DialogOptions>({
    title: "",
    description: "",
  });

  // Ref для хранения функций resolve из Promise
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const showConfirmDialog = useCallback(
    (config: DialogOptions): Promise<boolean> => {
      setOptions(config);
      setIsOpen(true);

      return new Promise<boolean>((resolve) => {
        resolveRef.current = resolve;
      });
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }
  }, []);

  return {
    showConfirmDialog,
    dialogProps: {
      isOpen,
      title: options.title,
      description: options.description,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
    },
  };
};
