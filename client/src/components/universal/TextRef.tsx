import React from "react";
import { motion } from "framer-motion";
import { Text } from "@mantine/core";

type Props = { children?: React.ReactNode };

const TextRef = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <Text ref={ref}>{props.children}</Text>;
});

export default motion(TextRef);