import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { supabase } from '../utils/supabase'

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   switch (metric.name) {
//     case 'FCP':
//       console.log(`FCP: ${Math.round(metric.value * 10) / 10}`)
//       break
//     case 'LCP':
//       console.log(`LCP: ${Math.round(metric.value * 10) / 10}`)
//       break
//     case 'TTFB':
//       console.log(`TTFB: ${Math.round(metric.value * 10) / 10}`)
//       break
//     case 'Next.js-hydration':
//       console.log(
//         `Hydration: ${Math.round(metric.startTime * 10) / 10} -> ${
//           Math.round((metric.startTime + metric.value) * 10) / 10
//         }`
//       )
//       break
//     default:
//       break
//   }
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  console.log('MyApp called!!!!!!')

  const router = useRouter()
  console.log(router.pathname)
  console.log(router.query)
  const { push, pathname } = router
  // console.log(pathname)

  const validateSession = async () => {
    console.log('validateSession called')
    const user = supabase.auth.user()
    console.log(user)
    console.log(pathname)

    if (user && pathname === '/') {
      push('/dashboard')
    } else if (!user && pathname !== '/') {
      push('/')
    }
  }

  supabase.auth.onAuthStateChange((event, _) => {
    console.log(
      `onAuthStateChange called  event: ${event}, pathname: ${pathname}`
    )

    if (event === 'SIGNED_IN' && pathname === '/') {
      push('/dashboard')
    }
    if (event === 'SIGNED_OUT') {
      push('/')
    }
  })

  useEffect(() => {
    console.log('useEffect !!!!!!!!!!!!!')
    validateSession()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
