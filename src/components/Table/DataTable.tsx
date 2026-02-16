import TableRow from "./TableRow";
import { FileItem } from "../../Features/FileDashboard/types";
import './DataTable.css';

// Can be extended in the future to include classname, sorting, filtering, pagination, and support for different data types
interface DataTableProps {
    data: FileItem[];
    toggleRow: (id: string) => void;
    selectedIds: Set<string>;
    columns: { name: string; isExtended: boolean }[];
}

/**
 * DataTable component that renders a table with selectable rows and a status column.
 *
 * @param data - The array of file items to display in the table.
 * @param toggleRow - Function to toggle the selection state of a row based on its ID.
 * @param selectedIds - A set of IDs representing the currently selected rows.
 * @param columns - An array of objects representing the headers for the table columns.
 * @returns A JSX element representing the data table.
 */
const DataTable = ({ data, toggleRow, selectedIds, columns }: DataTableProps): JSX.Element => {
    return (
        <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {columns?.map((header, index) => {
                            if (header.isExtended) {
                                return (
                                    <th key={index}>
                                        <div className="alignBox">
                                            <div className="ghostSpacer" aria-hidden="true" />
                                            <span>{header.name}</span>
                                        </div>
                                    </th>
                                )
                            } else {
                                return (
                                    <th key={index}>
                                        {header.name}
                                    </th>
                                );
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <TableRow
                            key={item.id}
                            item={item}
                            isSelected={selectedIds.has(item.id)}
                            onToggle={toggleRow}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;