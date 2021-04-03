import { useRecoilState } from "recoil";
import { penaltyDataStates } from "../../states/settingsStates";
import { PenaltyData } from "../../utils/randomTypes";

interface TableRowProps {
  day: number;
  amount: number;
}

const TableRow: React.FC<TableRowProps> = ({ day, amount }) => {
  const [penaltyDataValue, setPenaltyData] = useRecoilState(penaltyDataStates);
  return (
    <tr className="w-full border-b-2 border-primary">
      <td className="border-primary border-r-2 w-1/2">{day}</td>
      <td className="w-1/2">
        <input
          className="w-full bg-transparent text-center focus:outline-none focus:ring-0"
          type="number"
          defaultValue={amount}
          onChange={(e) => {
            setPenaltyData(
              editThisArray(penaltyDataValue, day, +e.target.value)
            );
            // console.log("penalty data: ", penaltyDataValue);
          }}
        />
      </td>
    </tr>
  );
};

export default TableRow;

const editThisArray = (
  arr: PenaltyData[] | null,
  day: number,
  amount: number
) => {
  let newArr: PenaltyData[] = [];

  arr?.map((ar) => {
    if (ar.day === day) {
      newArr.push({
        day,
        amount,
      });
    } else {
      newArr.push(ar);
    }
  });

  return newArr;
};
