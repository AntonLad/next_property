import { Divider } from "@material-ui/core"
import { useRouter } from "next/router"

export default function Object() {
  const router = useRouter()
  const info = router.query.cadnumber
  console.log('ROUTER', router.query.cadnumber)
  const LocalFlatData = JSON.parse(localStorage.getItem(`${info}`))
  return (
    <div>
      {JSON.stringify(LocalFlatData)}
    </div>
  )


}