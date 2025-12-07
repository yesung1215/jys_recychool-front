export const mapGameTypeSlugToChannel = (slug = '') => {
  const normalized = slug?.toString().toLowerCase();

  switch (normalized) {
    case 'snakepuzzle':
    case 'snake':
      return 'snake-puzzle';
    case 'concave':
    case 'omok':
      return 'concave';
    case 'cardflip':
    case 'card':
      return 'card-flip';
    case 'lastword':
    case 'word':
      return 'last-word';
    default:
      return normalized || 'snake-puzzle';
  }
};

export const getGameTypeSlugFromPath = (pathname = '') => {
  if (!pathname) return '';
  const segments = pathname.split('/').filter(Boolean);
  if (!segments.length) return '';

  const roomsIndex = segments.indexOf('rooms');
  if (roomsIndex !== -1) {
    const typeCandidate = segments[roomsIndex + 2];
    if (typeCandidate) return typeCandidate;
  }

  return segments[segments.length - 1] || '';
};

export const getGameChannelFromPath = (pathname = '') => {
  const slug = getGameTypeSlugFromPath(pathname);
  return mapGameTypeSlugToChannel(slug);
};

