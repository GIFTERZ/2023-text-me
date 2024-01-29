import Image from "next/image";
import React from "react";
import Button from "../common/button/Button";
import { GreenRightCorner, Kakao } from "../common/button/ButtonStyle";

function pay() {
  return (
    <div>
      <h2>우편비를 결제해주세요.</h2>
      우편은 엽서로 배송되므로 소정의 우편비가 발생합니다. 추가 수익은 연말에
      도움의 손길이 필요한 곳에 기부될 예정입니다. QR 코드 또는 버튼 클릭으로
      링크에 접속하여 송금해주세요. <br />
      가격: 3000원
      <br />
      <strong>입금자명: 이름+전화번호 뒤 4자리 (예: 홍길동1234)</strong>
      <Image
        width={200}
        height={200}
        alt={"송금 QR코드"}
        src={"/static/images/paycode.jpeg"}
      />
      <Button Style={Kakao}>카카오페이로 송금하기</Button>
      <Button Style={GreenRightCorner}>이메일로 받을게요</Button>
    </div>
  );
}

export default pay;
