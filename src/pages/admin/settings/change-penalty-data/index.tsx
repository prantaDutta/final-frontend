import { withIronSession } from "next-iron-session";
import React, { FormEvent, useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../../../components/shared/FullWidthReactLoader";
import SomeTable from "../../../../components/shared/SomeTable";
import { penaltyDataStates } from "../../../../states/settingsStates";
import { laravelApi } from "../../../../utils/api";
import { NEXT_IRON_SESSION_CONFIG } from "../../../../utils/constants";
import {
  divideAnArrayIntoMultipleParts,
  redirectToPage,
} from "../../../../utils/functions";
import { ModifiedUserData } from "../../../../utils/randomTypes";
import { notify } from "../../../../utils/toasts";

interface ChangePenaltyDataProps {
  user: ModifiedUserData;
}

const ChangePenaltyData: React.FC<ChangePenaltyDataProps> = ({ user }) => {
  const { data } = useSWR("/admin/get-penalty-data");
  const [penaltyDataValue, setPenalyData] = useRecoilState(penaltyDataStates);
  useEffect(() => {
    if (data) {
      setPenalyData(data.penaltyData);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await laravelApi().post("/admin/update-penalty-data", {
        penaltyData: penaltyDataValue,
      });
      notify("Penalty Data Successfully Updated", {
        type: "success",
      });
    } catch (e) {
      notify("Somthing went Wrong. Please Try Again", {
        type: "error",
      });
    }
  };
  return (
    <DashboardLayout data={user}>
      <DashboardTitle backButton={true} title="Change Penalty Data" />
      {penaltyDataValue ? (
        <form onSubmit={handleSubmit}>
          <div className="flex mt-5">
            <SomeTable
              data={divideAnArrayIntoMultipleParts(data.penaltyData, 3)[0]}
            />
            <SomeTable
              data={divideAnArrayIntoMultipleParts(data.penaltyData, 3)[1]}
            />
            <SomeTable
              data={divideAnArrayIntoMultipleParts(data.penaltyData, 3)[2]}
            />
          </div>
          <button className="edit-btn ml-4" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get("user");
  if (!user) {
    await redirectToPage(req, res, "/login");
    return { props: {} };
  }

  return {
    props: { user },
  };
}, NEXT_IRON_SESSION_CONFIG);

export default ChangePenaltyData;
