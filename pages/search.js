import React from 'react';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import {
  Table,
  Header,
} from 'semantic-ui-react';

import initStore from '../app/store';
import { fetchCards } from '../app/actions/cardsActions';
import Layout from '../app/components/Layout';

class Search extends React.Component {
  static async getInitialProps({ store, query }) {
    const searchPhrase = query.q;
    const selectedFormat = query.f;
    await store.dispatch(fetchCards(selectedFormat, searchPhrase));
    return {};
  }

  render() {
    const rows = this.props.cards.results.length !== 0 ?
      this.props.cards.results.map((card => (
        <Table.Row key={card.id}>
          <Table.Cell>
            <Link href={{ pathname: '/card', query: { id: card.id } }}>
              <a>{ card.name }</a>
            </Link>
          </Table.Cell>
          <Table.Cell>{ card.set_name }</Table.Cell>
          <Table.Cell>{ card.mana_cost }</Table.Cell>
          <Table.Cell>{ card.eur ? `${card.eur}€` : 'N/A' }</Table.Cell>
        </Table.Row>
      ))) : (
        <Table.Row textAlign="center">
          <Table.Cell colSpan="4">No cards found :(</Table.Cell>
        </Table.Row>
      );
    return (
      <Layout>
        <Header>Search results:</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Set</Table.HeaderCell>
              <Table.HeaderCell>Mana cost</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { rows }
          </Table.Body>
        </Table>
      </Layout>
    );
  }
}

export default withRedux(initStore, store => ({ cards: store.cards }))(Search);
