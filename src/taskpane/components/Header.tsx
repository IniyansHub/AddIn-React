import { Stack } from "@fluentui/react";
import React from "react";

export interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <Stack.Item>
        <img src="assets/logo-filled.png" alt={title} width={100} height={100} />
      </Stack.Item>
    </>
  );
};

export default Header;
