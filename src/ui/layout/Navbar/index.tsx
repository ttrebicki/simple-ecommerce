import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className={"flex border-b-1 border-bordercolor bg-primary-main p-4"}>
      <Link href="/">
        <Image
          src={"/img/logo.png"}
          alt={"simple ecommerce logo"}
          width={128}
          height={96}
        />
      </Link>
    </nav>
  );
};
