import React, { useEffect, useState } from "react";
import RoomAllocationItem from "./RoomAllocationItem";
import { RoomAllocationRoomValues } from "./type";

import "./RoomAllocation.css";

interface Props {
  guset: number;
  room: number;
  onChange: (result: RoomAllocationRoomValues[]) => void;
}
const RoomAllocation: React.FC<Props> = (props) => {
  const { room, guset, onChange } = props;
  const [value, setValue] = useState<RoomAllocationRoomValues[]>([]);
  useEffect(() => {
    const initValues = Array(room)
      .fill(0)
      .map<RoomAllocationRoomValues>(() => ({
        adult: 1,
        child: 0,
      }));
    setValue(initValues);
  }, [room]);

  const handleItemChange = (index: number) => {
    return (values: RoomAllocationRoomValues) => {
      const newValue = value.slice(0);
      newValue[index] = values;
      setValue(newValue);
      onChange(newValue);
    };
  };

  const totalAllocated = value.reduce(
    (prev, item) => prev + item.adult + item.child,
    0
  );
  const remaining = guset - totalAllocated;
  return (
    <div className="RoomAllocation-root" style={{ width: 400 }}>
      <div>{`住客人數: ${guset} / ${room}房`}</div>
      <div className="RoomAllocation-note">
        {`尚未分配人數: ${remaining}人`}
      </div>
      {value.map((item, index) => (
        <RoomAllocationItem
          key={index}
          value={item}
          onChange={handleItemChange(index)}
          remaining={remaining}
        />
      ))}
    </div>
  );
};
export default RoomAllocation;
