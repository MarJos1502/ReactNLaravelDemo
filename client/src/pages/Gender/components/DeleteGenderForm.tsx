import { useEffect, useState, type FormEvent } from "react";
import BackButton from "../../../components/Button/BackButton";
import SubmitButton from "../../../components/Button/SubmitButton";
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput";
import { useNavigate, useParams } from "react-router-dom";
import GenderService from "../../../services/GenderService";
import Spinner from "../../../components/Spinner/Spinner";

const DeleteGenderForm = () => {
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingDestroy, setLoadingDestroy] = useState(false);
  const [gender, setGender] = useState("");

  const { gender_id } = useParams();
  const navigate = useNavigate();

  const handleGetGender = async (genderId: string | number) => {
    try {
      setLoadingGet(true);
      const res = await GenderService.getGender(genderId);

      if (res.status === 200) {
        setGender(res.data.gender.gender);
      } else {
        console.error(
          "Unexpected error occurred during getting gender: ",
          res.data
        );
      }
    } catch (error) {
      console.error(
        "Unexpected server error occurred during getting gender: ",
        error
      );
    } finally {
      setLoadingGet(false);
    }
  };

  const handleDestroyGender = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoadingDestroy(true);

      const res = await GenderService.destroyGender(gender_id!);

      if (res.status === 200) {
        setGender("");
        navigate("/", { state: { message: res.data.message } });
      } else {
        console.error(
          "Unexpected error occurred during deleting gender: ",
          res.status
        );
      }
    } catch (error) {
      console.error(
        "Unexpected server error occurred during deleting gender: ",
        error
      );
    } finally {
      setLoadingDestroy(false);
    }
  };

  useEffect(() => {
    if (gender_id) {
      const parseGenderId = parseInt(gender_id);
      handleGetGender(parseGenderId);
    } else {
      console.error(
        "Unexpected parameter error occurred during getting gender:",
        gender_id
      );
    }
  }, [gender_id]);

  return (
    <>
      {loadingGet ? (
        <div className="flex justify-center items-center mt-52">
          <Spinner size="lg" />
        </div>
      ) : (
        <form onSubmit={handleDestroyGender}>
          <div className="mb-4">
            <FloatingLabelInput
              label="Gender"
              type="text"
              name="gender"
              value={gender}
              readOnly
            />
          </div>
          <div className="flex justify-end gap-2">
            {!loadingDestroy && <BackButton label="Back" path="/" />}
            <SubmitButton
              label="Delete Gender"
              className="bg-red-600 hover:bg-red-700"
              loading={loadingDestroy}
              loadingLabel="Deleting Gender..."
            />
          </div>
        </form>
      )}
    </>
  );
};

export default DeleteGenderForm;
