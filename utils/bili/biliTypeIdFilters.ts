const musicTypeIds = [3, 28, 30, 31, 59, 193, 29, 130];

export const isMusicType = (typeId: number) => {
  return musicTypeIds.includes(typeId);
};
