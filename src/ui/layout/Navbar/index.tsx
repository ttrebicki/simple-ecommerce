import { layoutConstraintsCn } from "@/lib/constants/ui";
import Link from "next/link";
import CartButton from "./components/CartButton";
import { IconButton } from "@/ui/reusable/IconButton";
import { MdOutlineLogin } from "react-icons/md";

export const Navbar = () => {
  return (
    <nav className={"flex p-1 sticky top-0 z-10"}>
      <div
        className={`${layoutConstraintsCn} flex flex-1 justify-between items-center`}
      >
        <Link href="/">{"simple-ecommerce"}</Link>
        <div className="flex">
          <Link href="/login" className="relative">
            <IconButton>
              <MdOutlineLogin
                size={32}
                color="var(--text)"
                className={"height-[200px]"}
              />
            </IconButton>
          </Link>
          <Link href="/cart" className="relative">
            <CartButton />
          </Link>
        </div>
      </div>
    </nav>
  );
};
