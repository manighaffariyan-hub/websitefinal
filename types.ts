
export interface Idea {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export interface Reminder {
  id: string;
  date: string; // ISO format YYYY-MM-DD
  title: string;
  description: string;
  platform: 'Instagram' | 'Twitter' | 'LinkedIn' | 'TikTok' | 'Other';
}

export type View = 'home' | 'schedule' | 'ideas' | 'analytics';

export interface AnalyticsData {
  name: string;
  reach: number;
  engagement: number;
  growth: number;
}
