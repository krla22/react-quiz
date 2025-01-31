import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video 
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://videos.pexels.com/video-files/7677549/7677549-hd_1080_1920_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
           The Relationship Quiz 
        </h1>
        <p className="text-lg sm:text-xl mb-8 drop-shadow">
          How well do you know your relationship?
        </p>
        
        <button
          className="px-8 py-4 bg-red-500/90 hover:bg-red-600 text-lg font-bold rounded-2xl shadow-lg transition-all duration-200 backdrop-blur-sm"
          onClick={() => router.push("/quiz")}
        >
          Play Now
        </button>
      </div>
    </div>
  );
}