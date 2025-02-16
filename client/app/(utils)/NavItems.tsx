
interface INavItems {
    activeItem: number,
    isMobile: boolean,
}

export const navItemsData = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Courses",
        url: "/courses"
    },
    {
        name: "Policy",
        url: "/policy"
    },
    {
        name: "FAQ",
        url: "/faq"
    }
]

export default function NavItems({activeItem, isMobile}: INavItems) {
    return (
        <div>NavItems</div>
    )
}