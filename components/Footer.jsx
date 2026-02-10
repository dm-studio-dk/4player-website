import Link from "next/link"
import CircleLogo from "./CircleLogo"

export default function Footer({
    links = [],
    social = {},
    contact,
    description,
}) {
    return (
        <div>
            {/* <NewsletterForm {...newsletter} /> */}
            <footer className="px-6 pt-20 pb-12 font-serif text-center text-white bg-green-dark">
                <div className="flex flex-col items-center w-full text-center meta lg:col-span-6">
                    <div className="logo">
                        <Link href="/">
                            <img 
                                src="/assets/images/4player-logo.svg" 
                                alt="4player logo" 
                                className="h-12 w-auto"
                            />
                        </Link>
                    </div>
                    <p className="max-w-[45ch] text-lg mt-11">{description}</p>
                    <div className="mt-10 space-y-2 text-base whitespace-pre address">
                        <p>{contact.address}</p>
                        <a
                            className="block text-center"
                            href={"tel:" + contact.phone}>
                            {contact.phone}
                        </a>
                        <a
                            className="block text-center"
                            href={"mailto:" + contact.email.toLowerCase()}>
                            {contact.email}
                        </a>
                    </div>
                    <div className="flex space-x-4 socials mt-7">
                        {social.instagram && (
                            <a href={social.instagram} target="_blank">
                                <img
                                    className="w-6 h-6"
                                    src="/assets/icons/logo-instagram.svg"
                                />
                            </a>
                        )}
                        {social.facebook && (
                            <a href={social.facebook} target="_blank">
                                <img
                                    className="w-6 h-6"
                                    src="/assets/icons/logo-facebook.svg"
                                />
                            </a>
                        )}
                        {social.twitter && (
                            <a href={social.twitter} target="_blank">
                                <img
                                    className="w-6 h-6"
                                    src="/assets/icons/logo-twitter.svg"
                                />
                            </a>
                        )}
                    </div>
                </div>
                <div className="container relative mx-auto">
                    <ul className="flex flex-col justify-center pt-16 mx-auto font-serif italic lg:space-x-10 lg:bottom-0 lg:pt-0 nav col-span-full lg:col-span-6 lg:absolute left-1/2 top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex-row">
                        {links.map((link) => (
                            <li key={link.url + link.label}>
                                <a href={link.url} target="_blank">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col items-center justify-between w-full mt-24 lg:flex-row">
                        <div className="logo">
                            <p>&copy; 4player</p>
                        </div>
                        <div className="hidden logo lg:block">
                            
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
