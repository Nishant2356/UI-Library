"use client"
import { useRouter } from "next/navigation"

export default function App() {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push('/button')}>Button</button>
      <button onClick={() => router.push('/card')}>Card</button>
    </div>
  )
}