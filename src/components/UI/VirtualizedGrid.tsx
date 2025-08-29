import React, { useState, useEffect, useMemo } from 'react';

interface VirtualizedGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  itemsPerRow: number;
  gap?: number;
}

function VirtualizedGrid<T>({ 
  items, 
  renderItem, 
  itemHeight, 
  containerHeight, 
  itemsPerRow,
  gap = 20 
}: VirtualizedGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  const rowHeight = itemHeight + gap;
  const totalRows = Math.ceil(items.length / itemsPerRow);
  const totalHeight = totalRows * rowHeight;
  
  const startRow = Math.floor(scrollTop / rowHeight);
  const endRow = Math.min(startRow + Math.ceil(containerHeight / rowHeight) + 1, totalRows);
  
  const visibleItems = useMemo(() => {
    const result = [];
    for (let row = startRow; row < endRow; row++) {
      for (let col = 0; col < itemsPerRow; col++) {
        const index = row * itemsPerRow + col;
        if (index < items.length) {
          result.push({
            item: items[index],
            index,
            top: row * rowHeight,
            left: col * (100 / itemsPerRow) + '%'
          });
        }
      }
    }
    return result;
  }, [items, startRow, endRow, itemsPerRow, rowHeight]);

  return (
    <div
      style={{
        height: containerHeight,
        overflowY: 'auto',
        position: 'relative'
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, top, left }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top,
              left,
              width: `${100 / itemsPerRow - 2}%`,
              height: itemHeight
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VirtualizedGrid;