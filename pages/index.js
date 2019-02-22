import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import initsStore from '../app/store';

import {
  Button,
  Form,
  Segment,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react';

import { fetchRandomCard } from '../app/actions/cardsActions';
import Layout from '../app/components/Layout';

class Home extends React.Component {
  static getInitialProps({ store }) {
    this.store = store;
    return {};
  }

  constructor(props) {
    super(props);
    this.state = {
      searchPhrase: '',
      selectedFormat: 'standard',
    };

    this.formats = [
      { key: 'standard', text: 'Standard', value: 'standard' },
      { key: 'modern', text: 'Modern', value: 'modern' },
      { key: 'commander', text: 'Commander', value: 'commander' },
      { key: 'legacy', text: 'Legacy', value: 'legacy' },
      { key: 'vintage', text: 'Vintage', value: 'vintage' },
    ];

    this.handleSearchPhraseChange = this.handleSearchPhraseChange.bind(this);
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.findRandomCard = this.findRandomCard.bind(this);
    this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
  }

  handleSearchPhraseChange(event) {
    this.setState({
      searchPhrase: event.target.value,
    });
  }

  handleFormatChange(event, control) {
    this.setState({
      selectedFormat: control.value,
    });
  }

  async findRandomCard() {
    const store = this.props.getState();
    await this.props.dispatch(fetchRandomCard());

    Router.push({
      pathname: '/card',
      query: { id: store.cards.details.id },
    });
  }

  redirectToSearchPage() {
    Router.push({
      pathname: '/search',
      query: { q: this.state.searchPhrase, f: this.state.selectedFormat },
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
              <Form.Group>
                <Form.Input label="Search for cards" placeholder="Type search phrase" width={12} value={this.state.searchPhrase} onChange={this.handleSearchPhraseChange} />
                <Form.Select label="Format" width={4} value={this.state.selectedFormat} options={this.formats} onChange={this.handleFormatChange} />
              </Form.Group>
              <Button onClick={this.redirectToSearchPage}>
                Submit
                <Icon name="right arrow" />
              </Button>
              <Button onClick={this.findRandomCard}>
                <Icon name="random" />
                Random!
              </Button>
            </Form>
          </Container>
        </Segment>
      </Layout>
    );
  }
}

export default connect(initsStore)(Home);
