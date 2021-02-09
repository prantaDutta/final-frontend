import React, { useState } from "react";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import { laravelApi } from "../../utils/api";
import { isProduction } from "../../utils/constants";
import { trigger } from "swr";

interface SaveCancelButtonProps {
  setField: React.Dispatch<React.SetStateAction<boolean>>;
  submitUrl: string;
  postData: {};
  triggerUrl: string;
}

const SaveCancelButton: React.FC<SaveCancelButtonProps> = ({
  setField,
  submitUrl,
  postData,
  triggerUrl,
}) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  return isSubmitting ? (
    <FullWidthReactLoader />
  ) : (
    <div className="flex justify-end my-4">
      <button
        onClick={() => setField(false)}
        className="px-4 mx-2 bg-red-700 text-white w-1/5 py-2 rounded-lg font-semibold focus:ring-1 focus:outline-none focus:ring-primary"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={async () => {
          setSubmitting(true);
          const { data } = await laravelApi().post(submitUrl, postData);
          if (!isProduction) console.log("data: ", data);
          await trigger(triggerUrl);
          setSubmitting(false);
        }}
        className="px-4 ml-2 bg-primary text-white w-1/5 py-2 rounded-lg font-semibold focus:ring-1 focus:outline-none focus:ring-primaryAccent"
      >
        Save
      </button>
    </div>
  );
};

export default SaveCancelButton;
