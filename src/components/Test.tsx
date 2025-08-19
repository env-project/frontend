import { useState } from "react";
import Input from "@/components/input/Input";

export default function Test() {
  const [text, setText] = useState("");

  return (
    <div>
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        error="비밀번호가 일치하지 않습니다."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
}
