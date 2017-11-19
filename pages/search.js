import React from 'react';
import fetch from 'node-fetch';
import {
  Table,
} from 'semantic-ui-react';

import Layout from '../app/Layout';

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const searchPhrase = query.q;
    const res = await fetch(`https://api.scryfall.com/cards/search?q=${searchPhrase}`);
    const statusCode = res.status;
    const json = await res.json();

    return { json, statusCode };
  }

  render() {
    const rows = this.props.statusCode === 200 ?
      this.props.json.data.map((card => (
        <Table.Row key={card.id}>
          <Table.Cell>{ card.name }</Table.Cell>
          <Table.Cell>{ card.set_name }</Table.Cell>
          <Table.Cell>{ card.mana_cost }</Table.Cell>
          <Table.Cell>{ card.eur ? `${card.eur}€` : 'N/A' }</Table.Cell>
        </Table.Row>
      ))) : [];
    return (
      <Layout>
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
