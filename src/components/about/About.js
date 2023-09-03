import React from "react";
import { Container, Header, Segment, Grid } from "semantic-ui-react";

const AboutPage = () => {
  return (
    <Container text>
      <Header as="h1" textAlign="center">
        About KhanLibrary
      </Header>
      <Segment raised>
        <Grid stackable divided="vertically">
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h2">Our Mission</Header>
              <p>
                Welcome to KhanLibrary, your ultimate destination for
                literature, knowledge, and exploration. We are more than just a
                library; we are a community of book lovers, learners, and
                thinkers dedicated to the pursuit of wisdom and understanding.
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h3">Fostering a Love for Reading</Header>
              <p>
                We are passionate about fostering a love for reading in people
                of all ages. Whether you're a seasoned bibliophile or just
                beginning your reading journey, we have something to offer. Our
                diverse collection of books spans various genres, from classic
                literature to contemporary bestsellers, ensuring there's a book
                for everyone.
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h3">Promoting Lifelong Learning</Header>
              <p>
                Learning doesn't stop after formal education; it's a lifelong
                journey. KhanLibrary is your partner in this journey, providing
                access to an extensive range of educational resources. From
                textbooks to research papers, our library supports continuous
                learning and intellectual growth.
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h3">Building a Community of Knowledge Seekers</Header>
              <p>
                We believe that knowledge is best when shared. KhanLibrary
                serves as a hub for knowledge seekers to come together, exchange
                ideas, and engage in meaningful discussions. Join our community
                and be a part of the quest for knowledge.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default AboutPage;
