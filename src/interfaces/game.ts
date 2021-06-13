export interface IGame {
  readonly ip: string;
  readonly code: number;
  team: ITeam;
  remaining: number;
}

export interface ITeam {
  name: string;
}
