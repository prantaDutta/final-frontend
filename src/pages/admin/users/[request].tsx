import { ThreeDots } from "@agney/react-loading";
import { withIronSession } from "next-iron-session";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import MarkAsButton from "../../../components/shared/MarkAsButton";
import ReactLoader from "../../../components/shared/ReactLoader";
import { BASE_URL, NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { verificationRequestTableHeader } from "../../../utils/constantsArray";
import {
  downloadImage,
  isObject,
  objectToArray,
  redirectToPage,
} from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";

interface ShowMultipleImageProps {
  photo: Array<any>;
}

// This component shows multiple images mainly bank account statements
const ShowMultipleImage: React.FC<ShowMultipleImageProps> = ({ photo }) => {
  const statements = (photo[1] as any).split("#");
  statements.splice(-1, 1);
  statements.map((statement: string) => {
    return (
      <ShowImage
        key={statement}
        name="BankAccount Statements"
        url={statement}
      />
    );
  });
  return <></>;
};

interface ShowImageProps {
  name: string;
  url: string;
}

// This component shows single component
const ShowImage: React.FC<ShowImageProps> = ({ name, url }) => {
  return (
    <tr key={name}>
      <td className="font-semibold border px-8 py-4 capitalize">{name}</td>
      <td className="font-semibold border px-8 py-4">
        <Image
          height="100"
          width="100"
          className=""
          alt={name}
          src={`/uploads/verificationPapers/${url}`}
        />
        <span
          onClick={() =>
            downloadImage(
              BASE_URL + `/uploads/verificationPapers/${url}`,
              url as string
            )
          }
          className="text-md block text-primary cursor-pointer"
        >
          Download Image
        </span>
      </td>
    </tr>
  );
};

interface requestProps {
  user: ModifiedUserData;
  requestedUserId: string;
}

const request: React.FC<requestProps> = ({ user, requestedUserId }) => {
  const [mounted, useMounted] = useState<boolean>(false);
  useEffect(() => useMounted(true), []);
  let { data, isValidating } = useSWR(
    mounted ? `/admin/user/${requestedUserId}` : null
  );
  let photos;
  if (data) {
    const { verification } = data;
    // parsing the verification data
    // because laravel sends them as json string
    const jsonPhotos = JSON.parse(verification?.verificationPhotos);
    // converting object to an array
    photos = Object.entries(jsonPhotos);
    // working with bankAccountStatements
    // as there are multiple pictures of bankStatements
    const bankStatements = jsonPhotos?.bankAccountStatements;
    // deleting bankAccountStatements from photos
    // as we are processing bankAccountStatements separately
    delete (photos as any)?.bankAccountStatements;
    // getting three pictures url from one bankStatements
    let statementsArray = bankStatements ? bankStatements.split("#") : null;
    // pushing them to the photos array
    if (statementsArray) {
      statementsArray.splice(-1, 1);
      statementsArray.map((state: any, i: number) => {
        photos?.push(["bankAccountStatements " + (i + 1).toString(), state]);
      });
    }
  }
  const id = data?.pendingUser?.id;
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between text-gray-900">
        <h1 className="text-3xl font-bold">Verification Check</h1>
        <MarkAsButton
          title="Mark As Verified"
          submitUrl={`/admin/user/verified/${id}`}
          triggerUrl={`/admin/users`}
          returnRoute={`/admin/users`}
          classNames="bg-primary text-white p-3 w-1/4 hover:bg-primaryAccent"
        />
        <MarkAsButton
          title="Mark As Unverified"
          submitUrl={`/admin/user/unverified/${id}`}
          triggerUrl={`/admin/users`}
          returnRoute={`/admin/users`}
          classNames="bg-red-600 text-white p-3 w-1/4 hover:bg-red-800"
        />
      </div>

      {isValidating && !data ? (
        <button
          className="bg-transparent text-primary p-3 mt-5 w-full tracking-wide
                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                    shadow-lg transition-css"
        >
          <ReactLoader component={<ThreeDots width="50" />} />
        </button>
      ) : (
        <table className="w-full shadow-lg bg-white text-center mt-5">
          <thead>
            <tr>
              {verificationRequestTableHeader.map((header: string) => (
                <th
                  key={header}
                  className="bg-primary font-semibold border px-8 py-4 text-white capitalize"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data &&
              objectToArray(data.pendingUser).map((d) => {
                if (isObject(d[1])) {
                  return null;
                }
                return (
                  <tr key={d[0]}>
                    <td className="font-semibold border px-8 py-4 capitalize">
                      {d[0]}
                    </td>
                    <td className="font-semibold border px-8 py-4 capitalize">
                      {d[1].toString()}
                    </td>
                  </tr>
                );
              })}

            {data &&
              objectToArray(data.verification).map((d) => {
                if (d[0] === "verificationPhotos") {
                  return null;
                }
                return (
                  <tr key={d[0]}>
                    <td className="font-semibold border px-8 py-4 capitalize">
                      {d[0]}
                    </td>
                    <td className="font-semibold border px-8 py-4 capitalize">
                      {d[1]}
                    </td>
                  </tr>
                );
              })}

            {photos &&
              photos.map((photo) => {
                if (photo[0] === "bankAccountStatements") {
                  return (
                    <ShowMultipleImage
                      key={new Date().toString()}
                      photo={photo}
                    />
                  );
                } else {
                  return (
                    <ShowImage
                      key={photo as any}
                      name={photo[0]}
                      url={(photo as any)[1]}
                    />
                  );
                }
              })}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res, query }) => {
    const user = req.session.get("user");
    if (!user) {
      await redirectToPage(req, res, "/login");
      return { props: {} };
    }

    const requestedUserId: any = query.request;
    return {
      props: { user, requestedUserId },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default request;
