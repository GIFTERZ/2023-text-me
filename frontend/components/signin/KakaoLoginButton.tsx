import React, { useEffect } from "react";
import Button from "../../common/button/Button";
import { Kakao } from "../../common/button/ButtonStyle";
import { Icon } from "@iconify/react";
import { useKakaoLogin } from "../../stores/useKakaoLogin";

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY;
const KAKAO_REDIRECT_URI = `${process.env.NEXT_PUBLIC_SERVICE_URL}/signin`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

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
