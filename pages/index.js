import React from 'react';
import Router from 'next/router';
import {
  Button,
  Form,
  Segment,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react';

import Layout from '../app/Layout';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPhrase: '',
    };

    this.handleSearchPhraseChange = this.handleSearchPhraseChange.bind(this);
    this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
  }

  handleSearchPhraseChange(event) {
    this.setState({
      searchPhrase: event.target.value,
    });
  }

  redirectToSearchPage() {
    Router.push({
      pathname: '/search',
      query: { q: this.state.searchPhrase },
    });
  }

  render() {
    return (
      <Layout>
        <Segment
          textAlign="center"
          style={{ minHeight: '100vw', marginTop: '200px' }}
          vertical
        >
          <Container text>
            <Header
              content="DevCollege Combo Card Search!"
            />
            <Form>
              <Form.Field>
                <label>Search for cards</label>
                <input placeholder="Type search phrase" value={this.state.searchPhrase} onChange={this.handleSearchPhraseChange} />
              </Form.Field>
              <Button onClick={this.redirectToSearchPage}>
                Submit
                <Icon name="right arrow" />
              </Button>
            </Form>
          </Container>
        </Segment>
      </Layout>
    );
  }
}
