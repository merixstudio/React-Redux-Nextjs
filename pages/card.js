import React from 'react';
import fetch from 'node-fetch';
import withRedux from 'next-redux-wrapper';
import {
  Card,
  Image,
  Icon,
} from 'semantic-ui-react';

import initStore from '../app/store';
import { fetchCardDetails } from '../app/actions/cardsActions';
import Layout from '../app/components/Layout';

class CardDetails extends React.Component {
  static async getInitialProps({ store, query }) {
    const card = store.getState().cards.details;
    if (card.id !== query.id || !card.id) {
      await store.dispatch(fetchCardDetails(query.id));
    }
    return {};
  }

  render() {
    const card = this.props.cards.details;
    const { errors } = this.props.cards;
    return (
      <Layout>
        { card ? <Card style={{ margin: '0 auto' }}>
          <Image src={card.image_uris.art_crop} />
          <Card.Content>
            <Card.Header>
              { card.name }
            </Card.Header>
            <Card.Meta>
              <Icon name="theme" />
              { card.mana_cost }
            </Card.Meta>
            <Card.Description>
              { card.oracle_text.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>) }
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            { card.set_name }
          </Card.Content>
        </Card> : <p> { errors.join('. ')} </p> }
      </Layout>
    );
  }
}

export default withRedux(initStore, (store) => ({ cards: store.cards }))(CardDetails);
