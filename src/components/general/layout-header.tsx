import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "~/components/ui/navigation-menu";


export function LayoutHeader() {
  return (
    <div className="flex items-center justify-between gap-4 p-4 push-in">
      {/* Left Side */}
      <div className="text-background">
        <h1 className="text-xl text-foreground">MakeUC</h1>
      </div>

      {/* Right Side */}
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Placeholder</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Random Stuff</NavigationMenuLink>
                <NavigationMenuLink>Random Stuff</NavigationMenuLink>
                <NavigationMenuLink>Random Stuff</NavigationMenuLink>
                <NavigationMenuLink>Random Stuff</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}