import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout";
import { Container, Button } from 'react-bootstrap';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
export const query = graphql`
query ($slug: String!){
  contentfulBlogPost(slug: {eq :$slug}){
   title
   createdDate
   body{
     json
   }
 }
 }
`
function blogDetail(props) {
  const data = props.data.contentfulBlogPost
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        return <img src={node.data.target.fields.file['en-US'].url}
          alt={node.data.target.fields.title['en-US']}
          width="100%" />
      }
    }
  }
  return (
    <Layout>
      <Container className="pt-4" style={{ maxWidth: 640 }}>
        <h1>{data.title}</h1>
        <p>{data.createdDate}</p>
        {documentToReactComponents(data.body.json, options)}
      </Container>
      <Container className="text-center">
        <Button href="/" variant="outline-info">一覧へ戻る</Button>
      </Container>
    </Layout >
  )
}
export default blogDetail