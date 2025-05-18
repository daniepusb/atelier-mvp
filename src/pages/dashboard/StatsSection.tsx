import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db, PROJECT_PREFIX } from "../../firebaseConfig";
import { QuoteDoc } from "../../types/firestoreSchemas";
import { AppUser } from "../../types/UserRole";
import { ChartBarIcon, CurrencyDollarIcon, ClipboardDocumentListIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

interface Props {
  user: AppUser;
}

interface StatsData {
  totalQuotes: number;
  totalAmount: number;
  totalItemsAmount: number;
  totalTasksAmount: number;
}

export const StatsSection = ({ user }: Props) => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const snapshot = await getDocs(collection(db, PROJECT_PREFIX+`brands/${user.brandId}/quotes`) );

      const now = new Date();
      const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      let totalQuotes = 0;
      let totalAmount = 0;
      let totalItemsAmount = 0;
      let totalTasksAmount = 0;

      snapshot.forEach((doc) => {
        const data = doc.data() as QuoteDoc;
        const createdAt = data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : data.createdAt;

        if (createdAt >= last30Days) {
          totalQuotes++;
          totalAmount += data.total;
          totalItemsAmount += data.item.price;
          totalTasksAmount += data.tasks.reduce((sum, task) => sum + task.price, 0);
        }
      });

      setStats({
        totalQuotes,
        totalAmount,
        totalItemsAmount,
        totalTasksAmount,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Cargando estadísticas...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Estadísticas de los últimos 30 días</h2>
      <button onClick={() => fetchStats() } >
        <ArrowPathIcon className="h-6 w-6  hover:bg-green-100 hover:border " />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Presupuestos"
          value={stats?.totalQuotes || 0}
          icon={<ClipboardDocumentListIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Total presupuestado"
          value={`$${stats?.totalAmount.toFixed(2)}` || 0}
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Total vestidos"
          value={`$${stats?.totalItemsAmount.toFixed(2)}` || 0}
          icon={<ChartBarIcon className="w-6 h-6" />}
        />
        <StatCard
          title="Total modificaciones"
          value={`$${stats?.totalTasksAmount.toFixed(2)}` || 0}
          icon={<ChartBarIcon className="w-6 h-6" />}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <p className="text-gray-700 dark:text-gray-200">
          Estos datos muestran la actividad comercial reciente, facilitando un mejor análisis del rendimiento del negocio.
        </p>
        {/* Aquí podrías agregar una gráfica en el futuro */}
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 flex items-center space-x-4">
    <div className="text-indigo-500 dark:text-indigo-400">{icon}</div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
      <p className="text-xl font-semibold text-gray-800 dark:text-white">{value}</p>
    </div>
  </div>
);
