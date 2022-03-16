import Layout from '../components/Layout'
import '../styles/globals.css'
import Header from '../components/Header'
import { Store } from '../components/Store'
import Sidebar from '../components/Sidebar'

function MyApp({ Component, pageProps }) {
  return <Store>
    <Layout>
      <Header />
      <div className="flex md:flex-row flex-col container">
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </Layout>
  </Store>
}

export default MyApp
