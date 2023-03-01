export default async function RestrictedLayout({ children }: React.PropsWithChildren) {
  return <div className="flex flex-col flex-grow grainy-bg dark:bg-base-900/75 bg-base-100/75">{children}</div>;
}
