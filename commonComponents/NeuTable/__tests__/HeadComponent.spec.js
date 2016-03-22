jest.autoMockOff();

const React = require('react');
const {shallow} = require('enzyme');

const HeadComponent = require('../HeadComponent');

describe('< HeadComponent />', () => {
  it('render a <th> with given click handler', () => {
    const mockFn = jest.genMockFunction();
    const wrapper = shallow(
      <HeadComponent
        keyName="testKey"
        onClick={mockFn}
        orderBy={null}
        reverse={false}
        children={null}
        />
    );

    const th = wrapper.find('th');

    expect(th.length).toEqual(1);
    expect(th.prop('onClick')).toEqual(mockFn);

    th.simulate('click');
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  it('render a <th> with correct classNames', () => {
    const mockFn = jest.genMockFunction();
    const wrapper = shallow(
      <HeadComponent
        keyName="testKey"
        onClick={mockFn}
        orderBy="testKey"
        reverse={false}
        children={null}
        />
    );

    const th = wrapper.find('th');

    expect(th.length).toEqual(1);
    expect(th.prop('className')).toEqual('header sortable sort-asc');
  });

  it('render a <th> with correct classNames when reversed', () => {
    const mockFn = jest.genMockFunction();
    const wrapper = shallow(
      <HeadComponent
        keyName="testKey"
        onClick={mockFn}
        orderBy="testKey"
        children={null}
        reverse
        />
    );

    const th = wrapper.find('th');

    expect(th.length).toEqual(1);
    expect(th.prop('className')).toEqual('header sortable sort-desc');
  });

  it('render the children passed in', () => {

    const mockFn = jest.genMockFunction();
    const child = <div className="testChild" />;

    const wrapper = shallow(
      <HeadComponent
        keyName="testKey"
        onClick={mockFn}
        orderBy={null}
        children={child}
        reverse
        />
    );

    expect(wrapper.find('.testChild').length).toEqual(1);
  });

});
