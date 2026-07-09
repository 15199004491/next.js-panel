import { useAppStore } from '../../core/store';

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const { state } = useAppStore();
  const { sidebarOpen } = state;

  return <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>{children}</main>;
}