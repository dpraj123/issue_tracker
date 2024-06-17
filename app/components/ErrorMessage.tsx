import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text as="p" className="text-red-500">
      {children}
    </Text>
  );
};

export default ErrorMessage;
