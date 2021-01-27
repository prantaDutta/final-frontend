interface DashboardContentProps {}

const DashboardContent: React.FC<DashboardContentProps> = ({}) => {
  return (
    <div className="">
      <h4 className="font-bold text-3xl">Recent Loans</h4>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="w-1/2 ...">Title</th>
            <th className="w-1/4 ...">Author</th>
            <th className="w-1/4 ...">Views</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Intro to CSS</td>
            <td>Adam</td>
            <td>858</td>
          </tr>
          <tr>
            <td>
              A Long and Winding Tour of the History of UI Frameworks and Tools
              and the Impact on Design
            </td>
            <td>Adam</td>
            <td>112</td>
          </tr>
          <tr>
            <td>Intro to JavaScript</td>
            <td>Chris</td>
            <td>1,280</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardContent;
