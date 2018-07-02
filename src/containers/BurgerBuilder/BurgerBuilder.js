import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import withErrorHandler from '@hoc/withErrorHandler/withErrorHandler';
import Aux from '@hoc/Auxiliary/Aux';
import Burger from '@components/Burger/Burger';
import BuildControls from '@components/Burger/BuildControls/BuildControls';
import Modal from '@components/UI/Modal/Modal';
import Toast from '@components/UI/Toast/Toast';
import OrderSummary from '@components/Burger/OrderSummary/OrderSummary';
import Spinner from '@components/UI/Spinner/Spinner';
import axios from '@src/axios-orders';
import * as PATHS from '@constants/paths';
import * as actions from '@actions';
import { MAX_ING_ADD } from '@constants/app';

export class BurgerBuilder extends Component {
  componentDidMount() {
    this.props.onInitIngredients();
  }

  ingredientAddedHandler = id =>
    this.props.onIngredientAdded(id, this.props.orderIngredients.length);

  updatePurchaseState() {
    return this.props.orderIngredients.length > 0;
  }
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.props.onModalOpen();
    } else {
      this.props.onSetAuthRedirectPath(PATHS.CHECKOUT);
      this.props.history.push(PATHS.AUTH);
    }
  };

  purchaseCancelHandler = () => {
    this.props.onInitPurchase();
    this.props.onModalClose();
  };

  purchaseContinueHandler = () => {
    this.props.onModalClose();
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
            ingredientAdded={this.ingredientAddedHandler}
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

    const modal = this.props.isShowModal
      ? (
        <Modal show={this.props.isShowModal} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
      )
      : null;

    const toast = this.props.isShowToast
      ? (
        <Toast show={this.props.isShowToast} toastClosed={this.props.onToastClose}>
          <span>You&apos;ve reached maximum number of ingredients!!!</span>
        </Toast>
      )
      : null;

    return (
      <Aux>
        {modal}
        {toast}
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
  onModalOpen: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onToastClose: PropTypes.func.isRequired,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isShowModal: PropTypes.bool.isRequired,
  isShowToast: PropTypes.bool.isRequired,
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
  isShowModal: state.ui.isShowModal,
  isShowToast: state.ui.isShowToast,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded:
    (ingId, currIngsAmount) => dispatch(actions.initAddIngredient(ingId, currIngsAmount)),
  onIngredientRemoved:
    ingId => dispatch(actions.removeIngredient(ingId)),
  onInitIngredients:
    () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  onModalOpen: () => dispatch(actions.modalOpen()),
  onModalClose: () => dispatch(actions.modalClose()),
  onToastOpen: () => dispatch(actions.toastOpen()),
  onToastClose: () => dispatch(actions.toastClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
