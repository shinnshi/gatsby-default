import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import { Container, Row, Col } from 'react-bootstrap'
import Kv from "../components/kv"
import BlogItem from "../components/blogitem"
const IndexPage = () => {
  const data = useStaticQuery(
    graphql`
    query {
      allContentfulBlogPost(sort:{
        fields: createdDate,
        order: DESC
      }){
        edges{
          node{
            title
            slug
            createdDate(formatString: "YYYY/MM/DD")
            thumbnail{
              fluid{
                src
              }
            }
          }
        }
      }
    }
    `)
  console.log({ data })
  return (
    <Layout>
      <Kv />
      <Container>
        <Row>
          {
            data.allContentfulBlogPost.edges.map((edge, index) => {
              const node = edge.node
              return <Col sm={4} key={index} >
                <BlogItem
                  title={node.title}
                  date={node.createdDate}
                  src={node.thumbnail.fluid.src}
                  link={`/blog/${edge.node.slug}`}
                />
              </Col>
            })
          }
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
