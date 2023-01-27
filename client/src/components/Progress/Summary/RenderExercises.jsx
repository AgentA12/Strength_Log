import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { Table, Text, Title } from "@mantine/core";
import { getOneRepMax } from "../../../utils/helpers/functions";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Fragment } from "react";

// second table with just weight and rm and flex box them beside each other

export default function RenderExercises({ summaryObj, summaryNum }) {
  console.log(summaryObj);
  return (
    <>
      <div className="w-fit whitespace-nowrap">
        {summaryNum === 0 ? (
          <Table>
            {summaryNum === 0 &&
              summaryObj?.exercises.map((exercise) => (
                <Fragment>
                  <thead>
                    <Text size={"lg"} color="grape">
                      {exercise.exerciseName.toUpperCase()}
                    </Text>
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
                </Fragment>
              ))}
          </Table>
        ) : (
          <Table>
            {summaryObj?.exercises.map((exercise, i) => (
              <Fragment>
                <thead>
                  <div className="flex items-center gap-2">
                    <Text>
                      Previous{" "}
                      {i === 0 && <span>- {summaryObj.dateCompleted}</span>}{" "}
                    </Text>
                  </div>

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
                    <td>
                      {exercise.dif > 0 ? (
                        <span className="text-green-500 flex items-center gap-1">
                          <BiTrendingUp size={16} /> + {exercise.dif}
                        </span>
                      ) : exercise.dif < 0 ? (
                        <span className="text-red-500 flex items-center gap-1">
                          <BiTrendingDown size={16} /> {exercise.dif}
                        </span>
                      ) : null}
                    </td>
                  </tr>
                </tbody>
              </Fragment>
            ))}
          </Table>
        )}
      </div>
    </>
  );
}
