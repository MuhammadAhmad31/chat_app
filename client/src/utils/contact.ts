import { User } from "@/types/user.type";

interface DataItem {
  id: number;
  members: number[];
  created_at: string;
  updated_at: string;
}

export function getMembersByIdNotEqual(
  data: DataItem[] | undefined,
  id: number
): number[] {
  if (!data) {
    return [];
  }

  const resultMembers = Array.from(
    new Set(
      data.flatMap((item) => item.members).filter((memberId) => memberId !== id)
    )
  );

  return resultMembers;
}

export function filterUsersById(users: User, idArray: number[]) {
  return users.filter((user) => idArray.includes(user.id));
}
