export default function PageHeader({ children }: React.PropsWithChildren<{}>) {
  return (
    <header className="bg-white shadow dark:bg-black">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">{children}</div>
    </header>
  );
}
