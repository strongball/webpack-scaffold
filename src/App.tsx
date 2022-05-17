import React, { useState } from "react";
import CustomInputNumber from "./components/CustomInputNumber";
const App: React.FC<{}> = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      {value}
      <CustomInputNumber
        name="test"
        max={5}
        step={2}
        value={value}
        // disabled
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
        onBlur={(e) => {
          console.log(e.target.name);
        }}
      />
    </div>
  );
};

export default App;
