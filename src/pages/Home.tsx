import HeroBanner from "@/components/HeroBanner";
import Text from "@/components/text/Text";

import ProfileList from "./profile/ProfileList";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <section>
        <Text>인기 구인글</Text>
        <ProfileList />
      </section>
    </>
  );
}
