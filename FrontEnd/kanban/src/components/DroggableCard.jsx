import { useDraggable } from "@dnd-kit/core";



export function DroggableCard({ children, id }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
    });

    const style = transform ? {
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : 1,
    } : {
        cursor: 'pointet'
    };

    return (
        <div ref={setNodeRef} style={style} dragListeners={listeners}
            dragAttributes={attributes}>
            {children}
        </div>
    );
}