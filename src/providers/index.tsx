import QueryProvider from './query-provider';

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
