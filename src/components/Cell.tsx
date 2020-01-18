import React from 'react';

const Cell: React.FC<ICellProps> = (props) => {

    const { children, ...switchClasses } = props;

    const classNamesBitMask: any = {
        '1': 'table__cell',
        '2': 'table__cell_active',
        '4': 'table__cell_o',
        '8': 'table__cell_x'
    };

    const currentClassesBitMask: number = Number([
        true,
        ...Object.values(switchClasses)
    ].map(Number).map(bit => bit.toString(2)).reverse().join(''));

    return (<div className={Object.entries(classNamesBitMask).reduce((classNamesString, [bit, className]) => {
        
        return ((Number.parseInt(bit, 2) & currentClassesBitMask) && `${classNamesString} ${className}`) || classNamesString;
    
    }, '')} />);

};

export default Cell;