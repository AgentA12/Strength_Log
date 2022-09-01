import { useQuery } from "@apollo/client";
import { GET_EXERCISE } from "./utils/graphql/queries";

export default function App() {
  const { loading, error, data } = useQuery(GET_EXERCISE);

  if (data) console.log(data);

  if (loading) {
  }

  if (error) {
  }

  return <>hello world</>;
}
