import { layoutConstraintsCn } from "@/lib/constants/ui";
import { Button } from "@/ui/reusable/Button";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className={"flex p-1 sticky top-0 z-10"}>
      <div
        className={`${layoutConstraintsCn} flex flex-1 justify-between items-center`}
      >
        <Link href="/">
          <Image
            src={"/img/logo.png"}
            alt={"simple ecommerce logo"}
            width={48}
            height={48}
          />
        </Link>
        <div className={"flex justify-between"}>
          <Link href="/cart">
            <Button variant="outlined">{"Cart"}</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
