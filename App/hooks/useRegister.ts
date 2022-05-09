import { useState } from "react";
import { createModel } from "hox";

interface RegisterProps {
  visibleRegister: boolean;
}
const useRegister = () => {
  const [register, setRegister] = useState<RegisterProps>({
    visibleRegister: false,
  });
  const { visibleRegister } = register;
  return {
    visibleRegister,
    register,
    setRegister,
  };
};

export default createModel(useRegister);
