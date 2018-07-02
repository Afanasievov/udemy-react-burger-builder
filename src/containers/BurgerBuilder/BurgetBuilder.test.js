import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BuildControls from '@components/Burger/BuildControls/BuildControls';
import { BurgerBuilder } from './BurgerBuilder';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder
      history={{}}
      onIngredientAdded={() => {}}
      onIngredientRemoved={() => {}}
      onInitIngredients={() => {}}
      onInitPurchase={() => {}}
      isAuthenticated={false}
      onSetAuthRedirectPath={() => {}}
      onModalOpen={() => {}}
      onModalClose={() => {}}
      onToastClose={() => {}}
      isShowModal={false}
      isShowToast={false}
      error={false}
      orderIngredients={[]}
    />);
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({
      ings: { salad: { meat: 1, price: 4 } },
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
