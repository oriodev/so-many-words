import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  
  return (
    <div className="flex flex-col min-h-screen">

      {/* NAV BAR */}
      <div className="flex justify-around pt-5">
        <h1 className="text-2xl">So Many Words</h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/docs">Something</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/docs">Something Else</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/docs">Another Something</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/docs">All The Links</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link href={'/login'}>
          <Button size={'lg'}>Login</Button>
        </Link>
      </div>

      <Separator className="mt-5"/>

      {/* CENTER */}
      <div className="w-full h-full flex flex-grow flex-col gap-10 justify-center items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-6xl text-center">Track your wordcount</h2>
          <h2 className="text-6xl text-center text-blue-300">Admire your progress</h2>
        </div>

        <div className="flex gap-5">
          <Link href={'/login'}>
            <Button size={'lg'} className="hover:cursor-pointer">Log In</Button>
          </Link>
          <Link href={'/signup'}>
            <Button size={'lg'} className="hover:cursor-pointer">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}