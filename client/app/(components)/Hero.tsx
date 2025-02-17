import Image from "next/image";
import Link from "next/link";
const heroImg = "/hero.png";
import { BiSearch } from "react-icons/bi";

export default function Hero() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center mt-[120px] 1000px:mt-[10] 1000px:flex-row 1000px:gap-[5%] px-2 pb-4">
      <div className="w-full">
        <Image
          src={heroImg}
          alt="hero-bg"
          width={500}
          height={500}
          className="w-full hero_animation dark:bg-hero-dark bg-hero-light rounded 1000px:rounded-xl 1000px:w-[800px]  1000px:object-cover"
        />
      </div>

      <div className="mt-[20px] flex flex-col  font-josefin">
        <h2 className="text-[30px] max-300px:text-[24px] font-extrabold capitalize">
          Improve your learning experience instantly
        </h2>
        <br />
        <p className="text-lg">
          We have 40k+ Online courses & 500k+ registered students. Find your
          desired courses from them.
        </p>
        <br />
        <br />
        <div className="relative bg-gray-500 w-full flex rounded">
          <input
            type="search"
            name="search"
            id=""
            placeholder="Search Courses..."
            className="flex-1 dark:bg-transparent bg-gray-500 rounded p-2 outline-0 text-white"
          />
          <button className=" dark:bg-[royalblue] bg-[crimson]  hover:bg-[royalblue]/70 transition w-[40px] p-2 rounded-r flex items-center justify-center ">
            <BiSearch size={20} />
          </button>
        </div>
        <br />
        <br />
        <div>
          {/* Image * 3 */}
          <div className="flex items-center justify-center gap-[10px] max-500px:gap-[5px] w-full max-400px:flex-col ">
            <section className="flex">
              <Image
                src={"/random1.jpg"}
                alt="rand1"
                width={40}
                height={40}
                className="rounded-full w-[35px] h-[35px]  object-cover border-2 dark:border-[#37a39a] border-[crimson]  "
              />
              <Image
                src={"/random2.jpeg"}
                alt="rand1"
                width={40}
                height={40}
                className="rounded-full w-[35px] h-[35px]  object-cover border-2 dark:border-[#37a39a] border-[crimson]  ml-[-10px] "
              />
              <Image
                src={"/random3.jpeg"}
                alt="rand1"
                width={40}
                height={40}
                className="rounded-full w-[35px] h-[35px]  object-cover border-2 dark:border-[#37a39a] border-[crimson]  ml-[-10px] "
              />
            </section>
            <div className="flex gap-2 max-500px:gap-1 max-400px:flex-col max-400px:items-center">
              <p>500k+ people already trusted us. </p>
              <Link
                href={"/courses"}
                className="dark:text-[#37a39a] text-[crimson]"
              >
                View Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
