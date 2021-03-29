interface SingleTableRowProps {
  tdClass?: string;
  d0: string;
  d1: string;
  i: number;
}

const SingleTableRow: React.FC<SingleTableRowProps> = ({
  d0,
  d1,
  i,
  tdClass = "font-semibold border px-8 py-3 capitalize",
}) => {
  return (
    <tr className={`${i % 2 !== 0 && "bg-gray-300"}`}>
      <td className={tdClass}>{d0}</td>
      <td className={tdClass}>{d1.toString()}</td>
    </tr>
  );
};

export default SingleTableRow;
