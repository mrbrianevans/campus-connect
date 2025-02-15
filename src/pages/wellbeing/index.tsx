import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Navbar from '../../components/Navbar/Navbar'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

export default function Posts() {
    const { data, status } = useSession()
    const loading = useMemo(() => status === 'loading', [status])
    const session = useMemo(() => data ?? undefined, [data])
    if (loading) {
        return <></>
    }
    return (
        <>
            <div className={styles.riverBackground} />
            <div className={styles.container}>
                <Head>
                    <title>Campus Connect</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <>
                    {!session && (
                        <>
                            <Navbar
                                content={[
                                    { title: 'Articles', url: '/articles' },
                                    { title: 'Posts', url: '/posts' },
                                    { title: 'Groups', url: '/groups' },
                                    { title: 'Log In', url: '/login' },
                                    { title: 'Register', url: '/register' }
                                ]}
                            />
                        </>
                    )}
                    {session && (
                        <>
                            <Navbar
                                content={[
                                    { title: 'Articles', url: '/articles' },
                                    { title: 'Posts', url: '/posts' },
                                    { title: 'Groups', url: '/groups' },
                                    { title: 'My Account', url: '/profile' }
                                ]}
                            />
                        </>
                    )}
                </>
                <main className={styles.main}>
                    <h1 className={styles.title}> Well-being</h1>

                    <p className={styles.description}>
                        Take your Well-being assessment now!
                    </p>

                    <div className={styles.card}>
                        <a href="/wellbeing/quiz">Begin Quiz.</a>
                    </div>
                    <div className={styles.card}>
                        <a href="/groups/12">Well-being group</a>
                    </div>
                </main>

                <footer className={styles.footer}>
                    Programmed by Brian Evans, Adam Tweedie, Alex Rundle, Toby
                    Trounce and Matthew Hudson
                </footer>
            </div>
        </>
    )
}
