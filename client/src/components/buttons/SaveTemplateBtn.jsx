import { Button } from "@mantine/core";
export default function SaveTemplateBtn({ handleSubmit }) {
  return (
    <Button variant="outline" color={"grape"} onClick={handleSubmit}>
      Save Template
    </Button>
  );
}
