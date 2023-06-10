import IProfileWeaponsStats from './IProfileWeaponsStats';

interface IProfileData {
  profile: {
    id: string;
    name: string;
    level: number;
    picture: string;
    steamUrl: string;
    lastTimePlayedStamp: number;
    createStamp: number;
  };
  stats?: {
    weapons: IProfileWeaponsStats[];
  };
}

export default IProfileData;
