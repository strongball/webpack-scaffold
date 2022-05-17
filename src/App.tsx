import React, { useState } from "react";
import CustomInputNumber from "./components/CustomInputNumber";
import RoomAllocation from "./components/RoomAllocation";
import { RoomAllocationRoomValues } from "./components/RoomAllocation/type";
const App: React.FC<{}> = () => {
  const [value, setValue] = useState<RoomAllocationRoomValues[]>([]);
  const [number, setNumber] = useState<number>(0);

  return (
    <div style={{ display: "flex" }}>
      <div>
        {number}
        <CustomInputNumber
          name="test"
          min={-5}
          max={5}
          step={2}
          value={number}
          // disabled
          onChange={(e) => {
            setNumber(Number(e.target.value));
          }}
          onBlur={(e) => {
            alert(`blue: ${e.target.name}`);
          }}
        />
      </div>

      <RoomAllocation
        guset={10}
        room={3}
        onChange={(values) => console.log(values)}
      />
    </div>
  );
};

export default App;
