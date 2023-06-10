import IProfileData from 'interfaces/IProfileData';

export const profileDataConcat = (steamData: any): IProfileData => ({
  profile: {
    id: steamData.id,
    name: steamData.personaname,
    level: steamData.level,
    picture: steamData.avatarfull,
    steamUrl: steamData.profileurl,
    lastTimePlayedStamp: steamData.lastlogoff,
    createStamp: steamData.timecreated,
  },
});
