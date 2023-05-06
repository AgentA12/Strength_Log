import WorkoutCalendar from "../components/workout_page_components/Calendar";
import WorkoutList from "../components/workout_page_components/WorkoutList";
import { Container, Pagination } from "@mantine/core";

export default function WorkoutPage() {
  return (
    <Container>
      <WorkoutCalendar />
      <WorkoutList />
      <Pagination total={10}  />
    </Container>
  );
}
