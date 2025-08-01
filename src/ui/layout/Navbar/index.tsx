import { layoutConstraintsCn } from "@/lib/constants/ui";
import { IconButton } from "@/ui/reusable/IconButton";
import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";

export const Navbar = () => {
  return (
    <nav className={"flex p-1 sticky top-0 z-10"}>
      <div
        className={`${layoutConstraintsCn} flex flex-1 justify-between items-center`}
      >
        <Link href="/">{"simple-ecommerce"}</Link>
        <div className={"flex justify-between"}>
          <Link href="/cart">
            <IconButton>
              <MdShoppingCart
                size={32}
                color="var(--text)"
                className={"height-[200px]"}
              />
            </IconButton>
          </Link>
        </div>
      </div>
    </nav>
  );
};
