import clsx from "clsx";
import React, { useImperativeHandle, useRef } from "react";
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

    const triggerChange = (direct: 1 | -1) => {
      if (innerRef.current && !disabled) {
        // innerRef.current.focus();
        const oldValue = Number.isNaN(Number(innerRef.current.value))
          ? 0
          : Number(innerRef.current.value);
        const newValue = Math.min(Math.max(min, oldValue + direct * step), max)
        innerRef.current.value = String(newValue);
        onChange &&
          onChange({
            target: innerRef.current,
          } as any);
      }
    };
    const triggerBlur = () => {
      onChange &&
        onChange({
          target: innerRef.current,
        } as any);
    };
    const innerValue = value || Number(innerRef.current?.value);
    return (
      <div className="number-root">
        <div
          className={clsx("number-item number-btn", {
            disabled: disabled || innerValue <= min,
          })}
          tabIndex={1}
          onClick={() => triggerChange(-1)}
        >
          -
        </div>
        <div>
          <input
            ref={innerRef}
            value={value?.toString()}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={clsx("number-item number-input", {
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
          className={clsx("number-item number-btn", {
            disabled: disabled || innerValue >= max,
          })}
          tabIndex={2}
          onClick={() => triggerChange(1)}
        >
          +
        </div>
      </div>
    );
  }
);
export default CustomInputNumber;
