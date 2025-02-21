import ReactPaginate from "react-paginate";

const Pagination = ({page, total, limit, totalPages, onPageChange}) => {

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex items-center !mb-6 md:!mb-0 ">
                <p className="text-sm text-gray-500">
                    Showing {((page - 1) * limit) + 1 || 0} to {Math.min(total || 0, (page * limit) || 0)} of {total || 0} items
                </p>
            </div>

            <ReactPaginate
                breakLabel="..."
                previousLabel={"Previous"}
                disabledLinkClassName="opacity-50 cursor-not-allowed"
                previousLinkClassName="text-sm font-semibold text-[#585858] hover:text-black py-2 px-4 border border-[#D0D5DD] rounded-l-md"
                nextLinkClassName="text-sm font-semibold text-[#585858] hover:text-black py-2 px-4 border -ml-[1px] border-[#D0D5DD] rounded-r-md"
                pageLinkClassName="text-sm font-semibold text-[#585858] hover:text-black py-2 px-4 border -ml-[1px] border-[#D0D5DD]"
                pageClassName="!mb-3 md:!mb-0"
                activeLinkClassName="bg-[#F3F3F3]"
                nextLabel={"Next"}
                className="flex flex-wrap"
                onPageChange={({selected}) => onPageChange(selected + 1)}
                pageRangeDisplayed={3}
                pageCount={totalPages || 1}
                renderOnZeroPageCount={null}
            />
        </div>
    )
}
export default Pagination