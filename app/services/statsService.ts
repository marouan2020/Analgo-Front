import { MediumStats, DailyStats, ArticleStats, AggregatedStats } from '../types/medium';
import { mockMediumStats } from '../data/mockData';

/**
 * Service for handling Medium statistics data
 */
export class StatsService {
  private data: MediumStats;

  constructor(initialData: MediumStats = mockMediumStats) {
    this.data = initialData;
  }

  /**
   * Get all stats
   */
  getAllStats(): MediumStats {
    return this.data;
  }

  /**
   * Get daily stats filtered by date range
   */
  getDailyStats(startDate?: string, endDate?: string): DailyStats[] {
    if (!startDate && !endDate) {
      return this.data.dailyStats;
    }

    return this.data.dailyStats.filter((stat) => {
      const date = new Date(stat.date);
      const isAfterStart = !startDate || date >= new Date(startDate);
      const isBeforeEnd = !endDate || date <= new Date(endDate);
      return isAfterStart && isBeforeEnd;
    });
  }

  /**
   * Get article stats
   */
  getArticleStats(): ArticleStats[] {
    return this.data.articles;
  }

  /**
   * Get aggregated stats for a specific date range
   */
  getAggregatedStats(startDate?: string, endDate?: string): AggregatedStats {
    if (!startDate && !endDate) {
      return this.data.aggregated;
    }

    // Filter daily stats by date range
    const filteredDailyStats = this.getDailyStats(startDate, endDate);
    
    // Calculate aggregated stats from filtered daily stats
    const totalViews = filteredDailyStats.reduce((sum, day) => sum + day.views, 0);
    const totalReads = filteredDailyStats.reduce((sum, day) => sum + day.reads, 0);
    const avgReadRatio = totalReads / totalViews || 0;
    const totalFans = filteredDailyStats.reduce((sum, day) => sum + day.fans, 0);
    const totalNewFollowers = filteredDailyStats.reduce((sum, day) => sum + day.newFollowers, 0);
    
    // Filter articles by publish date
    const filteredArticles = this.data.articles.filter((article) => {
      const publishDate = new Date(article.publishDate);
      const isAfterStart = !startDate || publishDate >= new Date(startDate);
      const isBeforeEnd = !endDate || publishDate <= new Date(endDate);
      return isAfterStart && isBeforeEnd;
    });
    
    return {
      startDate: startDate || this.data.aggregated.startDate,
      endDate: endDate || this.data.aggregated.endDate,
      totalViews,
      totalReads,
      avgReadRatio,
      totalFans,
      totalNewFollowers,
      articles: filteredArticles
    };
  }

  /**
   * Calculate percentage change between two values
   */
  calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }

  /**
   * Get stats comparison between two periods
   */
  getStatsComparison(
    currentStartDate: string,
    currentEndDate: string,
    previousStartDate: string,
    previousEndDate: string
  ): {
    views: { current: number; previous: number; change: number };
    reads: { current: number; previous: number; change: number };
    fans: { current: number; previous: number; change: number };
    followers: { current: number; previous: number; change: number };
  } {
    const currentStats = this.getAggregatedStats(currentStartDate, currentEndDate);
    const previousStats = this.getAggregatedStats(previousStartDate, previousEndDate);
    
    return {
      views: {
        current: currentStats.totalViews,
        previous: previousStats.totalViews,
        change: this.calculatePercentageChange(currentStats.totalViews, previousStats.totalViews)
      },
      reads: {
        current: currentStats.totalReads,
        previous: previousStats.totalReads,
        change: this.calculatePercentageChange(currentStats.totalReads, previousStats.totalReads)
      },
      fans: {
        current: currentStats.totalFans,
        previous: previousStats.totalFans,
        change: this.calculatePercentageChange(currentStats.totalFans, previousStats.totalFans)
      },
      followers: {
        current: currentStats.totalNewFollowers,
        previous: previousStats.totalNewFollowers,
        change: this.calculatePercentageChange(currentStats.totalNewFollowers, previousStats.totalNewFollowers)
      }
    };
  }
}

// Export a singleton instance
export const statsService = new StatsService();
