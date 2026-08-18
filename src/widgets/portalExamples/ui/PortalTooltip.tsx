import { Tooltip } from "shared/ui/Tooltip";

export const PortalTooltip = () => {
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
    </div>
  );
};
