'use client'
import Link from "next/link"
const SiteIcon=()=>{



    return(
        <Link href={'/'} className="flex-1">
         
          <img src="/img/icon.png" alt="Website Icon" className="h-14 hover:scale-110 transition delay-100 ease-in" />
        </Link>
    )
}
export default SiteIcon