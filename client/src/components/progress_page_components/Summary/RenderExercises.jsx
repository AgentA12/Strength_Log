import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { Table } from "@mantine/core";
import { getOneRepMax } from "../../../utils/helpers/functions";

export default function RenderExercises({ summaryObj, summaryNum }) {
  return (
    <>
      <div className="w-fit whitespace-nowrap">
        {summaryNum === 0 ? (
          <Table>
            {summaryNum === 0 &&
              summaryObj?.exercises.map((exercise, i) => (
                <>
                  {exercise.exerciseName}
                  <Table>
                    <thead>
                      <tr>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>1RM</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{exercise.sets}</td>
                        <td>{exercise.reps}</td>
                        <td>{exercise.weight}</td>
                        <td>{getOneRepMax(exercise.weight, exercise.reps)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              ))}
          </Table>
        ) : (
          <>
            {summaryObj?.exercises.map((exercise, i) => (
              <>
                {i === 0 ? `Previous - ${summaryObj.dateCompleted}` : "---"}
                <Table>
                  <thead>
                    <tr>
                      <th>Weight</th>
                      <th>1RM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{exercise.weight}</td>
                      <td>{getOneRepMax(exercise.weight, exercise.reps)}</td>
                      <td>
                        {exercise.dif > 0 ? (
                          <span className="text-green-500 flex items-center gap-1">
                            <BiTrendingUp size={16} /> + {exercise.dif} Lbs
                          </span>
                        ) : exercise.dif < 0 ? (
                          <span className="text-red-500 flex items-center gap-1">
                            <BiTrendingDown size={16} /> {exercise.dif} Lbs
                          </span>
                        ) : (
                          "- no change"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
}
