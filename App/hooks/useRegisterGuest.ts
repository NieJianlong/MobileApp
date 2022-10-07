import { useState } from "react";
import { createModel } from "hox";

interface RegisterProps {
  visibleRegister: boolean;
}
const useRegisterGuest = () => {
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

export default createModel(useRegisterGuest);
