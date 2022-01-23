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
        <H level="2" extra="👋">
          Hi.
        </H>
        <p className="tracking-tight mb-6 text-xl">
          I'm a software engineer, specializing in front-end, with over a decade
          of experience in building products & leading/building teams.
        </p>
        <p className="tracking-tight mb-6 text-xl">
          Currently based in Amsterdam, the Netherlands & working as Staff
          Software Engineer at{' '}
          <a target="_blank" rel="noreferrer noopener" href="http://miro.com">
            Miro
          </a>
          .
        </p>

        <Contact social={social} />
      </Layout>

      <div>
        <Layout>
          <List
            title="Talks & Interviews"
            posts={[
              {
                date: '2021-01-23',
                item: (
                  <div className="flex items-center">
                    <AiFillAudio title="Podcast" className="mr-2" />
                    <div className="mr-2">
                      <a
                        href={interviews.nullplusplus[1]}
                        target="_blank"
                        className="lg:p-2 after:content-['_↗']"
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
                    <div className="mr-2">
                      <a
                        href={interviews.devtomanager[1]}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="lg:p-2 after:content-['_↗']"
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
                      <div className="mr-2">
                        <a
                          href={`https://www.youtube.com/watch?v=${talks.AmsterdamJS[1]}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="lg:p-2 after:content-['_↗']"
                        >
                          Automating front-end refactoring
                        </a>
                        {' - '}(
                        <a
                          href={talks.AmsterdamJS[0]}
                          className="lg:p-2 after:content-['_↗']"
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

      <div>
        <Layout>
          <List
            title="Blog"
            posts={posts.map((p) => ({
              date: p.date,
              item: (
                <Link href={p.slug}>
                  <a className="lg:p-2">{p.title}</a>
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
