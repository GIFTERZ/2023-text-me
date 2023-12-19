import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import Button from "../../common/button/Button";
import { WhiteLeftSquare } from "../../common/button/ButtonStyle";
import { HeaderLayout, LayoutSpan } from "../../styles/components/Layout";
import ArrowBackIcon from "./icons/ArrowBackIcon";

interface Props {
  children: ReactNode;
}

function BackHeader({ children }: Props) {
  const router = useRouter();
  return (
    <HeaderLayout>
      <Button
        Style={WhiteLeftSquare}
        props={{
          onClick: () => router.back(),
          "aria-label": "이전 페이지로 이동",
        }}
      >
        <ArrowBackIcon />
      </Button>
      {children}
      <LayoutSpan aria-hidden />
    </HeaderLayout>
  );
}

export default BackHeader;
