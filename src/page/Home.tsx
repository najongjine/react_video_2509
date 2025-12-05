import { useEffect, useState } from "react";

interface videoListType {
  createdAt?: string;
  id?: number;
  mp4Url?: string;
  publicId?: string;
  title?: string;
}
export default function Home() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [videos, setVideos] = useState<videoListType[]>([]);

  async function getVideoList() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/video/get_video_list`);
      const result: any = await response.json();
      if (!result?.success) {
        alert(`서버 에러. ${result?.msg ?? ""}`);
        return;
      }
      setVideos(result?.data ?? []);
    } catch (error: any) {
      alert(`서버 에러. ${error?.message ?? ""}`);
      return;
    }
  }

  useEffect(() => {
    getVideoList();
  }, []);

  return (
    <div className="content-margin-padding">
      <h1>비디오 리스트</h1>
      <div>
        {videos?.length &&
          videos.map((item) => {
            return (
              <div>
                <span>
                  {item?.id}, &nbsp;&nbsp; ${item?.title ?? ""}
                  ,&nbsp;&nbsp; ${item?.createdAt ?? ""}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
