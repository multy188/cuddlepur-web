import Dashboard from '../Dashboard';

export default function DashboardExample() {
  return (
    <Dashboard 
      userName="Alex"
      onNavigate={(page) => console.log('Navigate to:', page)}
    />
  );
}