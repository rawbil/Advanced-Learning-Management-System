import Link from "next/link";

interface INavItems {
  activeItem: number;
  isMobile: boolean;
}

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

export default function NavItems({ activeItem, isMobile }: INavItems) {
  return (
    <div>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-poppins font-400`}
              ></span>
            </Link>
          ))}
      </div>
    </div>
  );
}
