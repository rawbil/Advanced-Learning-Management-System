import { Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { styles } from "../styles";

interface Props {
  setRoute: Dispatch<SetStateAction<string>>;
}

interface verifyNumber {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
}

export default function Verification({ setRoute }: Props) {
  const [invalidError, setInvalidError] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<verifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    console.log("test");
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus;
    }
  };
  return (
    <div>
      <h1 className={`${styles.title}`}>Verify your account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497df2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="1100px:w-[70%] m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
            <input type="text" key={key} ref={inputRefs[index]} className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] outline-none font-poppins text-center ${invalidError ? "shake boroder-red-500" : "dark:border-white border-[#0000004a]"}`} />
        ))}
      </div>
    </div>
  );
}
