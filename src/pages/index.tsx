import { withIronSession } from "next-iron-session";
import Introduction from "../components/indexPage/introduction";
import ProvideBorrowers from "../components/indexPage/provideBorrowers";
import ProvideInvestors from "../components/indexPage/provideInvestors";
import Sponsors from "../components/indexPage/sponsors";
import UpperFooter from "../components/indexPage/upperFooter";
import Layout from "../components/layouts/Layout";
import { NEXT_IRON_SESSION_CONFIG } from "../utils/constants";
import { ModifiedUserData } from "../utils/randomTypes";
import MobileApp from "./../components/indexPage/mobileApp";

// This is the home page
// the components of this page are in the components folder
interface IndexProps {
  user: ModifiedUserData;
}

const Index: React.FC<IndexProps> = ({ user }) => {
  return (
    <Layout data={user}>
      <Introduction />
      <ProvideInvestors />
      <ProvideBorrowers />
      <Sponsors />
      <MobileApp />
      <UpperFooter />

      {/* <hr className="border-gray-700 border-t" /> */}
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

export default Index;
