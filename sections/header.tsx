import React from 'react'
import Link from 'next/link'
import tw from 'twin.macro'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import GitHubButton from 'react-github-btn'

const menus = [
   {
      label: 'Text',
      link: '/text',
      links: [
         {
            label: 'Camel Case',
            url: '/text?translator=camel-case',
         },
         {
            label: 'Kebab Case',
            url: '/text?translator=kebab-case',
         },
         {
            label: 'Snake Case',
            url: '/text?translator=snake-case',
         },
         {
            label: 'Start Case',
            url: '/text?translator=start-case',
         },
         {
            label: 'Lower Case',
            url: '/text?translator=lower-case',
         },
         {
            label: 'Upper Case',
            url: '/text?translator=upper-case',
         },
         {
            label: 'Capitalize',
            url: '/text?translator=capitalize',
         },
      ],
   },
]

const Header: NextPage = () => {
   const router = useRouter()
   const [isMenuOpen, setIsMenuOpen] = React.useState(false)

   React.useEffect(() => {
      if (isMenuOpen) {
         setIsMenuOpen(!isMenuOpen)
      }
   }, [router.asPath])

   return (
      <header tw="relative h-12 border-b border-[#25252a] pr-4 flex items-center justify-between">
         <div tw="pl-2 flex items-center">
            <button
               title="Menu"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               tw="rounded mr-2 h-8 w-8 flex items-center justify-center hover:bg-[#25252a]"
            >
               <MenuIcon />
            </button>
            <h2>
               <Link href="/">
                  <a>Transcode</a>
               </Link>
            </h2>
         </div>
         <div tw="h-[20px] flex gap-2">
            <GitHubButton
               data-show-count="true"
               href="https://github.com/prvnbist"
               aria-label="Follow @prvnbist on GitHub"
               data-color-scheme="no-preference: dark; light: light; dark: dark;"
            >
               Follow @prvnbist
            </GitHubButton>
            <GitHubButton
               data-show-count="true"
               data-icon="octicon-star"
               href="https://github.com/prvnbist/transcode"
               aria-label="Star prvnbist/transcode on GitHub"
               data-color-scheme="no-preference: dark; light: light; dark: dark;"
            >
               Star
            </GitHubButton>
         </div>
         {isMenuOpen && (
            <ul tw="p-16 z-10 bg-black/40 absolute h-[calc(100vh - 48px)] inset-0 top-[48px]">
               {menus.map(menu => (
                  <LinkSection
                     key={menu.label}
                     label={menu.label}
                     link={menu.link}
                     links={menu.links}
                  />
               ))}
            </ul>
         )}
      </header>
   )
}

export default Header

const MenuIcon = (): JSX.Element => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         tw="h-5 w-5"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         strokeWidth={2}
      >
         <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h8m-8 6h16"
         />
      </svg>
   )
}

type LinkProp = { label: string; url: string }

type LinkSectionProps = {
   label: string
   link: string
   links: Array<LinkProp>
}

const LinkSection = ({ link, label, links }: LinkSectionProps): JSX.Element => {
   return (
      <li>
         <Link href={link} passHref>
            <a tw="inline-flex mb-3 text-lg border-b border-transparent cursor-pointer outline-none focus:(border-yellow-300 text-yellow-300) hover:(border-yellow-300 text-yellow-300)">
               {label}
            </a>
         </Link>
         <ol tw="pl-5">
            {links.map((link: LinkProp) => (
               <LinkItem label={link.label} url={link.url} />
            ))}
         </ol>
      </li>
   )
}

type LinkItemProps = {
   url: string
   label: string
}

const LinkItem = ({ url, label }: LinkItemProps): JSX.Element => {
   return (
      <li tw="list-decimal">
         <Link href={url} passHref>
            <a tw="text-sm font-light border-b border-transparent cursor-pointer outline-none focus:(border-yellow-300 text-yellow-300) hover:(border-yellow-300 text-yellow-300)">
               {label}
            </a>
         </Link>
      </li>
   )
}
