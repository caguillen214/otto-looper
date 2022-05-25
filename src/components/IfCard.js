import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';


import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BENCHES, CARD_TYPES, IF_CONDITIONS } from '../custom/data';
import EmptySlot from './EmptySlot';
import Card from './Card';
import { makeExpBars } from '../custom/utils';

const IfForm = ({currCondition, currTarget, onConditionChange, onTargetChange, slotIndex}) => {
  const [condition, setCondition] = useState(currCondition);
  const [targettingEnemy, setTargettingEnemy] = useState(currTarget);

  const handleConditionChange = (e) => {
    console.log(e);
    setCondition(e.target.value)
    onConditionChange(slotIndex, e.target.value);
  }

  const handleTargetChange = (e) => {
    setTargettingEnemy(e.target.checked)
    onTargetChange(slotIndex, e.target.checked);
  }

  return (
    <FormControl fullWidth  variant="standard" size="small">
        <div className='if-condition-toggle'>
            If <b>{targettingEnemy ? ' enemy': ' self'}</b>
            <Switch
              size="small"
              checked={targettingEnemy}
              onChange={handleTargetChange}
              name="target" />
        </div>
      {/* <InputLabel>If enemy:</InputLabel> */}
      <Select
        value={condition}
        label="Condition"
        size="small"
        onChange={handleConditionChange}
      >
        {IF_CONDITIONS.map((opt, i) => {
          return <MenuItem value={i} name={opt} key={i}>{opt}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}


const IfCard = (props) => {
  const { name, type, index, conditionExp, rangeExp, tier, cardId, parentId, colorInd,  } = props;
  const cardClass = `card if-card command-border-color-${colorInd}`;
  const ifRangeLevel = ~~(rangeExp / 3) + 1;
  const ifConditionLevel = ~~(conditionExp / 3) + 1;

  const rangeBarWidth = `calc(${(ifRangeLevel)*100}% + ${((ifRangeLevel) * 3  )}px)`
  
  const showCombineHover = (combineTargetFor) => {
    return combineTargetFor?.includes(name) ? 'combined-hover' : '';
  }

  return (
    // <div className={cardClass} onMouseOver={()=>{console.log('over')}}>
      <Draggable  key={name} draggableId={name+':'+cardId} index={index} type={type}>
        {(provided, snapshot) => {
          if(!snapshot.isDragging) {
            provided.draggableProps = {
                ...provided.draggableProps,
                style: {
                  ...provided.draggableProps.style,
                  transform: 'none !important'
                }
              }
          }
          if(snapshot.isDropAnimating) {
            provided.draggableProps = {
                ...provided.draggableProps,
                style: {
                  ...provided.draggableProps.style,
                  transform: 'none'
                }
              }
          }
          return (
            <div 
                className={`${cardClass}  ${showCombineHover(snapshot.combineTargetFor)}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
              {/* <div className='if-card-container'> */}
                <IfForm
                  slotIndex={index}
                  currCondition={props.condition}
                  currTarget={props.targettingEnemy}
                  onConditionChange={props.onConditionChange}
                  onTargetChange={props.onTargetChange}/>
                <div className={`if-range-bars command-border-color-${colorInd}`} style={{width: rangeBarWidth}}></div>
                {rangeExp !== 0 && ifRangeLevel !== 3 && <div className="command-exp-bar-container">
                  {makeExpBars(rangeExp, ifRangeLevel)}
                </div>}
              {/* </div> */}
            </div>
          );
        }}
      </Draggable>
  //  </div>
  );
}

  export default IfCard;