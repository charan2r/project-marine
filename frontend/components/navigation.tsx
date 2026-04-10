"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { 
  Fish, 
  Waves, 
  BookOpen, 
  TreePine, 
  Scan, 
  Map, 
  MessageSquare, 
  User, 
  Menu,
  Compass,
  Camera,
  Globe
} from "lucide-react"

const exploreItems = [
  {
    title: "Species",
    href: "/species",
    description: "Explore marine biodiversity and discover species.",
    icon: Fish,
  },
  {
    title: "Ecosystems",
    href: "/ecosystems",
    description: "Learn about coral reefs, mangroves, and deep sea habitats.",
    icon: Waves,
  },
  {
    title: "GIS Map",
    href: "/map",
    description: "Interactive map with species distribution and observations.",
    icon: Map,
  },
]

const learnItems = [
  {
    title: "Articles",
    href: "/articles",
    description: "Educational content about marine conservation.",
    icon: BookOpen,
  },
  {
    title: "Conservation Projects",
    href: "/projects",
    description: "Real-world conservation initiatives and how to contribute.",
    icon: TreePine,
  },
]

const contributeItems = [
  {
    title: "AI Recognition",
    href: "/recognize",
    description: "Upload images to identify marine species using AI.",
    icon: Scan,
  },
  {
    title: "Observations",
    href: "/observations",
    description: "Browse and submit citizen science observations.",
    icon: Camera,
  },
  {
    title: "Forum",
    href: "/forum",
    description: "Join discussions with the marine community.",
    icon: MessageSquare,
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Globe className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg tracking-tight">OceanWatch</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                <Compass className="mr-2 h-4 w-4" />
                Explore
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {exploreItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                <BookOpen className="mr-2 h-4 w-4" />
                Learn
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  {learnItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                <Camera className="mr-2 h-4 w-4" />
                Contribute
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {contributeItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <nav className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground px-2">Explore</h4>
                  {exploreItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-accent"
                    >
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.title}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground px-2">Learn</h4>
                  {learnItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-accent"
                    >
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.title}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground px-2">Contribute</h4>
                  {contributeItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-accent"
                    >
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.title}
                    </Link>
                  ))}
                </div>
                <div className="border-t pt-4 mt-2 space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/register" onClick={() => setIsOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

interface ListItemProps {
  title: string
  href: string
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
}

function ListItem({ title, href, children, icon: Icon }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium leading-none">{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
