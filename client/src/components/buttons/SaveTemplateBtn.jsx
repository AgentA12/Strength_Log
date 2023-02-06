import { Button } from "@mantine/core";
export default function SaveTemplateBtn({ handleSubmit, loading }) {
  return (
    <Button  loading={loading} variant="outline" color={"grape"} onClick={handleSubmit}>
      Save Template
    </Button>
  );
}
