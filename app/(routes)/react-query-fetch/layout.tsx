import { ReactQueryProvider } from '@/components/provider/react-qeury-provider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
