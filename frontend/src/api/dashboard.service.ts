import type { DashboardData } from '../types/dashboard';

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
