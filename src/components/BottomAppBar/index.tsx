"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BottomAppBarNavigation from "./navigation";

const BottomAppBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 max-w-[500px] w-full border-t border-gray-200">
      <div className="max-w-2xl mx-auto px-10 py-6">
        <div className="flex justify-between items-center">
          {BottomAppBarNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href || "/"}>
                {item.icon && (
                  <item.icon
                    className={`w-10 h-10 ${
                      isActive ? "text-black" : "text-gray-400"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomAppBar;
