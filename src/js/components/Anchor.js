// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Children, Component, PropTypes } from 'react';
import classnames from 'classnames';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import anchor from '../styles/anchor';
import colorIndex from '../styles/colorIndex';

export default class Anchor extends Component {
  render () {

    const styles = anchor(this.context.theme);
    const colors = colorIndex(this.context.theme);

    const {
      a11yTitle, children, className, disabled, href, icon, id,
      label, onClick, primary, reverse, tag, target
    } = this.props;

    let hasIcon = icon !== undefined || primary;
    let childrenNode = Children.map(children, child => {
      if (child && child.type && child.type.icon) {
        hasIcon = true;
        child = <span className={styles.icon}>{child}</span>;
      }
      return child;
    });

    let iconChild;
    let defaultIcon;
    if (icon) {
      iconChild = icon;
    } else if (primary) {
      defaultIcon = true;
      iconChild = (
        <LinkNextIcon a11yTitle={`${id || ''}anchor-next-title`}
          a11yTitleId={`${id || ''}anchor-next-title-id`} />
      );
    }

    const iconClasses = classnames(
      styles.icon.className,
      {
        [styles.iconReverse]: reverse,
        [styles.iconAnimate]: defaultIcon && !disabled,
        [styles.iconPrimary]: primary
      }
    );

    let iconNode;
    if (iconChild) {
      iconNode = <span className={iconClasses}>{iconChild}</span>;
    }

    const classes = classnames(
      className,
      styles.common.className,
      colors.invertWhenDark.className,
      {
        [styles.disabled]: disabled,
        [styles.hasIcon]: hasIcon,
        [styles.iconLabel]: hasIcon && label,
        [styles.primary]: primary
      }
    );

    if (!children && label) {
      childrenNode = <span className={styles.label}>{label}</span>;
    }

    const first = reverse ? childrenNode : iconNode;
    const second = reverse ? iconNode : childrenNode;

    const Component = tag;
    return (
      <Component id={id} className={classes} href={href} target={target}
        onClick={onClick} aria-label={a11yTitle}>
        {first}
        {second}
      </Component>
    );
  }
};

Anchor.propTypes = {
  a11yTitle: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.element,
  id: PropTypes.string,
  label: PropTypes.node,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  tag: PropTypes.string,
  target: PropTypes.string,
  reverse: PropTypes.bool
};

Anchor.defaultProps = {
  tag: 'a'
};

Anchor.contextTypes = {
  theme: React.PropTypes.object
};
