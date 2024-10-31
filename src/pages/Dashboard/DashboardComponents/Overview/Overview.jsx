import { useQuery } from "@tanstack/react-query";

import {
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart as RePieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";


import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const Overview = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Query for fetching tasks
    const {
        data: tasks = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const response = await axiosSecure.get("/tasks");
            // filter tasks by user email if user is logged in. only the user who created the task can see it
            return user
                ? response.data.filter((task) => task.email === user.email)
                : response.data;
        },
        refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    });

    // Analytics calculations
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    const pieData = [
        { name: "Completed", value: completedTasks, color: "#8b5cf6" },
        { name: "Pending", value: pendingTasks, color: "#6366f1" },
    ];

    const dailyProgress = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayTasks = tasks.filter(
            (t) => new Date(t.createdAt).toDateString() === date.toDateString()
        );
        return {
            date: date.toLocaleDateString("en-US", { weekday: "short" }),
            total: dayTasks.length,
            completed: dayTasks.filter((t) => t.completed).length,
        };
    }).reverse();


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black/80 border border-white/20 rounded-lg p-2 text-white">
                    <p>{`${payload[0].name} : ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">Loading tasks...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-white">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Line Chart */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-4">
                        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dailyProgress}>
                                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                                    <YAxis stroke="#94a3b8" fontSize={12} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#8b5cf6"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="completed"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-4">
                        <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={40}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </RePieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;