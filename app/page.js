"use client";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="text-white h-[35vh] flex flex-col justify-center items-center gap-5">
        <div className='flex justify-center items-center'>
          <h1 className='text-white text-4xl font-bold'>
            Buy Me A Chai
          </h1>
          <img className='w-15 h-15' src="/tea.gif" alt="Chai animation" srcSet="" />
        </div>
        <p className="text-center mx-5">Hey creators! Turn your followers into supporters. Start your crowdfunding journey now!</p>
        <div className="flex justify-center items-center gap-4">
          <Link href={"/login"}>
          <button
            className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-150"
            onMouseUp={(e) => e.currentTarget.blur()}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl">
              Start Now
            </span>
          </button>
          </Link>
          <Link href={"/about"}>
          <button
            className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-150"
            onMouseUp={(e) => e.currentTarget.blur()}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl">
              Read More
            </span>
          </button>
          </Link>

        </div>
      </div>
      <div className="bg-gray-600 h-1 my-4 opacity-20"></div>
      <div className="text-white h-[35vh] flex flex-col justify-around items-center gap-10">
        <h2 className='text-white text-2xl font-bold'>Your Fans Can Buy You A Chai</h2>
        <div className="flex w-full justify-around items-center gap-4 px-3">
          <div className="flex flex-col justify-center items-center gap-3">
            <img className="w-15 h-15 bg-gray-500 rounded-full" src="/man.gif" alt="Supporter icon" />
            <h3 className="font-bold">Recieve Support</h3>
            <p className="text-[13px]">Join the community and enjoy chai with your supporters!</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img className="w-15 h-15 bg-gray-500 rounded-full" src="/coin.gif" alt="Coin icon" />
            <h3 className="font-bold">Earn Tips</h3>
            <p className="text-[13px]">Join the community and enjoy chai with your supporters!</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img className="w-15 h-15 bg-gray-500 rounded-full" src="/group.gif" alt="Group icon" />
            <h3 className="font-bold">Grow Your Community</h3>
            <p className="text-[13px]">Join the community and enjoy chai with your supporters!</p>
          </div>
        </div>
      </div>
    </>
  );
}
