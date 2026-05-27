import classNames from "classnames";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { path } from "../lib/helpers";
import NavLink from "./NavLink";

const HeaderItem = ({ item, mobile, onSubmenuShow, onSubmenuHide }) => {
    const submenuRef = useRef();
    const { events, asPath } = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const onMouseEnter = useCallback(
        (event) => {
            if (mobile) return;

            setIsOpen(true);
            onSubmenuShow?.(event.currentTarget);
        },
        [onSubmenuShow],
    );
    const onMouseLeave = useCallback(() => {
        if (mobile) return;

        setIsOpen(false);
        onSubmenuHide?.();
    }, [onSubmenuHide]);

    useEffect(() => {
        const handleRouteChangeStart = () => setIsOpen(false);
        return events.off("routeChangeStart", handleRouteChangeStart);
    }, []);

    // useEffect(() => {
    //     if (isOpen) {
    //         onSubmenuShow?.(submenuRef.current)
    //     }
    // }, [isOpen])

    if (!item) return <></>;

    if (item.external)
        return (
            <a
                href={item.url}
                target="_blank"
                className={classNames(
                    "inline-block transition-all duration-300",
                    {
                        "bg-green-light text-black-full px-4 py-2 hover:opacity-80":
                            item.isButton,
                        "mix-blend-difference hover:opacity-60": !item.isButton,
                    },
                )}
                key={item.url}
            >
                {item.label}
            </a>
        );

    if (item.linkTo)
        return (
            <NavLink
                item={item}
                isActive={asPath == `/${item.linkTo.slug.current}`}
            />
        );

    if (item.hasSubmenu) {
        return (
            <div
                className="relative cursor-default hover:underline menu-with-submenu inline-block"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => {
                    if (mobile) setIsOpen(!isOpen);
                }}
            >
                <h3
                    className={classNames(
                        "relative inline-block whitespace-nowrap",
                        item.subLinks?.some(
                            (subLink) =>
                                asPath == path(subLink.linkTo?.slug.current),
                        )
                            ? "underline mix-blend-difference"
                            : "mix-blend-difference",
                    )}
                >
                    {item.label}
                </h3>
                <div
                    ref={submenuRef}
                    onMouseLeave={onMouseLeave}
                    className={
                        "submenu-container sub-links flex flex-col" +
                        (mobile
                            ? isOpen
                                ? " block"
                                : " hidden"
                            : " absolute top-full left-0 pt-4 space-y-2 no-underline")
                    }
                >
                    {item.subLinks?.map((subLink) => (
                        <NavLink
                            key={subLink.label}
                            item={subLink}
                            isActive={
                                asPath == path(subLink.linkTo?.slug.current)
                            }
                        />
                    ))}
                </div>
            </div>
        );
    }
};

export default HeaderItem;
