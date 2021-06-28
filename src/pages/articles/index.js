import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { getDatabasePool } from '../../database/db-connect'
import postStyles from '../../styles/post.module.css'
import Navbar from '../../components/Navbar/Navbar'
import { useSession } from 'next-auth/client'

export default function Posts({ posts }) {
    const [session, loading] = useSession()
    if (loading) {
        return <></>
    }
    return (
        <>
            <div className={styles.laverBackground} />
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
                    <h1 className={styles.title}> Articles</h1>

                    <p className={styles.description}>
                        View articles written by other students
                    </p>
                    {session && (
                        <a
                            href={'/articles/newpost'}
                            className={postStyles.newpostlink}>
                            New Article
                        </a>
                    )}
                    <div className={postStyles.postsContainer}>
                        {posts.map((post) => (
                            <a
                                key={post.post_id}
                                href={'/articles/' + post.post_id}
                                className={postStyles.post}>
                                <a
                                    className={postStyles.groupTag}
                                    href={'/groups/' + post.group_id}>
                                    {post.group_name}
                                </a>
                                <h3>{post.post_title}</h3>
                                <p>
                                    Written by {post.author} on{' '}
                                    {new Date(post.timestamp).toDateString()}
                                </p>
                                <p>
                                    Viewed a total of {post.views || 0} time
                                    {post.views != 1 ? 's' : ''} by{' '}
                                    {post.unique_views} unique user
                                    {post.unique_views != 1 ? 's' : ''}
                                </p>
                            </a>
                        ))}
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

export async function getServerSideProps() {
    const pool = getDatabasePool()
    const { rows: posts } = await pool.query(`
        WITH recent_posts AS (
            SELECT p.id                            AS post_id,
                   p.posttitle                     AS post_title,
                   p.postcontent                   AS post_body,
                   u.firstname || ' ' || u.surname AS author,
                   p.timestamp::text               AS timestamp,
                   g.groupname                     AS group_name,
                   g.id                            AS group_id,
                   (
                       SELECT COUNT(distinct pvv.username)
                       FROM post_views pvv
                       WHERE pvv.post_id = p.id
                   )                               as unique_views,
                   (
                       SELECT COUNT(*)
                       FROM post_views pvv
                       WHERE pvv.post_id = p.id
                         AND pvv.timestamp > NOW() - INTERVAL '60 min'
                   )                               as views_last_hour,
                   (
                       SELECT COUNT(*)
                       FROM post_views pvv
                       WHERE pvv.post_id = p.id
                   )                               as views
            FROM posts p,
                 users u,
                 groups g
            WHERE p.userid = u.id
              AND g.id = p.groupid
              AND LENGTH(p.postcontent) > 250
            ORDER BY p.timestamp DESC
            LIMIT 20)
        SELECT *
        FROM recent_posts
        ORDER BY timestamp DESC;
    `)

    await pool.end()
    return {
        props: {
            posts: posts
        }
    }
}
