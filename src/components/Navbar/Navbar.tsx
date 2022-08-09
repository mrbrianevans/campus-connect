import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import navbarStyles from '../../styles/navbar.module.css'

interface NavbarProps {
    content: { title: string; url: string }[]
}

export default function Navbar(props: NavbarProps) {
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        window.addEventListener('resize', () => setClicked(false))
    })

    const onClick = () => {
        setClicked(!clicked)
    }

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
                    integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu"
                    crossOrigin="anonymous"
                ></link>
            </Head>
            <nav className={navbarStyles.NavbarItems}>
                <h1 className={navbarStyles.navbarlogo}>
                    <a href="/">Campus Connect</a>
                </h1>
                <div className={navbarStyles.menuicon} onClick={onClick}>
                    <i
                        className={
                            clicked
                                ? 'fas fa-times ' + navbarStyles.fa_times
                                : 'fas fa-bars ' + navbarStyles.fa_bars
                        }
                    ></i>
                </div>
                <ul
                    className={
                        clicked
                            ? navbarStyles.navmenu_active
                            : navbarStyles.navmenu
                    }
                >
                    {props.content.slice(0, 5).map((item, index) => {
                        return (
                            <li key={index} style={{ listStyleType: 'none' }}>
                                <a
                                    className={navbarStyles.navlinks}
                                    href={item.url}
                                >
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}
