import React, { useState } from 'react'

export default function GmailOrderByToggle({ orderBy, setOrderBy }) {

    const options = [
        { label: 'Default', name: 'created_at', position: 'rounded-l-full' },
        { label: 'Used Space', name: 'used_space', position: '' },
        { label: 'Last Login', name: 'last_login', position: 'rounded-r-full' }
    ];

    return (
        <div className="flex items-center">
            {options.map((option) => {
                const isActive = orderBy === option.name;

                return (
                    <button
                        key={option.name}
                        onClick={() => setOrderBy(option.name)}
                        className={`
              inline-flex items-center px-4 py-2 text-xs font-bold border transition-all duration-300 cursor-pointer shadow-sm
              ${option.position}
              ${isActive
                                ? 'bg-indigo-600 text-white border-indigo-600 z-10 scale-105'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                            }
            `}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    )
}
