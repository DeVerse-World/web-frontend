import { useState } from "react";

type PaginatorButtonProps = {
    value: string;
    active?: boolean;
}

function PaginatorButton(props: PaginatorButtonProps) {
    let className = "paginator ";
    if (props.active) {
        className += "active";
    }
    let innerValue = props.value;
    if (props.value === '<') {
        innerValue = '-2';
    } else if (props.value === '>') {
        innerValue = '-1';
    }
    return (
        <button>
            <li value={innerValue} className={className}>
                {props.value}
            </li>
        </button>
    )
}

type PaginatorProps = {
    currentPage: number;
    totalPage: number;
    onChangePage: (number) => void;
}

function Paginator(props: PaginatorProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (target: EventTarget) => {
        let newPage = target.value;
        if (!newPage) {
            return;
        }
        if (newPage === "-2") {
            newPage = 1;
        } else if (newPage === "-1") {
            newPage = props.totalPage
        }
        setCurrentPage(newPage)
        props.onChangePage(newPage)
    }

    // < 1 2 3 ... >
    // < ... 2 3 4 ... >
    // < ... 3 4 5 ... >
    // < 1 2 3 ... >
    // 1 2
    const renderButtons = (): JSX.Element => {
        if (props.totalPage <= 1) {
            return null;
        }
        let elements = [];

        elements.push(<PaginatorButton key={'<'} value={'<'} />)

        if (currentPage >= 3 && props.totalPage > 3) {
            elements.push(<PaginatorButton key={'...less'} value={'...'} />)
        }

        for (let i = 1; i <= 3; i++) {
            let numb = currentPage + i - 2;
            if (currentPage === 1) {
                numb++;
            } else if (currentPage === props.totalPage) {
                numb--;
            }
            if (numb > 0 && numb <= props.totalPage) {
                elements.push(<PaginatorButton key={numb} value={numb} active={currentPage === numb} />)
            }
        }
        if (currentPage < props.totalPage - 1 && props.totalPage > 3) {
            elements.push(<PaginatorButton key={'...more'} value={'...'} />)
        }
        elements.push(<PaginatorButton key={'>'} value={'>'} />)
        return (
            <ol className="flex flex-row gap-2 " onClick={(e) => onPageChange(e.target)}>
                {elements}
            </ol>
        )
    }

    return (
        renderButtons()
    )
}

export default Paginator;