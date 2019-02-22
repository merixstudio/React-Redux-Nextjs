import React from 'react';
import { connect } from 'react-redux';
import initsStore from '../app/store';

import {
  Card,
  Image,
  Icon,
} from 'semantic-ui-react';

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
    const store = this.props.getState();
    const card = store.cards.details;

    const { errors } = store.cards;
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

export default connect(initsStore)(CardDetails);
