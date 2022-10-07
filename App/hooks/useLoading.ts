import { useCallback, useState } from "react";
import { createModel } from "hox";
interface LoadingProps {
  title?: string;
  show: boolean;
}
const useLoading = () => {
  const [loading, setLoading] = useState<LoadingProps>({
    show: false,
    title: "",
  });
  const showLoading = useCallback(() => {
    setLoading({ show: true });
  }, []);
  const hideLoading = useCallback(() => {
    setLoading({ show: false });
  }, []);
  const { show } = loading;
  return {
    show,
    loading,
    setLoading,
    showLoading,
    hideLoading,
  };
};
export default createModel(useLoading);
