import React from "react";
import CustomInputNumber from "../CustomInputNumber";
import { RoomAllocationRoomValues } from "./type";

import "./RoomAllocationItem.css";

interface Props {
  value: RoomAllocationRoomValues;
  onChange: (data: RoomAllocationRoomValues) => void;
  remaining: number;
  roomSize?: number;
}
const RoomAllocationItem: React.FC<Props> = (props) => {
  const { roomSize = 4, remaining, value, onChange } = props;
  const roomTotal = value.adult + value.child;
  const roomRemaining = roomSize - roomTotal;
  const maxAddAble = Math.min(roomRemaining, remaining);
  return (
    <div className="RoomAllocationItem-root">
      <div className="RoomAllocationItem-title">{`房間: ${roomTotal}人`}</div>
      <div className="RoomAllocationItem-picker">
        <div className="RoomAllocationItem-picker-label">
          大人
          <br />
          <small>年齡20+</small>
        </div>
        <CustomInputNumber
          min={1}
          max={maxAddAble + value.adult}
          value={value.adult}
          onChange={(e) =>
            e.target.value !== "" &&
            onChange &&
            onChange({
              ...value,
              adult: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="RoomAllocationItem-picker">
        <div className="RoomAllocationItem-picker-label">小孩</div>
        <CustomInputNumber
          min={0}
          max={maxAddAble + value.child}
          value={value.child}
          onChange={(e) =>
            e.target.value !== "" &&
            onChange &&
            onChange({
              ...value,
              child: Number(e.target.value),
            })
          }
        />
      </div>
    </div>
  );
};
export default RoomAllocationItem;
