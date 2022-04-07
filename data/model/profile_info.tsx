export type ProfileStatistic = {
    userId: number;
    activities: StatisticLog[];
    minuteSpent: StatisticLog[];
    stakingBalance: StatisticLog[];
}

export type StatisticLog = {
    count: number;
    timestamp: number;
}