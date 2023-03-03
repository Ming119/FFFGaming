
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Check, X } from "react-bootstrap-icons";

export const Table = ({ tableColumns, tableData, setSelected }) => {
    return (
        <table className="table table-hover text-center">
            <TableHeader tableColumns={ tableColumns } />
            <TableBody tableColumns={ tableColumns }
                tableData={ tableData }
                setSelected={ setSelected } />
        </table>
    );
};

export const TableHeader = ({ tableColumns }) => {

    // const [sortOrder, setSortOrder] = useState("asc");

    const onHeaderClick = (key) => {
    //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    //     tableData.sort((a, b) => {
    //         if (a[key] > b[key]) {
    //             return sortOrder === "asc" ? 1 : -1;
    //         }
    //         if (a[key] < b[key]) {
    //             return sortOrder === "asc" ? -1 : 1;
    //         }
    //         return 0;
    //     });
    };

    return (
        <thead>
            <tr>{ tableColumns.map(({ key, label }) => (
                <th key={ key } onClick={ () => onHeaderClick(key) }>{ label }</th>
            )) }</tr>
        </thead>
    );
};

export const TableBody = ({ tableColumns, tableData, setSelected }) => {
    const onCheckboxClick = (id) => {
        setSelected(prev => {
            if (prev.includes(id)) return prev.filter(item => item !== id);
            return [...prev, id];
        });

        const check = document.getElementById(id).children[0].children[0];
        check.classList.toggle("d-none");
    };

    return (
        <tbody>
            { tableData.map(item => {
                return (
                    <tr key={ item.id } id={ item.id } onClick={ () => onCheckboxClick(item.id) }>
                        <td><Check className="d-none"/></td>
                        { tableColumns.map(({ key }) => {
                            if (key === "-" || key === "/") return null;
                            let data = item[key];
                            if (typeof data === "boolean") {
                                if (data) data = <Check />;
                                else data = <X />;
                            }
                            return ( <td key={`${item.id}-${key}`}>{ data ? data : '-' }</td> );
                        }) }
                        <td><Button as={ Link } to={ item.id } size="sm">詳情</Button></td>
                    </tr>
                );
            }) }
        </tbody>
    );
};

export default Table;