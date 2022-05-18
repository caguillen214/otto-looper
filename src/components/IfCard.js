import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BENCHES, CARD_TYPES } from '../custom/data';
import EmptySlot from './EmptySlot';
import Card from './Card';
import { makeExpBars } from '../custom/utils';

const IfCard = (props) => {
  const { name, type, index, conditionExp, rangeExp, tier, cardId, parentId, slots = [] } = props;
  const cardClass = 'card if-card';
  const ifRangeLevel = ~~(rangeExp / 3) + 1;
  const ifConditionLevel = ~~(conditionExp / 3) + 1;
 
 
  const getDropDisabledStatus = () => {
      return slots.length >= ifConditionLevel;
  }

  const emptyConditionSlots = () => {
    const emptySlots = [];
    for (let i = slots.length; i < ifConditionLevel; i++) {
      emptySlots.push(<div className='empty-if-condition-slot' key={i}></div>)
    }
    return emptySlots;
  }

  const dashOrSolid = getDropDisabledStatus() ? 'solid' : 'dashed'


  return (
    <Draggable key={name} draggableId={name+cardId} index={index} type={type}>
      {provided => {
        return (
          <div className={cardClass}    
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
            {/* <div className='if-card-container'> */}
              <div className='if-range-bars' style={{width: (ifRangeLevel+1) * 100 +'%'}}></div>
              {rangeExp !== 0 && ifRangeLevel !== 3 && <div className="exp-bar-container">
                {makeExpBars(rangeExp, ifRangeLevel)}
              </div>}
              <div className="if-details-container" >
                <div>IF enemy:</div>
                {/* <div className=""> */}
                  <Droppable
                    isDropDisabled={getDropDisabledStatus()}
                    droppableId={'if-slots:'+cardId}
                    direction="vertical">
                        {(provided, snapshot) => {
                          console.log(snapshot)
                          return (
                            <div className='if-condition-container'>
                              {conditionExp !== 0 && ifConditionLevel !== 3 && <div className="exp-bar-container-vertical">
                                {makeExpBars(conditionExp, ifConditionLevel)}
                              </div>}
                              <div className="if-cards-container"
                                  ref={provided.innerRef}
                                  style={{borderStyle:`${dashOrSolid}`}}
                                  {...provided.droppableProps} >
                                  
                                  {slots.map(({ name, type, exp, tier, cardId }, index) => (
                                      <Card
                                          key={name+index}
                                          name={name}
                                          index={index}
                                          cardId={cardId}
                                          parentId={'if-slots:'+cardId}
                                          type={type}
                                          exp={exp}
                                          tier={tier}
                                          emptyText="Empty"/>
                                  ))}
                                  {!snapshot.isDraggingOver && emptyConditionSlots()}
                                  {provided.placeholder}
                              </div>
                            </div>
                          );
                        }}
                  </Droppable>
                {/* </div> */}
              </div>
              <div className='if-range-bars' style={{width: (ifRangeLevel+1) * 100 +'%'}}></div>
            {/* </div> */}
          </div>
        );
      }}
    </Draggable>
  );
}

  export default IfCard;