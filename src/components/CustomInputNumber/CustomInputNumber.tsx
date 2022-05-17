import clsx from "clsx";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/clickOutside";
import "./CustomInputNumber.css";

interface Props {
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  value?: number;
  disabled?: boolean;
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  onBlur?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}
const CustomInputNumber = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      step = 1,
      name,
      min = -Infinity,
      max = Infinity,
      onChange,
      onBlur,
      disabled,
      ...props
    },
    ref
  ) => {
    const { value } = props;
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current!);
    const innerValue = value ?? Number(innerRef.current?.value);

    /**
     * change event
     */
    const stepChange = (direct: 1 | -1) => {
      if (innerRef.current && !disabled) {
        // innerRef.current.focus();
        const oldValue = Number.isNaN(Number(innerRef.current.value))
          ? 0
          : Number(innerRef.current.value);
        const newValue = Math.min(Math.max(min, oldValue + direct * step), max);
        triggerChange(newValue);
      }
    };
    const triggerChange = (newValue: number) => {
      if (innerRef.current && !disabled) {
        innerRef.current.value = String(newValue);
        onChange &&
          onChange({
            target: innerRef.current,
          } as any);
        triggerBlur();
      }
    };

    /**
     * focus / blur
     */
    const [focus, setFocus] = useState(false);
    const triggerBlur = () => {
      if (focus) {
        setFocus(false);
        onBlur &&
          onBlur({
            target: innerRef.current,
          } as any);
      }
    };
    const focusDiv = () => {
      setFocus(true);
    };
    const focusRef = useClickOutside(triggerBlur);

    return (
      <div ref={focusRef} className="Number-root" onClick={focusDiv}>
        <div
          className={clsx("Number-item Number-btn", {
            disabled: disabled || innerValue <= min,
          })}
          tabIndex={1}
          onClick={() => stepChange(-1)}
        >
          -
        </div>
        <div>
          <input
            ref={innerRef}
            value={value?.toString()}
            onChange={onChange}
            disabled={disabled}
            className={clsx("Number-item Number-input", {
              focus: focus,
              disabled: disabled,
            })}
            type="number"
            name={name}
            min={min}
            max={max}
            step={step}
          />
        </div>
        <div
          className={clsx("Number-item Number-btn", {
            disabled: disabled || innerValue >= max,
          })}
          tabIndex={2}
          onClick={() => stepChange(1)}
        >
          +
        </div>
      </div>
    );
  }
);
export default CustomInputNumber;
