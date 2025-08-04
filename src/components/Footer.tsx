import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { SiKakaotalk } from "react-icons/si";
import Text from "@/components/text/Text";
import type { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-bg-primary text-sm absolute bottom-0 w-full">
      <div className="grid gap-8 md:grid-cols-2 px-10 py-6 w-full md:px-20">
        <div className="flex justify-center md:justify-normal gap-20 ">
          <AiOutlineFacebook size={28} />
          <FaInstagram size={28} />
          <SiKakaotalk size={28} />
        </div>
        <div className="flex justify-between">
          <div>
            <Text variant="label" className="block md:text-sm">
              .ENV
            </Text>
            <Text variant="label" className="block md:text-sm">
              FE: 이재현, 김민창, 박준규
            </Text>
            <Text variant="label" className="block md:text-sm">
              BE: 정상우, 김혜진, 은정연
            </Text>
            <Text variant="label" className="block md:text-sm">
              주소 : OZ코딩스쿨
            </Text>
          </div>
          <div className="flex gap-2">
            <Text variant="label" className="md:text-sm">
              <a href="#">Privacy Policy</a>
            </Text>
            <Text>|</Text>
            <Text variant="label" className="md:text-sm">
              <a href="#">Terms</a>
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
