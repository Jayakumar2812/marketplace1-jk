
import Link from "next/link"
import React from "react"
import { useRouter } from "next/router"

export default function ActiveLink({children,ActiveLinkClass,...props}){

    const {pathname} = useRouter()

    let className = children.props.className || ""

    if (pathname === props.href){
        className = `${className} ${ActiveLinkClass ? ActiveLinkClass:"text-indigo-700"}`
    }

    return (
        <Link {...props}>
            {
                React.cloneElement(children,{className})
            }    
        </Link>
    )
}