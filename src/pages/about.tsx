import { withIronSession } from "next-iron-session";
import Layout from "../components/layouts/Layout";
import { NEXT_IRON_SESSION_CONFIG } from "../utils/constants";
import { ModifiedUserData } from "../utils/randomTypes";

interface aboutProps {
  user: ModifiedUserData;
}

const about: React.FC<aboutProps> = ({ user }) => {
  return (
    <Layout data={user}>
      <div className="text-center text-gray-600">
        <h2 className="text-4xl font-bold">About GrayScale</h2>
        <div className="bg-white mt-10 md:mx-56">
          <p className="p-2">
            GrayScale is one of the fastest growing peer to peer (P2P) lending
            platforms in Bangladesh. It connects investors or lenders looking
            for high returns with creditworthy borrowers looking for short term
            personal loans.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withIronSession(async ({ req }) => {
  const user = req.session.get("user");
  if (!user) {
    return { props: {} };
  }

  return {
    props: { user },
  };
}, NEXT_IRON_SESSION_CONFIG);

export default about;
