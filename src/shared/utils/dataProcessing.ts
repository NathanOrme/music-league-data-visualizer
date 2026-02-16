import JSZip, { type JSZipObject } from 'jszip';
import { parse } from 'papaparse';

/**
 * Enum for zip file names (stored in public/league-zip for example).
 * These are used to identify different leagues and their contents.
 */
export enum LeagueZip {
  FirstLeague = '1001LeaguesUnderTheSea.zip',
  SecondLeague = 'electricBoogaloo.zip',
  ThirdLeague = 'withAVengeance.zip',
  FourthLeague = 'aToZ.zip',
  FifthLeague = 'situations.zip',
  SixthLeague = 'musicLeagueIsBack.zip',
}

export enum WordZip {
  FirstLeague = '1001Words.zip',
  SecondLeague = '1001Words2.zip',
}

export enum CoffeeZip {
  FirstLeague = 'coffee.zip',
}

export enum HeadOfSteamZip {
  FirstLeague = 'first.zip',
}

/**
 * Interface representing league file information.
 */
export interface LeagueFileInfo {
  /** The filename of the zip archive. */
  fileName: LeagueZip | WordZip | CoffeeZip | HeadOfSteamZip;
  /** The display title of the league. */
  leagueTitle: string;
}

/**
 * Competitor row from CSV.
 */
export interface Competitor {
  ID: string;
  Name: string;
}

/**
 * Submission row from CSV.
 */
export interface Submission {
  'Spotify URI': string;
  Title: string;
  Album: string;
  'Artist(s)': string;
  'Submitter ID': string;
  Created: string;
  Comment: string;
  'Round ID': string;
  'Visible To Voters': string;
}

/**
 * Vote row from CSV.
 */
export interface Vote {
  'Spotify URI': string;
  'Voter ID': string;
  Created: string;
  'Points Assigned': string;
  Comment: string;
  'Round ID': string;
}

/**
 * Computed standing for a competitor.
 */
export interface Standing {
  position: number;
  name: string;
  points: number;
  song: string;
}

/**
 * Represents a played round.
 */
export interface Round {
  id: string;
  created: string;
  name: string;
  description: string;
  playlist?: string;
  standings: Standing[];
}

/**
 * Aggregate league data.
 */
export interface League {
  title: string;
  rounds: Round[];
  leagueStandings: Standing[];
  votes?: Vote[];
  competitors?: Competitor[];
  submissions?: Submission[];
  // League-level URLs for comprehensive journey experience
  urls?: {
    mainPlaylist?: string; // Main league playlist with all songs
    homepage?: string; // League homepage/info page
    social?: {
      // Social media links
      twitter?: string;
      instagram?: string;
      facebook?: string;
      discord?: string;
    };
    archive?: string; // Historical data/archive
    rules?: string; // League rules or documentation
    leaderboard?: string; // External leaderboard URL
  };
}

/**
 * Raw CSV row for rounds, used for parsing.
 */
export interface RoundCSV {
  ID: string;
  Created: string;
  Name: string;
  Description: string;
  'Playlist URL'?: string;
}

/**
 * Parses CSV content string into typed rows.
 */
function parseCsv<T>(content: string): T[] {
  return parse<T>(content, { header: true, skipEmptyLines: true })
    .data;
}

/**
 * Validates an entry's filepath for safety and extension.
 *
 * @param entry - A JSZip archive entry.
 * @throws Error on absolute paths, traversal sequences, or wrong extension.
 */
function validateEntry(entry: JSZipObject): void {
  const name = entry.name;
  // Disallow absolute paths and drive letters
  if (
    name.startsWith('/') ||
    name.startsWith('\\') ||
    /^[a-zA-Z]:[\\/]/.test(name)
  ) {
    throw new Error(`Invalid entry name: absolute path "${name}"`);
  }
  // Disallow path traversal
  const components = name.replace(/\\/g, '/').split('/');
  if (components.includes('..')) {
    throw new Error(`Invalid entry name: path traversal "${name}"`);
  }
  // Only allow .csv files
  if (!/\.csv$/i.test(name)) {
    throw new Error(`Unsupported file type: ${name}`);
  }
}

/**
 * Checks per-file and aggregate uncompressed size limits.
 *
 * @param entry - A JSZip archive entry.
 * @param total - Mutable object tracking cumulative size.
 * @throws Error if any size limit is exceeded.
 */
function checkSizes(
  entry: JSZipObject,
  total: { value: number },
): void {
  const MAX_PER_FILE = 20 * 1024 * 1024; // 20MB
  const MAX_TOTAL = 200 * 1024 * 1024; // 200MB
  const size = (entry as { _data?: { uncompressedSize?: number } })
    ._data?.uncompressedSize;
  if (typeof size === 'number') {
    if (size > MAX_PER_FILE) {
      throw new Error(
        `File too large: ${entry.name} (${(size / 1024 / 1024).toFixed(1)} MB)`,
      );
    }
    total.value += size;
    if (total.value > MAX_TOTAL) {
      throw new Error('Archive expands to too much data');
    }
  }
}

/**
 * Safely loads and validates a ZIP archive from raw bytes.
 *
 * @param buffer - The ZIP data as an ArrayBuffer.
 * @returns A JSZip instance if valid.
 * @throws Error for count, path, or size violations.
 */
async function safeLoadZip(buffer: ArrayBuffer): Promise<JSZip> {
  // The following line is flagged as a potential Zip Slip vulnerability.
  // However, this is a false positive because we are only reading the zip
  // into memory. No files are written to the filesystem, which is the
  // primary risk of this vulnerability. The `validateEntry` function is
  // called on each entry to check for malicious paths before processing.
  // eslint-disable-next-line
  const zip = await JSZip.loadAsync(buffer);
  const entries = Object.values(zip.files);
  if (entries.length > 100) {
    throw new Error('ZIP contains too many files');
  }
  const total = { value: 0 };
  for (const entry of entries) {
    validateEntry(entry);
    checkSizes(entry, total);
  }
  return zip;
}

/**
 * Processes a league ZIP file: fetch, validate, extract CSVs, compute standings.
 *
 * @param fileInfo - Which ZIP to load along with its title.
 * @param basePath - URI path prefix for ZIP files (default: '/league-zip').
 * @returns Aggregated League data.
 * @throws Error on network or validation failures.
 */
export async function processLeagueZip(
  fileInfo: LeagueFileInfo,
  basePath = '/league-zip',
): Promise<League> {
  const url = `${basePath}/${fileInfo.fileName}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}`);
  }

  const buffer = await response.arrayBuffer();
  if (buffer.byteLength > 50 * 1024 * 1024) {
    throw new Error('ZIP file too large');
  }

  const zip = await safeLoadZip(buffer);
  const csvNames = Object.keys(zip.files).filter((f) =>
    f.toLowerCase().endsWith('.csv'),
  );

  const competitors: Competitor[] = [];
  const roundsData: Round[] = [];
  const submissions: Submission[] = [];
  const votes: Vote[] = [];

  for (const name of csvNames) {
    const file = zip.file(name);
    if (!file) {
      continue;
    }
    const content = await file.async('string');
    const key = name.toLowerCase();
    if (key.includes('competitor')) {
      competitors.push(...parseCsv<Competitor>(content));
    } else if (key.includes('round')) {
      roundsData.push(
        ...parseCsv<RoundCSV>(content).map((r) => ({
          id: r.ID,
          created: r.Created,
          name: r.Name,
          description: r.Description,
          playlist: r['Playlist URL'],
          standings: [],
        })),
      );
    } else if (key.includes('submission')) {
      submissions.push(...parseCsv<Submission>(content));
    } else if (key.includes('vote')) {
      votes.push(...parseCsv<Vote>(content));
    }
  }

  const compMap = new Map(competitors.map((c) => [c.ID, c.Name]));
  const roundMap = new Map(roundsData.map((r) => [r.id, r]));

  const subsBy = submissions.reduce(
    (m, s) =>
      m.set(s['Round ID'], (m.get(s['Round ID']) || []).concat(s)) &&
      m,
    new Map<string, Submission[]>(),
  );
  const pts = votes.reduce(
    (m, v) =>
      m.set(
        `${v['Round ID']}|${v['Spotify URI']}`,
        (m.get(`${v['Round ID']}|${v['Spotify URI']}`) ?? 0) +
          Number(v['Points Assigned']),
      ) && m,
    new Map<string, number>(),
  );

  roundMap.forEach((round, id) => {
    const subs = subsBy.get(id) || [];
    round.standings = subs
      .map((s) => ({
        position: 0,
        name: compMap.get(s['Submitter ID']) ?? 'Unknown',
        points: pts.get(`${id}|${s['Spotify URI']}`) ?? 0,
        song: s.Title,
      }))
      .sort((a, b) => b.points - a.points)
      .map((s, i) => ({ ...s, position: i + 1 }));
  });

  const rounds = Array.from(roundMap.values());
  const totalPts = new Map<string, number>();
  rounds.forEach((r) =>
    r.standings.forEach((s) =>
      totalPts.set(s.name, (totalPts.get(s.name) ?? 0) + s.points),
    ),
  );
  const leagueStandings = Array.from(totalPts.entries())
    .map(([name, pts]) => ({
      position: 0,
      name,
      points: pts,
      song: '',
    }))
    .sort((a, b) => b.points - a.points)
    .map((s, i) => ({ ...s, position: i + 1 }));

  return {
    title: fileInfo.leagueTitle,
    rounds,
    leagueStandings,
    votes,
    competitors,
    submissions,
  };
}

/**
 * Arrays of league file info for UI.
 */
export const leagueFiles: LeagueFileInfo[] = [
  {
    fileName: LeagueZip.FirstLeague,
    leagueTitle: '1001 Leagues Under The Sea',
  },
  {
    fileName: LeagueZip.SecondLeague,
    leagueTitle: '1001 Leagues 2: Electric Boogaloo',
  },
  {
    fileName: LeagueZip.ThirdLeague,
    leagueTitle: '1001 Leagues 3: With A Vengeance',
  },
  {
    fileName: LeagueZip.FourthLeague,
    leagueTitle: '1001 Leagues 4: A To Z',
  },
  {
    fileName: LeagueZip.FifthLeague,
    leagueTitle: '1001 Leagues 5: Situations',
  },
  {
    fileName: LeagueZip.SixthLeague,
    leagueTitle: '1001 Leagues 6: The Return',
  },
];

/**
 * League file configurations for Words-themed music leagues
 */
export const wordsLeagueFiles: LeagueFileInfo[] = [
  { fileName: WordZip.FirstLeague, leagueTitle: '1001 Words' },
  { fileName: WordZip.SecondLeague, leagueTitle: '1001 Words 2' },
];

/**
 * League file configurations for Coffee & Tunes themed music leagues
 */
export const coffeeLeagueFiles: LeagueFileInfo[] = [
  { fileName: CoffeeZip.FirstLeague, leagueTitle: 'Coffee & Tunes' },
];

/**
 * League file configurations for Head of Steam Enthusiasts themed music leagues
 */
export const headOfSteamLeagueFiles: LeagueFileInfo[] = [
  {
    fileName: HeadOfSteamZip.FirstLeague,
    leagueTitle: 'Head of Steam Enthusiasts',
  },
];
