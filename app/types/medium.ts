/**
 * Represents a single day of Medium statistics
 */
export interface DailyStats {
  date: string; // ISO format date string (YYYY-MM-DD)
  views: number; // Total views for the day
  reads: number; // Total reads for the day
  readRatio: number; // Ratio of reads to views (0-1)
  fans: number; // Number of claps/fans gained
  newFollowers: number; // New followers gained
}

/**
 * Represents statistics for a specific article
 */
export interface ArticleStats {
  id: string;
  title: string;
  url: string;
  publishDate: string; // ISO format date string (YYYY-MM-DD)
  views: number;
  reads: number;
  readRatio: number;
  fans: number;
}

/**
 * Represents aggregated statistics for a time period
 */
export interface AggregatedStats {
  startDate: string; // ISO format date string (YYYY-MM-DD)
  endDate: string; // ISO format date string (YYYY-MM-DD)
  totalViews: number;
  totalReads: number;
  avgReadRatio: number;
  totalFans: number;
  totalNewFollowers: number;
  articles: ArticleStats[];
}

/**
 * Represents a complete dataset for the dashboard
 */
export interface MediumStats {
  dailyStats: DailyStats[];
  articles: ArticleStats[];
  aggregated: AggregatedStats;
}
