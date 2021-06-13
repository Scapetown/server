export interface Game {
  id?: string;
  ip?: string;
  code?: number;
  team: Team;
  time_remaining?: any;
  running?: true;
}

export interface Team {
  name: string;
} 
