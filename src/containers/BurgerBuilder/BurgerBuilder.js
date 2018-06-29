import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Auxiliary/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';
import * as PATHS from '../../constants/paths';
import { MAX_ING_ADD } from '../../constants/app';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState() {
    return this.props.orderIngredients.length > 0;
  }
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath(PATHS.CHECKOUT);
      this.props.history.push(PATHS.AUTH);
    }
  };

  purchaseCancelHandler = () => {
    this.props.onInitPurchase();
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push(PATHS.CHECKOUT);
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    Object.keys(disabledInfo).forEach((key) => {
      disabledInfo[key] = !this.props.orderIngredients
        .some(({ ingredientId }) => this.props.ings[key].id === ingredientId);
    });
    disabledInfo.addIng = this.props.orderIngredients.length >= MAX_ING_ADD;

    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ings={this.props.ings} orderIngredients={this.props.orderIngredients} />
          <BuildControls
            ingredients={this.props.ings}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            ordered={this.purchaseHandler}
            purchasable={this.updatePurchaseState()}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ings={this.props.ings}
          orderIngredients={this.props.orderIngredients}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

BurgerBuilder.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  ings: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
  })),
  orderIngredients: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    ingredientId: PropTypes.number,
  })).isRequired,
  price: PropTypes.number,
  error: PropTypes.bool.isRequired,
  onIngredientAdded: PropTypes.func.isRequired,
  onIngredientRemoved: PropTypes.func.isRequired,
  onInitIngredients: PropTypes.func.isRequired,
  onInitPurchase: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
};

BurgerBuilder.defaultProps = {
  ings: null,
  price: 0,
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  orderIngredients: state.burgerBuilder.orderIngredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded:
    ingName => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved:
    ingName => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients:
    () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
