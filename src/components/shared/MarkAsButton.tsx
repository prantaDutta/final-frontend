import { laravelApi } from "../../utils/api";
import { isProduction } from "../../utils/constants";
import { trigger } from "swr";
import ReactLoader from "./ReactLoader";
import React, { useState } from "react";
import { useRouter } from "next/router";

interface MarkAsButtonProps {
  title: string;
  submitUrl: string;
  triggerUrl: string;
  returnRoute: string;
  classNames: string;
}

const MarkAsButton: React.FC<MarkAsButtonProps> = ({
  title,
  submitUrl,
  triggerUrl,
  returnRoute,
  classNames,
}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        setSubmitting(true);
        const { data } = await laravelApi().get(submitUrl);
        if (isProduction) console.log(data);
        setSubmitting(false);
        await trigger(triggerUrl);
        return router.push(returnRoute);
      }}
      className={`rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline
                  shadow-lg transition-css ${classNames}`}
    >
      {submitting ? <ReactLoader /> : title}
    </button>
  );
};

export default MarkAsButton;
