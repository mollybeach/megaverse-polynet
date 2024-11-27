/*
 * @title: Footer
 * @path: src/components/Footer.tsx
 * @description: Footer component
 */

import { HeartFilledIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"

export function Footer() {
  return (
    <footer className="border-t bg-background dark:bg-gray-900">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center space-x-2 ml-24">
          <p className="text-sm text-muted-foreground font-medium">
            Made with <HeartFilledIcon className="inline h-4 w-4 text-red-500 mx-1" /> by
            <span className="font-semibold text-foreground hover:text-primary transition-colors ml-1 dark:text-white">
              Molly Beach
            </span>
          </p>
          <div className="flex items-center space-x-3 ml-4">
            <a href="https://github.com/mollybeach/megaverse-universe" className="text-muted-foreground hover:text-foreground transition-colors">
              <GitHubLogoIcon className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/mollybeach" className="text-muted-foreground hover:text-foreground transition-colors">
              <LinkedInLogoIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-4 text-sm">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
