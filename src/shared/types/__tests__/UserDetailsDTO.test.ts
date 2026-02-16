import type { UserDetailsDTO } from '@/shared/types/UserDetailsDTO';

describe('UserDetailsDTO', () => {
  test('should create an object with only the required property', () => {
    const user: UserDetailsDTO = {
      userName: 'John Doe',
    };

    expect(user.userName).toBe('John Doe');
    expect(user.userEmail).toBeUndefined();
    expect(user.userPhoneNumber).toBeUndefined();
    expect(user.discogsName).toBeUndefined();
  });

  test('should create an object with all properties', () => {
    const user: UserDetailsDTO = {
      userName: 'Jane Doe',
      userEmail: 'jane@example.com',
      userPhoneNumber: '1234567890',
      discogsName: 'janediscogs',
    };

    expect(user.userName).toBe('Jane Doe');
    expect(user.userEmail).toBe('jane@example.com');
    expect(user.userPhoneNumber).toBe('1234567890');
    expect(user.discogsName).toBe('janediscogs');
  });
});
