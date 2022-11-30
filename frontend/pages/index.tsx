import axios from "axios";
import { useForm } from "react-hook-form";
import { useRoomEnter } from "../stores/useRoomEnter";
import { useRouter } from "next/navigation";
import Link from "next/link";
type EmailForm = {
  email: string;
};

export default function Home() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailForm>();

  const { isLoading, enter, error } = useRoomEnter();

  const pushRoom = (id: number) => {
    router.push(`/${id}`);
  };

  const onValid = async (data: EmailForm) => {
    enter(data, pushRoom);

    if (error) {
      // API 명세 후 핸들링 코드 추가
      alert("에러가 발생했습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <label>이메일로 다른 사람 방 입장하기</label>
        <input
          {...register("email", {
            required: "값을 입력해주세요.",
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          type="text"
        />
        {errors?.email && <em>{errors.email.message}</em>}
        <button disabled={isLoading} type="submit">
          입장
        </button>
      </form>
      <Link href={`/signup`}>내 방 만들기</Link>
      <Link href={`/signin`}>로그인</Link>
    </div>
  );
}
