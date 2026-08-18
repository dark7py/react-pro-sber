import {
  cloneElement,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import styles from "./Tooltip.module.scss";
import type { TooltipPosition, Position } from "./TooltipPosition";

type TooltipProps = {
  content: ReactNode;
  children: ReactElement;
  placement?: TooltipPosition;
  gap?: number;
};

const VIEWPORT_PADDING = 8;

export const Tooltip = ({
  content,
  children,
  placement = "top",
  gap = 8,
}: TooltipProps) => {
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
  });

  const calculatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;

    if (!trigger || !tooltip) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const availableSpace = {
      top: triggerRect.top,
      bottom: viewportHeight - triggerRect.bottom,
      left: triggerRect.left,
      right: viewportWidth - triggerRect.right,
    };

    let actualPlacement = placement;

    if (
      placement === "top" &&
      availableSpace.top < tooltipRect.height + gap &&
      availableSpace.bottom > tooltipRect.height + gap
    ) {
      actualPlacement = "bottom";
    }

    if (
      placement === "bottom" &&
      availableSpace.bottom < tooltipRect.height + gap &&
      availableSpace.top > tooltipRect.height + gap
    ) {
      actualPlacement = "top";
    }

    if (
      placement === "left" &&
      availableSpace.left < tooltipRect.width + gap &&
      availableSpace.right > tooltipRect.width + gap
    ) {
      actualPlacement = "right";
    }

    if (
      placement === "right" &&
      availableSpace.right < tooltipRect.width + gap &&
      availableSpace.left > tooltipRect.width + gap
    ) {
      actualPlacement = "left";
    }

    let top = 0;
    let left = 0;

    switch (actualPlacement) {
      case "top":
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;

      case "bottom":
        top = triggerRect.bottom + gap;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;

      case "left":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;

      case "right":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + gap;
        break;
    }

    left = Math.max(
      VIEWPORT_PADDING,
      Math.min(left, viewportWidth - tooltipRect.width - VIEWPORT_PADDING),
    );

    top = Math.max(
      VIEWPORT_PADDING,
      Math.min(top, viewportHeight - tooltipRect.height - VIEWPORT_PADDING),
    );

    setPosition({
      top,
      left,
    });
  }, [placement, gap]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    calculatePosition();

    const handleScroll = () => {
      calculatePosition();
    };

    const handleResize = () => {
      calculatePosition();
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [visible, calculatePosition]);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  // eslint-disable-next-line react-hooks/refs
  const trigger = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  });

  const tooltipRoot = document.getElementById("tooltip-root");

  if (!tooltipRoot) {
    return trigger;
  }

  return (
    <>
      {trigger}

      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={styles.tooltip}
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {content}
          </div>,
          tooltipRoot,
        )}
    </>
  );
};
