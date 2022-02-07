import { useRouter } from "next/router"

export default function Object() {
  const router = useRouter()
  console.log('ROUTER', router.query.cadnumber)
  return <h1>{router.query.cadnumber}</h1>
}