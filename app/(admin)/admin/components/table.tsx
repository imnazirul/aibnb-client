import React, {useState} from "react";
import {Modal} from "antd";

import ScrollContainer from "react-indiana-drag-scroll";
import Pagination from "./pagination";
import {FiEdit2, FiEdit3, FiEye, FiPenTool, FiSearch, FiTrash} from "react-icons/fi";
import {useAction} from "../../../../helpers/hooks";


interface TableProps {
    columns: any[],
    data: any,
    item?: string,
    loading?: boolean,
    noActions?: boolean,
    actions?: any[],
    onView?: (data: any) => void,
    onEdit?: (data: any) => void,
    onDelete?: (data: any) => void,
    custom?: React.ReactNode,
    pagination?: boolean,
    onAdd?: () => void,
    onReload?: any,
    beforeAdd?: React.ReactNode,
    indexed?: boolean
}


const Table = ({
                   columns,
                   data,
                   item,
                   loading = false,
                   noActions,
                   actions,
                   onView,
                   onEdit,
                   onDelete,
                   custom,
                   pagination,
                   onAdd,
                   onReload,
                   beforeAdd,
                   indexed
               }: TableProps) => {

    const [deleteUid, setDeleteUid] = useState(undefined)

    const getOptions = (data) => {
        let options = (actions || []).map(action => {
            return {
                label: action.label,
                onClick: () => action.onClick(data),
                className: action.className,
                icon: action.icon
            }
        })
        !!onView && options.push({
            label: 'View',
            className: 'text-indigo-600',
            onClick: () => onView(data),
            icon: <FiEye size={18}/>
        })
        !!onEdit && options.push({
            label: 'Edit',
            className: 'text-indigo-600',
            onClick: () => onEdit(data),
            icon: <FiEdit3 size={18}/>
        })
        !!onDelete && options.push({
            label: 'Delete',
            className: 'text-[#DC4947]',
            onClick: () => setDeleteUid(data.uid),
            icon: <FiTrash size={18}/>
        })
        return options
    }

    return (
        <div className="bg-white p-6 rounded">
            <div className="flex justify-between  items-center mb-4">
                <div className="relative">
                    <input
                        onChangeCapture={(e: any) => onReload({search: e.target.value || undefined})}
                        className="form-input input-sm"/>
                    <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#959595]"/>
                </div>
                <div className="flex items-center gap-4">
                    {beforeAdd}
                    {!!onAdd && (
                        <button
                            onClick={onAdd}
                            className="btn-primary">
                            Add {item || 'Item'}
                        </button>
                    )}
                </div>
            </div>
            <ScrollContainer className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        {indexed && <th className="!w-12 !text-center">#</th>}
                        {columns?.map((column, index) => (
                            <th key={index} className="relative">
                                <div>{column.text}</div>
                            </th>
                        ))}
                        {!noActions && <th className="w-40">Actions</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                        </tr>
                    ) : (
                        <>
                            {(pagination ? data?.docs : data)?.map((row, index) => (
                                <tr key={index}>
                                    {indexed && <td  className="text-center">{!!pagination ?
                                        (data?.page - 1) * data?.limit + index + 1 : index + 1}</td>}
                                    {columns?.map((column, index2) => (
                                        <td className={column.className} key={index2}>
                                            {column.formatter ? column.formatter(row[column.dataField], row, {
                                                index,
                                                setDeleteUid
                                            }) : (row[column.dataField] || '-')}
                                        </td>
                                    ))}
                                    {!noActions && <td>
                                        <div className="flex items-center gap-4 min-w-[40px]">
                                            {getOptions(row).map((option, index) => (
                                                <div key={index} className={`cursor-pointer ${option.className || ''}`}
                                                     onClick={option.onClick}>
                                                    {option.icon}
                                                </div>
                                            ))}
                                        </div>
                                    </td>}
                                </tr>
                            ))}
                        </>
                    )}
                    {!!custom && custom}
                    </tbody>
                </table>
            </ScrollContainer>

            {pagination && (
                <div className="mt-4">
                    <Pagination
                        page={data?.page}
                        total={data?.totalDocs}
                        limit={data?.limit}
                        totalPages={data?.totalPages} onPageChange={page => onReload({page})}/>
                </div>
            )}

            <Modal open={!!deleteUid} closeIcon={null} closable={false} footer={null}>
                <div className="p-4 font-inter">
                    <p className="text-2xl font-medium mb-3">Delete {item || 'Item'}</p>
                    <p className="text-[#505050] mb-5">Are you sure want to delete this {item || 'Item'}?</p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setDeleteUid(undefined)}
                            className="btn-secondary">Cancel
                        </button>
                        <button
                            onClick={() => {
                                return useAction(onDelete, {uid: deleteUid}, () => {
                                    setDeleteUid(undefined)
                                    !!onReload && onReload()
                                })
                            }}
                            className="btn-danger">Delete
                        </button>
                    </div>

                </div>
            </Modal>

        </div>
    )
}
export default Table


interface DetailsTableProps {
    title?: string,
    column: any[],
    data: any
}


export const DetailsTable = ({title, column, data = {}}: DetailsTableProps) => {
    return (
        <div className="bg-white p-4 rounded">
            {!!title && <h4 className="text-lg font-medium mb-2.5">{title}</h4>}

            <table className="table">
                <tbody>
                {column?.map((column, index) => (
                    <tr key={index}>
                        <td className="font-medium">{column.text}</td>
                        <td>{column.formatter ? column.formatter(data[column.dataField], data) : data[column.dataField]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}