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
<<<<<<< HEAD
    console.log('Fetching dashboard stats from Python FastAPI...');
    const response = await fetch('http://127.0.0.1:8080/dashboard/stats');
    if (!response.ok) {
      throw new Error('Không thể tải dữ liệu thống kê từ máy chủ.');
    }
    return await response.json();
=======
    await delay(400);

    // Extract recent items from prediction history mock database
    const flatHistory: StudentPredictionResult[] = [];
    let latestSingleEvent: StudentPredictionResult | null = null;

    // Process history items to extract flat predictions and find latest events
    const sortedHistory = [...historyMock].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    sortedHistory.forEach((item) => {
      flatHistory.push(...item.details);

      if (item.type === 'single' && !latestSingleEvent) {
        latestSingleEvent = (item.details[0] as StudentPredictionResult) || null;
      }
    });

    const recentPredictions = flatHistory.slice(0, 5);

    // Create a mock activity timeline based on history items
    const recentActivity: ActivityTimelineEvent[] = sortedHistory.slice(0, 4).map((item) => {
      const formattedDate = new Date(item.date).toISOString();
      const student = item.details[0] as StudentPredictionResult;
      return {
        id: `ACT-${item.id}`,
        timestamp: formattedDate,
        type: 'single',
        message: `Single prediction run completed for student ${student.studentName}. Outcome: ${student.prediction} (${Math.round(student.probability * 100)}% probability, Risk: ${student.riskLevel}).`,
        studentName: student.studentName,
        studentCode: student.studentCode,
        prediction: student.prediction,
        riskLevel: student.riskLevel
      };
    });

    return {
      stats: {
        totalPredictions: dashboardMock.stats.totalPredictions,
        singlePredictions: dashboardMock.stats.singlePredictions,
        graduateCount: dashboardMock.stats.graduateCount,
        dropoutCount: dashboardMock.stats.dropoutCount,
        enrolledCount: dashboardMock.stats.enrolledCount
      },
      distribution: dashboardMock.distribution.map((item) => ({
        label: item.label,
        value: item.value
      })),
      history: dashboardMock.history.map((item) => ({
        label: item.label,
        value: item.value
      })),
      latestSingle: latestSingleEvent,
      recentActivity,
      recentPredictions
    };
>>>>>>> 4c1a31354928868246341aefb867bd375b5cf0f6
  }
};
