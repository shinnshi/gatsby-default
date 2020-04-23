import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import { Container, Row, Col } from 'react-bootstrap'
import Kv from "../components/kv"
import BlogItem from "../components/blogitem"
const IndexPage = () => {
  const data = useStaticQuery(
    graphql`
    query  {
      allMarkdownRemark{
        edges {
          node{
            frontmatter{
              date
              title
              thumbnail  {
                name
                childImageSharp{
                  fluid{
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
    `)

  return (
    <Layout>
      <Kv />
      <Container>
        <Row>
          {
            data.allMarkdownRemark.edges.map((edge, index) => {
              return <Col sm={4} key={index} >
                <BlogItem
                  title={edge.node.frontmatter.title}
                  date={edge.node.frontmatter.date}
                  src={edge.node.frontmatter.thumbnail.childImageSharp.fluid.src} />
              </Col>
            })
          }
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
