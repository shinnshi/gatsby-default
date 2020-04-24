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
            fields {
              slug
            }
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
  console.log({ data })
  return (
    <Layout>
      <Kv />
      <Container>
        <Row>
          {
            data.allMarkdownRemark.edges.map((edge, index) => {
              const node = edge.node
              return <Col sm={4} key={index} >
                <BlogItem
                  title={node.frontmatter.title}
                  date={node.frontmatter.date}
                  src={node.frontmatter.thumbnail.childImageSharp.fluid.src}
                  link={`/blog/${edge.node.fields.slug}`}
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
