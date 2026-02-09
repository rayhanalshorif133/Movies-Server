import React from 'react'

export default function MovieFilter() {
    return (
        <div>
            <div class="relative w-full max-w-138 mx-auto hidden" id="filterContainerWithBtn">
                <button id="scrollLeftBtn"
                    class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-white border border-white hover:border-[#b32e60] rounded-full shadow hover:bg-[#b32e60]">
                    <i class="fa-solid fa-angle-left text-white"></i>
                </button>

                <div class="mx-auto text-center px-8">
                    <div id="filterContainer"
                        class="filter_series_container flex overflow-x-auto gap-3 py-2 scroll-smooth no-scrollbar whitespace-nowrap">
                    </div>
                </div>

                <button id="scrollRightBtn"
                    class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-white border border-white hover:border-[#b32e60] rounded-full shadow hover:bg-[#b32e60]">
                    <i class="fa-solid fa-angle-right text-white"></i>
                </button>

            </div>
        </div>
    )
}
