import { useDroppable } from "@dnd-kit/core";

export function DroppableColumn({ children, id }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    const style = {
        backgroundColor: isOver ? '#dadadaff' : undefined,
        borderRadius:'1rem',
        padding:'1rem',
        heigth:'20rem',
        transition: 'background-color 0.2s ease'
    };

    return (
        <div ref={setNodeRef} style={style} className="cards-column">
            {children}
        </div>
    );
}