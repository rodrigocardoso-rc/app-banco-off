import uuid from 'react-native-uuid';

export function generateUUID(size?: number): string {
  const id = uuid.v4() .toString();

  if (size) {
    return id.slice(0, 6);
  }

  return id;
}