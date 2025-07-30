import { layoutConstraintsCn } from "@/lib/constants/ui";

export const Footer = () => (
  <footer
    className={"flex border-t-1 border-bordercolor bg-secondary-main p-4"}
  >
    <div className={layoutConstraintsCn}>
      {"2025 Tomasz Trębicki | MIT Licensed"}
    </div>
  </footer>
);
