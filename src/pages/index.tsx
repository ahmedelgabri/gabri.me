import * as React from 'react'
import Link from 'next/link'
import {GoDeviceCameraVideo} from 'react-icons/go'
import {AiFillAudio} from 'react-icons/ai'
import {RiArticleLine} from 'react-icons/ri'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Contact from '../components/Contact'
import List from '../components/List'
import Footer from '../components/Footer'
import H from '../components/Prose/H'
import meta from '../config/meta'
import {getAllPosts} from '../lib/utils'

const {author, social, talks, interviews, title, siteUrl} = meta

export async function getStaticProps() {
  const posts = await getAllPosts()

  return {
    props: {
      posts,
    },
  }
}

export default function Index({posts}: any) {
  return (
    <>
      <Meta title={`${author} | ${title}`} url={siteUrl} />
      <Layout>
        <Header />
      </Layout>
      <Layout>
        <H level="2">Hi. 👋</H>
        <p className="tracking-tight mb-6 text-xl">
          I'm a software engineer, specializing in front-end, With over a decade
          of experience in building products & leading/building teams.
        </p>
        <p className="tracking-tight mb-6 text-xl">
          Currently based in Amsterdam, the Netherlands & working as Tech Lead,
          Platform at{' '}
          <a target="_blank" rel="noreferrer noopener" href="http://miro.com">
            Miro
          </a>
          .
        </p>

        <Contact social={social} />
      </Layout>

      <div className="bg-gray-400 dark:bg-gray-800 bg-opacity-30">
        <Layout>
          <List
            title="Talks & Interviews"
            posts={[
              {
                date: '2021-01-23',
                item: (
                  <div className="flex items-center">
                    <AiFillAudio title="Podcast" className="mr-2" />
                    <div>
                      <a
                        href={interviews.nullplusplus[1]}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Null++ Podcast (Arabic)
                      </a>
                    </div>
                  </div>
                ),
              },
              {
                date: '2018-12-17',
                item: (
                  <div className="flex items-center">
                    <RiArticleLine title="Interview" className="mr-2" />
                    <div>
                      <a
                        href={interviews.devtomanager[1]}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        DevToManager Interview
                      </a>
                    </div>
                  </div>
                ),
              },
              {
                date: '2017-06-08',
                item: (
                  <>
                    <div className="flex items-center">
                      <GoDeviceCameraVideo
                        title="Conference talk"
                        className="mr-2"
                      />
                      <div>
                        <a
                          href={`https://www.youtube.com/watch?v=${talks.AmsterdamJS[1]}`}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Automating front-end refactoring
                        </a>
                        {' - '}(
                        <a
                          href={talks.AmsterdamJS[0]}
                          className="italic"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          slides
                        </a>
                        )
                      </div>
                    </div>
                  </>
                ),
              },
            ]}
          />
        </Layout>
      </div>

      <div className="bg-gray-600 dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-100">
        <Layout>
          <List
            title="Blog"
            posts={posts.map((p) => ({
              date: p.date,
              item: (
                <Link href={p.slug}>
                  <a>{p.title}</a>
                </Link>
              ),
            }))}
          />
          <Footer />
        </Layout>
      </div>
    </>
  )
}
