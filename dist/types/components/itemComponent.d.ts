/// <reference types="react" />
import PropTypes from 'prop-types';
/** Interfaces */
import type { ItemComponentProps } from '../interfaces';
export declare function ItemComponent({ children: child, itemClasses, itemAddController, itemRemoveController, propsToData, itemKey, grid, }: ItemComponentProps): JSX.Element;
export declare namespace ItemComponent {
    var propTypes: {
        itemAddController: PropTypes.Validator<object>;
        itemClasses: PropTypes.Validator<string[]>;
        propsToData: PropTypes.Requireable<(...args: any[]) => any>;
        children: PropTypes.Validator<PropTypes.ReactElementLike>;
        grid: PropTypes.Validator<unknown>;
    };
    var displayName: string;
}
