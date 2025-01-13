import { Header } from '@/app/dashboard/_components/header';
import { OrderProvider } from '@/providers/order';
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <OrderProvider>{children}</OrderProvider>
    </>
  );
}
