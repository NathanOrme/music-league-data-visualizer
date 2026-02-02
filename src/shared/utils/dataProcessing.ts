import JSZip, { type JSZipObject } from 'jszip';
import { parse } from 'papaparse';

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
  categoryId?: string;
  categoryName?: string;
  rounds: Round[];
  leagueStandings: Standing[];
  votes?: Vote[];
  competitors?: Competitor[];
  submissions?: Submission[];
  urls?: {
    mainPlaylist?: string;
    homepage?: string;
    social?: {
      twitter?: string;
      instagram?: string;
      facebook?: string;
      discord?: string;
    };
    archive?: string;
    rules?: string;
    leaderboard?: string;
  };
}

/**
 * Raw CSV row for rounds, used for parsing.
 */
interface RoundCSV {
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
  return parse<T>(content, { header: true, skipEmptyLines: true }).data;
}

/**
 * Validates an entry's filepath for safety and extension.
 */
function validateEntry(entry: JSZipObject): void {
  const name = entry.name;
  if (
    name.startsWith('/') ||
    name.startsWith('\\') ||
    /^[a-zA-Z]:[\\/]/.test(name)
  ) {
    throw new Error(`Invalid entry name: absolute path "${name}"`);
  }
  const components = name.replace(/\\/g, '/').split('/');
  if (components.includes('..')) {
    throw new Error(`Invalid entry name: path traversal "${name}"`);
  }
  if (!/\.csv$/i.test(name)) {
    throw new Error(`Unsupported file type: ${name}`);
  }
}

/**
 * Checks per-file and aggregate uncompressed size limits.
 */
function checkSizes(entry: JSZipObject, total: { value: number }): void {
  const MAX_PER_FILE = 20 * 1024 * 1024;
  const MAX_TOTAL = 200 * 1024 * 1024;
  const size = (entry as { _data?: { uncompressedSize?: number } })._data
    ?.uncompressedSize;
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
 */
async function safeLoadZip(buffer: ArrayBuffer): Promise<JSZip> {
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
 * Configuration for processing a league file
 */
export interface LeagueFileConfig {
  /** Display title of the league */
  title: string;
  /** Filename of the ZIP archive */
  fileName: string;
  /** Category ID this league belongs to */
  categoryId?: string;
  /** Category display name */
  categoryName?: string;
}

/**
 * Processes a league ZIP file: fetch, validate, extract CSVs, compute standings.
 *
 * @param config - League file configuration
 * @param basePath - URI path prefix for ZIP files (e.g., '/data/1001-leagues')
 * @returns Aggregated League data
 */
export async function processLeagueZip(
  config: LeagueFileConfig,
  basePath: string,
): Promise<League> {
  const url = `${basePath}/${config.fileName}`;
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
    (m, s) => m.set(s['Round ID'], (m.get(s['Round ID']) || []).concat(s)) && m,
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
    title: config.title,
    categoryId: config.categoryId,
    categoryName: config.categoryName,
    rounds,
    leagueStandings,
    votes,
    competitors,
    submissions,
  };
}
