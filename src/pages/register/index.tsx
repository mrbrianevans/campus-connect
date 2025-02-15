import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import customStyles from '../../styles/custom.module.css'
import termsStyles from '../../styles/terms.module.css'
import Navbar from '../../components/Navbar/Navbar'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

import RegisterComponent from './RegisterComponent'

export default function Login() {
    const { data, status } = useSession()
    const loading = useMemo(() => status === 'loading', [status])
    const session = useMemo(() => data ?? undefined, [data])
    if (loading) {
        return <></>
    }
    return (
        <>
            <div className={styles.exeterStoneBackground} />
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
                <div className={styles.main}>
                    <h1 className={styles.title}> Register</h1>
                    <p className={styles.description}>
                        Get started by registering! <br></br>
                        Already got an account? <a href={'/login'}>Log in.</a>
                    </p>
                    <div className={customStyles.card}>
                        <div className={customStyles.subtitle}>Register</div>
                        <RegisterComponent />
                    </div>
                </div>
                <p className={termsStyles.smallLink}>
                    <a href={'/termsAndConditions'}>Terms and Conditions.</a>
                </p>
            </div>
        </>
    )
}
