import { ReactQueryProvider } from '@/components/provider/react-qeury-provider'

export default function Layout({
  children,
  dehydratedState,
}: {
  children: React.ReactNode
  dehydratedState?: unknown
}) {
  return (
    <ReactQueryProvider dehydratedState={dehydratedState}>
      {children}
    </ReactQueryProvider>
  )
}
