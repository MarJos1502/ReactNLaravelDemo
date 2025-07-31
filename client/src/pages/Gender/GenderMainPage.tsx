import { useEffect } from "react";
import AddGenderForm from "./components/AddGenderForm";
import GenderList from "./components/GenderList";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { useToastMessage } from "../../hooks/useToastMessage";
import { useRefresh } from "../../hooks/useRefresf";

const GenderMainPage = () => {
  const {
    message: toastMessage,
    isVisible: toustMessageIsVisible,
    showToastMessage,
    closeToastMessage,
  } = useToastMessage("", false);

  const { refresh, handleRefresh } = useRefresh(false);

  useEffect(() => {
    document.title = "Gender Main Page";
  }, []);
  return (
    <>
      <ToastMessage
        message={toastMessage}
        isVisible={toustMessageIsVisible}
        onClose={closeToastMessage}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <AddGenderForm
            onGenderAdded={showToastMessage}
            refreshKey={handleRefresh}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <GenderList refreshKey={refresh} />
        </div>
      </div>
    </>
  );
};

export default GenderMainPage;
