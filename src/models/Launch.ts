// models/Launch.ts
export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: 'half' | 'quarter' | 'year' | 'month' | 'day' | 'hour';
  static_fire_date_utc?: string;
  static_fire_date_unix?: number;
  tdb?: boolean;
  net?: boolean;
  window?: number;
  rocket?: {
    id: string;
    name: string;
    type: string;
  };
  success?: boolean;
  failures: Failure[];
  upcoming: boolean;
  details?: string;
  fairings?: {
    reused?: boolean;
    recovery_attempt?: boolean;
    recovered?: boolean;
    ships: string[];
  };
  crew: Crew[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad?: {
    id: string;
    name: string;
    full_name: string;
    locality: string;
    region: string;
    timezone: string;
    latitude: number;
    longitude: number;
    launch_attempts: number;
    launch_successes: number;
  };
  cores: Core[];
  links: {
    patch: {
      small?: string;
      large?: string;
    };
    reddit: {
      campaign?: string;
      launch?: string;
      media?: string;
      recovery?: string;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit?: string;
    webcast?: string;
    youtube_id?: string;
    article?: string;
    wikipedia?: string;
  };
  auto_update: boolean;
}

interface Failure {
  time: number;
  altitude?: number;
  reason: string;
}

interface Crew {
  crew: string;
  role: string;
}

interface Core {
  core: string;
  flight: number;
  gridfins?: boolean;
  legs?: boolean;
  reused?: boolean;
  landing_attempt?: boolean;
  landing_success?: boolean;
  landing_type?: string;
  landpad?: string;
}