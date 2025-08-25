import api from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export default function useMutateImage() {
  return useMutation<{ image_url: string }, AxiosError, File>({
    mutationFn: async (imageFile: File) => {
      const formData = new FormData();
      formData.append("file", imageFile);
      const res = await api.post<{ image_url: string }>("/uploads/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data; // { image_url: string }
    },
  });
}
