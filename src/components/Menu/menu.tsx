import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { SubMenuPropsInterface } from './SubMenu/subMenu';
import { MenuItemPropsInterface } from './MenuItem/menuItem';

export interface MenuPropsInterface extends Partial<React.HTMLAttributes<HTMLElement>> {
  /** 默认高亮索引，如果子菜单没有给定index值，会默认以字符串"\_\_index\_\_" (例如：\_\_1\_\_)的形式书写 */
  activeIndex?: React.Key;
  /** 排列方式,默认给定的是水平方式 */
  mode?: 'horizontal' | 'vertical';
  /** 当menu是垂直排列时，需要默认打开submenus的下标*/
  defaultOpenSubmenus?: React.Key[];
}

//context interface ，接口
interface MenuContextInterface {
  activeIndex?: React.Key; //高亮的索引
  isHorizontal: boolean; //当前组件是否水平
  defaultOpenSubmenus: React.Key[]; //默认打开的submenus
  changeActiveIndex: ((activeIndex: React.Key) => void) | null; //切换高亮时的回调, tip:函数类型需要加上括号，否则会报错
}

//context默认值（ 当前激活的key,改变激活key的方法，模式，默认打开属性）
export const MenuContext = createContext<MenuContextInterface>({
  activeIndex: -1, //默认下标索引是-1，表示不选中任意。
  changeActiveIndex: null, //切换的回调
  isHorizontal: true, //是否垂直
  defaultOpenSubmenus: [], //垂直打开的下标
});

/** menu菜单组件 */
const Menu: React.FC<MenuPropsInterface> = ({
  className,
  mode = 'horizontal', //默认垂直排列
  activeIndex = -1, //默认激活下标-1，表示不激活。
  children,
  defaultOpenSubmenus = [],
  ...restProps
}) => {
  //state 存储聚焦元素的下标
  const [currentActiveIndex, setCurrentActiveIndex] = useState<React.Key>(activeIndex);

  //menu元素的类名
  const classes = classNames('fw-menu', className, {
    'fw-menu-vertical': mode === 'vertical',
    'fw-menu-horizontal': mode !== 'vertical',
  });

  //回调函数，设置聚焦元素的下标
  const handleClick = (activeIndex: React.Key) => {
    setCurrentActiveIndex(activeIndex);
  };

  // context更新。
  const passedContext: MenuContextInterface = {
    activeIndex: currentActiveIndex,
    isHorizontal: mode === 'horizontal',
    defaultOpenSubmenus: defaultOpenSubmenus,
    changeActiveIndex: handleClick,
  };

  /**
   * tip:
   *   如果直接使用children.map() 会出错:
   *    1.当子节点不存在的时候children,children是undefined会出错, 可以使用React.Children.map处理。
   *    2.一个子节点的时候是一个对象，多个子节点是数组。
   */

  //用于处理是否有重复的值。
  const repeatMap = new Map();

  //渲染孩子节点
  const renderChildren = () => {
    //判断menu组件中的children是否是menuItem或者SubMenu，
    return React.Children.map(children, (child, index) => {
      //React.FunctionComponentElement 表示一个函数创建的元素，每个子元素
      const childElement = child as React.FunctionComponentElement<SubMenuPropsInterface | MenuItemPropsInterface>;
      //子组件一定要有 component.displayName 才能够区分。
      const { displayName } = childElement.type;
      if (displayName === 'SubMenu' || displayName === 'MenuItem') {
        //判断是否传入了index值，如果传入了index值就使用index值，如果没有就使用下标。
        if (childElement.props.index) {
          // 借助map判断是否重复
          repeatMap.has(childElement.props.index)
            ? console.error('index can not repeat') //如果重复提示错误，但不会终止渲染。
            : repeatMap.set(childElement.props.index, childElement.props.index);
          //react.cloneElement，用于复制元素
          return React.cloneElement(childElement, { index: childElement.props.index, className: 'menu-item' });
        } else {
          //如果没有提供index, 默认以“__index__” 字符串作为 index,
          return React.cloneElement(childElement, { index: `__${index}__`, className: 'menu-item' });
        }
      } else {
        console.error('warning:Menu children must be MenuItem!');
      }
    });
  };

  return (
    <>
      <ul className={classes} {...restProps}>
        {/* 为什么需要context？ 因为需要传递 activeIndex 给某一个具体的item,而item是通过children创建的，因此不能定位，只能使用props*/}
        <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
      </ul>
    </>
  );
};

Menu.displayName = 'Menu';

export default Menu;
