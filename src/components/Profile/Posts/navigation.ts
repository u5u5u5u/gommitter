interface ProfileNavigationType {
  id: number;
  name: string;
  display_name: string;
}

const ProfileNavigation: ProfileNavigationType[] = [
  {
    id: 1,
    name: "posts",
    display_name: "ポスト",
  },
  {
    id: 2,
    name: "replies",
    display_name: "返信",
  },
  {
    id: 3,
    name: "media",
    display_name: "メディア",
  },
  {
    id: 4,
    name: "likes",
    display_name: "いいね",
  },
];

export default ProfileNavigation;
