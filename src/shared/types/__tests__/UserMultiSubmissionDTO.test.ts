import type { UserMultiSubmissionDTO } from '@/shared/types/UserMultiSubmissionDTO';

const dummyUserDetailsDTO = {
  userName: 'testuser',
};

const dummyAlbumInfoDTO = {
  albumName: 'Test Album',
  albumArtist: 'Test Artist',
  albumYear: 2023,
  played: false,
};

describe('UserMultiSubmissionDTO', () => {
  it('should create a valid submission DTO', () => {
    const validSubmission: UserMultiSubmissionDTO = {
      userDetailsDTO: dummyUserDetailsDTO,
      albumInfoDTOList: [dummyAlbumInfoDTO],
    };

    expect(validSubmission).toHaveProperty('userDetailsDTO');
    expect(validSubmission.userDetailsDTO).toEqual(
      dummyUserDetailsDTO,
    );
    expect(validSubmission).toHaveProperty('albumInfoDTOList');
    expect(Array.isArray(validSubmission.albumInfoDTOList)).toBe(
      true,
    );
    expect(validSubmission.albumInfoDTOList).toContainEqual(
      dummyAlbumInfoDTO,
    );
  });
});
