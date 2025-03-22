"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProfileNavigation from "./navigation";

const ProfilePosts = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <nav className="flex">
        {ProfileNavigation.map((nav) => (
          <Button
            key={nav.id}
            variant="ghost"
            onClick={() => handleTabChange(nav.name)}
            className={`flex-1 mx-4 my-4 text-center rounded-none font-bold ${
              activeTab === nav.name
                ? "border-b-2 border-blue-500 text-black"
                : "text-gray-400"
            } transition-colors`}
          >
            {nav.display_name}
          </Button>
        ))}
      </nav>

      <div className="divide-y divide-gray-200">
        {activeTab === "posts" && (
          <div className="p-4">
            <p>ポスト</p>
          </div>
        )}
        {activeTab === "replies" && (
          <div className="p-4">
            <p>返信</p>
          </div>
        )}
        {activeTab === "media" && (
          <div className="p-4">
            <p>メディア</p>
          </div>
        )}
        {activeTab === "likes" && (
          <div className="p-4">
            <p>いいね</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePosts;
