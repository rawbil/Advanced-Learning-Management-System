import Image from "next/image";
import Link from "next/link";
const heroImg = '/hero.png';
import {BiSearch} from 'react-icons/bi';


export default function Hero() {
    return (
        <div className="w-full flex flex-col items-center justify-center mt-[150px]">
            <div>
                <Image src={heroImg} alt="hero-bg" width={500} height={500} />
            </div>

            <div>
                <h2>Improve your learning experience better instantly</h2>
                <br />
                <p>We have 40k+ Online courses & 500k+ registered students. Find your desired courses from them.</p>
                <br />
                <br />
                <div>
                    <input type="search" name="" id="" />
                    <div>
                        <BiSearch />
                    </div>
                </div>
                <br />
                <br />
                <div>
                    {/* Image * 3 */}

                    <p>500k+ people already trusted us. </p>
                    <Link href={'/courses'} >View Courses</Link>
                </div>
            </div>
        </div>
    )
}