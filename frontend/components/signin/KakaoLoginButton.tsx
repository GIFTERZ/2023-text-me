import React, { useEffect, useState } from "react";
import Button from "../../common/button/Button";
import { Kakao } from "../../common/button/ButtonStyle";
import { Icon } from "@iconify/react";
import { useKakaoLogin } from "../../stores/useKakaoLogin";

const KAKAO_AUTH_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth/kakao`;

function KakaoLoginButton() {
  const { getKakaoToken } = useKakaoLogin();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      getKakaoToken({ code });
    }
  }, []);

  const onKakaoClick = () => {
    location.href = KAKAO_AUTH_URL;
  };

  return (
    <Button props={{ onClick: onKakaoClick }} Style={Kakao}>
      <Icon icon="bxs:message-rounded" color="black" aria-hidden />
      <span>카카오 로그인</span>
      <span aria-hidden></span>
    </Button>
  );
}

export default KakaoLoginButton;
