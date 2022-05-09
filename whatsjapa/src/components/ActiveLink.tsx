import Link, { LinkProps } from 'next/link';
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from 'react';
interface ActiveLinkProps extends LinkProps{
  children: ReactElement;
  shouldCurrentHref: boolean;
}
//--> with ReactNode, we can get text, components and all
//--> with ReactElement, we can get only components
export function ActiveLink({
   children,
   shouldCurrentHref = false,
   ...rest
  } : ActiveLinkProps){
  let isActive = false;
  const { asPath } = useRouter();
  if((shouldCurrentHref) && (asPath === rest.href || asPath === rest.href)){
     isActive = true
   };
   if(!shouldCurrentHref &&
     (asPath.startsWith(String(rest.href))
     ||
     asPath.startsWith(String(rest.as))
   )){
     isActive = true
   }
  return(
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'cyan' : 'gray.50'
      })}
    </Link>
  )
}
