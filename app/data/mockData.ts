import {
  MediumStats,
  DailyStats,
  ArticleStats,
  AggregatedStats,
} from "../types/medium";

// Generate daily stats for March 3 to April 3
const generateDailyStats = (): DailyStats[] => {
  // Use fixed data instead of random to avoid hydration errors
  return [
    {
      date: "2024-03-03",
      views: 245,
      reads: 132,
      readRatio: 0.539,
      fans: 18,
      newFollowers: 5,
    },
    {
      date: "2024-03-04",
      views: 312,
      reads: 178,
      readRatio: 0.571,
      fans: 24,
      newFollowers: 7,
    },
    {
      date: "2024-03-05",
      views: 287,
      reads: 156,
      readRatio: 0.543,
      fans: 21,
      newFollowers: 6,
    },
    {
      date: "2024-03-06",
      views: 325,
      reads: 189,
      readRatio: 0.582,
      fans: 26,
      newFollowers: 8,
    },
    {
      date: "2024-03-07",
      views: 298,
      reads: 165,
      readRatio: 0.554,
      fans: 22,
      newFollowers: 6,
    },
    {
      date: "2024-03-08",
      views: 356,
      reads: 210,
      readRatio: 0.59,
      fans: 29,
      newFollowers: 9,
    },
    {
      date: "2024-03-09",
      views: 278,
      reads: 148,
      readRatio: 0.532,
      fans: 19,
      newFollowers: 5,
    },
    {
      date: "2024-03-10",
      views: 342,
      reads: 198,
      readRatio: 0.579,
      fans: 27,
      newFollowers: 8,
    },
    {
      date: "2024-03-11",
      views: 305,
      reads: 172,
      readRatio: 0.564,
      fans: 23,
      newFollowers: 7,
    },
    {
      date: "2024-03-12",
      views: 367,
      reads: 220,
      readRatio: 0.599,
      fans: 31,
      newFollowers: 10,
    },
    {
      date: "2024-03-13",
      views: 289,
      reads: 158,
      readRatio: 0.547,
      fans: 21,
      newFollowers: 6,
    },
    {
      date: "2024-03-14",
      views: 334,
      reads: 195,
      readRatio: 0.584,
      fans: 27,
      newFollowers: 8,
    },
    {
      date: "2024-03-15",
      views: 312,
      reads: 175,
      readRatio: 0.561,
      fans: 24,
      newFollowers: 7,
    },
    {
      date: "2024-03-16",
      views: 378,
      reads: 230,
      readRatio: 0.608,
      fans: 33,
      newFollowers: 11,
    },
    {
      date: "2024-03-17",
      views: 301,
      reads: 168,
      readRatio: 0.558,
      fans: 22,
      newFollowers: 6,
    },
    {
      date: "2024-03-18",
      views: 345,
      reads: 205,
      readRatio: 0.594,
      fans: 28,
      newFollowers: 9,
    },
    {
      date: "2024-03-19",
      views: 323,
      reads: 185,
      readRatio: 0.573,
      fans: 25,
      newFollowers: 7,
    },
    {
      date: "2024-03-20",
      views: 389,
      reads: 240,
      readRatio: 0.617,
      fans: 35,
      newFollowers: 12,
    },
    {
      date: "2024-03-21",
      views: 310,
      reads: 175,
      readRatio: 0.565,
      fans: 23,
      newFollowers: 7,
    },
    {
      date: "2024-03-22",
      views: 356,
      reads: 215,
      readRatio: 0.604,
      fans: 30,
      newFollowers: 10,
    },
    {
      date: "2024-03-23",
      views: 334,
      reads: 195,
      readRatio: 0.584,
      fans: 26,
      newFollowers: 8,
    },
    {
      date: "2024-03-24",
      views: 401,
      reads: 250,
      readRatio: 0.624,
      fans: 37,
      newFollowers: 13,
    },
    {
      date: "2024-03-25",
      views: 320,
      reads: 185,
      readRatio: 0.578,
      fans: 24,
      newFollowers: 7,
    },
    {
      date: "2024-03-26",
      views: 367,
      reads: 225,
      readRatio: 0.613,
      fans: 32,
      newFollowers: 11,
    },
    {
      date: "2024-03-27",
      views: 345,
      reads: 205,
      readRatio: 0.594,
      fans: 28,
      newFollowers: 9,
    },
    {
      date: "2024-03-28",
      views: 412,
      reads: 260,
      readRatio: 0.631,
      fans: 39,
      newFollowers: 14,
    },
    {
      date: "2024-03-29",
      views: 330,
      reads: 195,
      readRatio: 0.591,
      fans: 26,
      newFollowers: 8,
    },
    {
      date: "2024-03-30",
      views: 378,
      reads: 235,
      readRatio: 0.622,
      fans: 34,
      newFollowers: 12,
    },
    {
      date: "2024-03-31",
      views: 356,
      reads: 215,
      readRatio: 0.604,
      fans: 30,
      newFollowers: 10,
    },
    {
      date: "2024-04-01",
      views: 423,
      reads: 270,
      readRatio: 0.638,
      fans: 41,
      newFollowers: 15,
    },
    {
      date: "2024-04-02",
      views: 340,
      reads: 205,
      readRatio: 0.603,
      fans: 28,
      newFollowers: 9,
    },
    {
      date: "2024-04-03",
      views: 389,
      reads: 245,
      readRatio: 0.63,
      fans: 36,
      newFollowers: 13,
    },
  ];
};

// Generate article stats
const generateArticleStats = (): ArticleStats[] => {
  return [
    {
      id: "1",
      title: "How to Build a NextJS App with TypeScript",
      url: "https://medium.com/article1",
      publishDate: "2024-03-05",
      views: 1250,
      reads: 780,
      readRatio: 0.624,
      fans: 95,
    },
    {
      id: "2",
      title: "The Power of React Hooks",
      url: "https://medium.com/article2",
      publishDate: "2024-03-10",
      views: 980,
      reads: 540,
      readRatio: 0.551,
      fans: 72,
    },
    {
      id: "3",
      title: "Mastering Tailwind CSS",
      url: "https://medium.com/article3",
      publishDate: "2024-03-15",
      views: 1450,
      reads: 920,
      readRatio: 0.634,
      fans: 118,
    },
    {
      id: "4",
      title: "Testing React Applications",
      url: "https://medium.com/article4",
      publishDate: "2024-03-22",
      views: 850,
      reads: 490,
      readRatio: 0.576,
      fans: 65,
    },
    {
      id: "5",
      title: "Building Accessible Web Applications",
      url: "https://medium.com/article5",
      publishDate: "2024-03-28",
      views: 1100,
      reads: 680,
      readRatio: 0.618,
      fans: 88,
    },
  ];
};

// Generate aggregated stats
const generateAggregatedStats = (
  dailyStats: DailyStats[],
  articles: ArticleStats[]
): AggregatedStats => {
  // Use fixed values instead of calculating to avoid hydration errors
  return {
    startDate: "2024-03-03",
    endDate: "2024-04-03",
    totalViews: 10869, // Fixed value
    totalReads: 6318, // Fixed value
    avgReadRatio: 0.581, // Fixed value
    totalFans: 869, // Fixed value
    totalNewFollowers: 278, // Fixed value
    articles,
  };
};

// Generate the complete dataset
export const generateMockData = (): MediumStats => {
  const dailyStats = generateDailyStats();
  const articles = generateArticleStats();
  const aggregated = generateAggregatedStats(dailyStats, articles);

  return {
    dailyStats,
    articles,
    aggregated,
  };
};

// Export the mock data
export const mockMediumStats: MediumStats = generateMockData();
