import type { DashboardData } from '../types/dashboard';
import dashboardMock from '../mocks/dashboard.json';
import historyMockRaw from '../mocks/prediction-history.json';
import type { PredictionHistoryItem } from '../types/history';

const historyMock = historyMockRaw as unknown as PredictionHistoryItem[];
import type { StudentPredictionResult } from '../types/prediction';
import type { ActivityTimelineEvent } from '../types/dashboard';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  /**
   * Retrieves dashboard aggregated statistics and metrics from the FastAPI server.
   */
  async getDashboardData(): Promise<DashboardData> {
    console.log('Fetching dashboard stats from Python FastAPI...');
    const response = await fetch('http://127.0.0.1:8080/dashboard/stats');
    if (!response.ok) {
      throw new Error('Không thể tải dữ liệu thống kê từ máy chủ.');
    }
    return await response.json();
  }
};
