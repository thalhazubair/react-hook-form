import { Inter } from 'next/font/google'
import Add from '../components/add/Add'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <Add/>
    </>
  )
}
