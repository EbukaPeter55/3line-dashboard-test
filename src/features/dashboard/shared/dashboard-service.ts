import {FullDashboardData} from './dashboard-types';
import {MOCK_FULL_DASHBOARD_DATA} from './dashboard-constant';

const DOMAINS_API_URL = import.meta.env.VITE_DOMAINS_API_URL;

const MERGED_DASHBOARD_BIN_URL = `${DOMAINS_API_URL}/latest`;


export async function fetchFullDashboardData(): Promise<FullDashboardData> {
    try {
        const response = await fetch(MERGED_DASHBOARD_BIN_URL, {
            // next: { revalidate: 3600 } // Removed: This is a Next.js specific fetch option
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch dashboard data from JSON Bin: ${response.status} ${response.statusText}, Body: ${errorText}`);
            throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
        }

        const data = await response.json();
        return data?.record;

    } catch (error) {
        console.error("Error fetching full dashboard data from JSON Bin:", error);
        return MOCK_FULL_DASHBOARD_DATA; // Fallback to mock data on error
    }
}