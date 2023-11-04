import { Inter } from 'next/font/google'
import Form from '../components/Form/Form'
import Add from '../components/add/Add'
import TestCase from '../components/add/TestCase'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <TestCase/>
    </>
  )
}
