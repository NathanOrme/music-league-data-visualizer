// types/UserMultiSubmissionDTO.ts

import type { AlbumInfoDTO } from './AlbumInfoDTO'; // Import AlbumInfoDTO
import type { UserDetailsDTO } from './UserDetailsDTO'; // Import UserDetailsDTO

export interface UserMultiSubmissionDTO {
  userDetailsDTO: UserDetailsDTO;
  albumInfoDTOList: AlbumInfoDTO[];
}
