import { useDraggable } from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"



export function DroggableCard({ children, id }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
    });

    const style = transform ? {
        transform: (isDragging ? " rotate(5deg)" : ""), 
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : 1,
        transition: isDragging ? "none" : "transform 0.1s ease",
        cursor: isDragging ? "grabbing" : "grab"
    } : {
        cursor: 'dragging'
    };

    return (
        <div ref={setNodeRef} style={style} dragListeners={listeners}
            dragAttributes={attributes}>
            {children}
        </div>
    );
}