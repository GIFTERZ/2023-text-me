import FormContext from "../../common/form/FormContext";

const AddressFormContext = new FormContext();

AddressFormContext.register(
  "receiverName",
  {
    placeholder: "받으시는 분 성함",
  },
  {
    required: {
      value: true,
      message: "성함을 입력해주세요.",
    },
  }
);

AddressFormContext.register(
  "zonecode",
  {
    disabled: true,
  },
  {
    required: {
      value: true,
      message: "우편번호를 입력해주세요.",
    },
  }
);

AddressFormContext.register(
  "defaultAddress",
  {
    disabled: true,
  },
  {
    required: {
      value: true,
      message: "주소를 입력해주세요.",
    },
  }
);

AddressFormContext.register(
  "detailAddress",
  {
    placeholder: "상세주소",
  },
  {
    required: {
      value: true,
      message: "상세주소를 입력해주세요.",
    },
  }
);

AddressFormContext.register(
  "phoneNumber",
  {
    placeholder: "휴대폰 번호('-' 포함)",
  },
  {
    required: {
      value: true,
      message: "휴대폰 번호를 입력해주세요.",
    },
  }
);

export default AddressFormContext;
