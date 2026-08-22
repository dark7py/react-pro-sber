import { ConfirmDialog, useConfirmDialog } from "shared/ui/ConfirmDialog";
import { Tooltip } from "shared/ui/Tooltip";

export const PortalShowcase = () => {
  const { showConfirmDialog, dialogProps } = useConfirmDialog();

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog({
      title: "Удалить элемент?",
      description: "Это действие необратимо.",
    });

    if (confirmed) {
      // deleteItem();
      console.log("Подтверждено удаление");
    }
  };

  return (
    <div>
      adkflsafdkl ajdsfksj sjdfj skdfmksf
      <Tooltip
        placement="right"
        content={
          <div>
            <strong>Подсказка</strong>
            <div>Дополнительная информация</div>
          </div>
        }
      >
        <span>Наведи на меня</span>
      </Tooltip>
      <div style={{ display: "flex", gap: "4px" }}>
        <Tooltip placement="right" content="Подсказка">
          <div>Наведи на меня</div>
        </Tooltip>
        <button onClick={() => console.log("click btn")}>button</button>
      </div>
      <div
        onMouseEnter={() => {
          console.log("parent mouse enter");
        }}
      >
        <Tooltip content="Подсказка">
          <button>Наведи на меня</button>
        </Tooltip>
      </div>
      <h3>confirm dialog</h3>
      <button type="button" onClick={handleDelete}>
        Нажми для открытия диалогового окна
      </button>
      <ConfirmDialog {...dialogProps} />
    </div>
  );
};
