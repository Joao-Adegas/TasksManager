import { useDraggable } from "@dnd-kit/core";



export function DroggableCard({ children, id }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 999 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    } : {
        cursor: 'grab'
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}