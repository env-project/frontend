import api from "@/libs/axios";
import type { MasterData } from "@/types/api-res-common";
import { useQuery } from "@tanstack/react-query";

export default function useMasterData() {
  return useQuery<MasterData>({
    queryKey: ["master-data"],
    queryFn: async () => {
      const res = await api.get("/common/master-data");
      return res.data;
    },
  });
}
