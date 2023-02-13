import QueryClientProvider from '@/components/QueryClientProvider';
export default async function RestrictedLayout({ children }: React.PropsWithChildren) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
