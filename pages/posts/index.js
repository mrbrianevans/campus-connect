import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { getDatabasePool } from '../../database/db-connect'
import postStyles from '../../styles/post.module.css'

export default function Posts({ posts }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Campus Connect</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    <a href={'/'}>Campus Connect</a>
                </h1>

                <p className={styles.description}>
                    View posts from other students
                </p>
                <a href={'/posts/newpost'} className={postStyles.newpostlink}>
                    New post
                </a>
                <div className={postStyles.postsContainer}>
                    {posts.map((post) => (
                        <a
                            key={post.post_id}
                            href={'/posts/' + post.post_id}
                            className={postStyles.post}>
                            <h3>{post.post_title}</h3>
                            <p>
                                {post.post_body.slice(0, 50)}
                                {post.post_body.length > 50 ? '...' : ''}
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
    )
}

export async function getStaticProps() {
    const pool = getDatabasePool()
    const { rows: posts, rowCount: postCount } = await pool.query(`
        SELECT p.id                            AS post_id,
               p.posttitle                     AS post_title,
               p.postcontent                   AS post_body,
               u.firstname || ' ' || u.surname AS author
        FROM posts p,
             users u
        WHERE p.userid = u.id
        ORDER BY timestamp DESC
        LIMIT 8;
    `)

    return {
        props: {
            posts: posts
        }
    }
}
