import './globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '../../node_modules/@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import Nav from './components/Nav'
import UserProvider from '../context/user'


export const metadata = {
  title: 'Hyrule Archives',
  description: 'Information about The Legend of Zelda: Tears of the Kingdom',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
        <body>
          <UserProvider>
              <header>
              <Nav />
            </header>
            <main>
              {children}
              </main>
          </UserProvider>
        </body>
      
    </html>
  )
}
