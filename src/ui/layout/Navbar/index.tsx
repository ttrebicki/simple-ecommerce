import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className={"flex border-b-1 border-bordercolor bg-background p-4"}>
      <div className={"flex flex-1 justify-between items-center"}>
        <Link href="/">
          <Image
            src={"/img/logo_2.png"}
            alt={"simple ecommerce logo"}
            width={128}
            height={96}
          />
        </Link>
        <div className={"flex justify-between"}>
          <Link href="/koszyk">Koszyk</Link>
        </div>
      </div>
    </nav>
  );
};
