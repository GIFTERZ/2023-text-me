import { useRouter } from "next/navigation";
import React, { MouseEventHandler, ReactNode } from "react";
import Button from "../../common/button/Button";
import { WhiteLeftSquare } from "../../common/button/ButtonStyle";
import { HeaderLayout, LayoutSpan } from "../../styles/components/Layout";
import ArrowBackIcon from "./icons/ArrowBackIcon";

interface Props {
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

function BackHeader({ onBackClick, children }: Props) {
  const router = useRouter();
  return (
    <HeaderLayout>
      <Button
        Style={WhiteLeftSquare}
        props={{
          onClick: onBackClick ? onBackClick : () => router.back(),
          "aria-label": "이전 페이지로 이동",
        }}
      >
        <ArrowBackIcon />
      </Button>
      {children}
      {React.Children.count(children) == 1 && <LayoutSpan aria-hidden />}
    </HeaderLayout>
  );
}

export default BackHeader;
