import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { Table, Text } from "@mantine/core";
import { getOneRepMax } from "../../utils/helpers/functions";

export default function RenderExercises({ summaryObj, summaryNum }) {
  return (
    <>
      {summaryNum === 0 ? (
        <Table>
          {summaryNum === 0 &&
            summaryObj?.exercises.map((exercise, i) => (
              <>
                {exercise.name}
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
                        <Text>
                          <BiTrendingUp size={16} /> + {exercise.dif} Lbs
                        </Text>
                      ) : exercise.dif < 0 ? (
                        <Text>
                          <BiTrendingDown size={16} /> {exercise.dif} Lbs
                        </Text>
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
    </>
  );
}
