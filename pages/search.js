import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import {
  Table,
  Header,
} from 'semantic-ui-react';

import { fetchCards } from '../app/actions/cardsActions';
import Layout from '../app/components/Layout';

class Search extends React.Component {
  static async getInitialProps({ store, query }) {
    const searchPhrase = query.q;
    const selectedFormat = query.f;

    return await store.dispatch(fetchCards(selectedFormat, searchPhrase));
  }

  render() {
    const cards = this.props.cards.results.map((card => (
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
    )));
    const errors = this.props.cards.errors.map((error, index) => (
      <Table.Row textAlign="center" key={index}>
        <Table.Cell colSpan="4">{ error }</Table.Cell>
      </Table.Row>
    ));
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
            { cards }
            { this.props.cards.errors && errors }
          </Table.Body>
        </Table>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cards,
});

export default connect(mapStateToProps)(Search);
