import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout";
import { Container } from 'react-bootstrap';
export const query = graphql`
query ($slug: String){
  markdownRemark(
    fields: {
      slug: {
        eq: $slug
      }
    }
  ){
    frontmatter {
      title
      date

    }
    html
  }
}
`
function blogDetail(props) {
  const data = props.data.markdownRemark
  return (
    <Layout>
      <Container className="pt-4" style={{ maxWidth: 640 }}>
        <h1>{data.frontmatter.title}</h1>
        <p>{data.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: data.html }} ></div>
      </Container>
    </Layout >
  )
}
export default blogDetail