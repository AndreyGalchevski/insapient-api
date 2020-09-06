export interface Member {
  name: string;
  instrument: string;
  info: string;
  image: string;
}

export type MembersService = Readonly<{
  getMembers: () => Promise<Member[]>;
}>;
