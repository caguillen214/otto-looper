import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const Dropzone = ({ isDropDisabled, heroes = [], id }) => (
  <div className="column col-4">
    <div className="divider" data-content={id.toUpperCase()} />
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu hero-list" {...provided.droppableProps} ref={provided.innerRef}>
            {heroes.map(({ name }, index) => (
              <Card key={name} name={name} index={index} />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  </div>
);

// const Card = ({ name, index }) => (
//   <Draggable key={name} draggableId={name} index={index}>
//     {provided => {
//       return (
//         <div
//           className="menu-item tile tile-centered"
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//         >
//           <figure style={{ backgroundColor: 'transparent' }} className="avatar tile-icon">
//             <img src={`./cards/atk1.png`} alt={name} />
//           </figure>
//           <div className="tile-content">{name}</div>
//         </div>
//       );
//     }}
//   </Draggable>
// );

export default Dropzone;
