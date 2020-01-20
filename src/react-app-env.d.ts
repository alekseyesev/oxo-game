/// <reference types="react-scripts" />

interface ITableProps {
    inProgress?: boolean,
    placeMark(markIndex: number): void,
    cells: Array<ICellProps>
}

interface ICellProps extends ICellClassesProps {
    onClick(): void
}

interface ICellClassesProps {
    active?: boolean,
    oPlayer?: boolean,
    xPlayer?: boolean
}
