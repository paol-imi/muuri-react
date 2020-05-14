/// <reference types="react" />
import PropTypes from 'prop-types';
import type { GridComponentProps } from '../interfaces';
export declare function GridComponent({ children, gridProps, grid, filter, sort, sortOptions, addOptions, propsToData, onSend, onDragStart, onDragEnd, onFilter, onSort, onMount, onUnmount, forceSync, dragFixed, dragEnabled, instantLayout, }: GridComponentProps): JSX.Element;
export declare namespace GridComponent {
    var propTypes: {
        grid: PropTypes.Validator<object>;
        gridProps: PropTypes.Requireable<object>;
        filter: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        sort: PropTypes.Requireable<string | ((...args: any[]) => any) | (string | null | undefined)[]>;
        sortOptions: PropTypes.Requireable<Required<PropTypes.InferProps<{
            descending: PropTypes.Requireable<boolean>;
        }>>>;
        addOptions: PropTypes.Requireable<Required<PropTypes.InferProps<{
            show: PropTypes.Requireable<boolean>;
        }>>>;
        onSend: PropTypes.Requireable<(...args: any[]) => any>;
        onDragStart: PropTypes.Requireable<(...args: any[]) => any>;
        onDragEnd: PropTypes.Requireable<(...args: any[]) => any>;
        onFilter: PropTypes.Requireable<(...args: any[]) => any>;
        onSort: PropTypes.Requireable<(...args: any[]) => any>;
        onMount: PropTypes.Requireable<(...args: any[]) => any>;
        onUnmount: PropTypes.Requireable<(...args: any[]) => any>;
        forceSync: PropTypes.Requireable<boolean>;
        dragFixed: PropTypes.Requireable<boolean>;
        dragEnabled: PropTypes.Requireable<boolean>;
        instantLayout: PropTypes.Requireable<boolean>;
    };
    var defaultProps: {
        gridProps: {};
        addOptions: {
            show: boolean;
        };
        sortOptions: {
            descending: boolean;
        };
        forceSync: boolean;
        dragFixed: boolean;
        dragEnabled: boolean;
        instantLayout: boolean;
    };
    var displayName: string;
}
