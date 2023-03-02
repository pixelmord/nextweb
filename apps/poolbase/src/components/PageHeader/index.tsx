export default function PageHeader({ children }: React.PropsWithChildren) {
  return (
    <header className="bg-white/75 shadow-xl shadow-accent-600/50 dark:bg-black/75 grainy-bg mb-12">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">{children}</div>
    </header>
  );
}
