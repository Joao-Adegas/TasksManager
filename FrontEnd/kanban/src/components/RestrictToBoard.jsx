// utils/restrictToBoard.js
export function RestrictToBoard(boardRef) {
  const modifier = ({ transform, activeNodeRect }) => {
    if (!boardRef.current || !activeNodeRect) return transform;

    const boardRect = boardRef.current.getBoundingClientRect();

    // limites horizontais
    const minX = boardRect.left - activeNodeRect.left;
    const maxX = boardRect.right - activeNodeRect.right;
    const newX = Math.min(Math.max(transform.x, minX), maxX);

    // limites verticais
    const minY = boardRect.top - activeNodeRect.top;
    const maxY = boardRect.bottom - activeNodeRect.bottom;
    const newY = Math.min(Math.max(transform.y, minY), maxY);

    return { ...transform, x: newX, y: newY };
  };

  return modifier;
}
