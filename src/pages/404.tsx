import * as React from 'react'
import Helmet from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'
import Layout from '../components/Layout'
import Back from '../components/Back'
import Footer from '../components/Footer'
import gif from '../../static/img/404.gif'

interface Data {
	site: {siteMetadata: {author: string}}
}

export default function Error() {
	return (
		<StaticQuery
			query={graphql`
				query errorQuery {
					site {
						siteMetadata {
							author
						}
					}
				}
			`}
			render={(data: Data) => (
				<Layout>
					<Helmet>
						<title>Oops - page not found 🙈</title>
					</Helmet>
					<Back />
					<h2>Sorry! 😰, this page was not found.</h2>
					<img src={gif} alt="" style={{maxWidth: '100%'}} />
					<Footer author={data.site.siteMetadata.author} />
				</Layout>
			)}
		/>
	)
}
