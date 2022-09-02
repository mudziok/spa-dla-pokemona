import React, { useState } from 'react';

import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

import LoopIcon from '../../Icons/Vector.js';
import { CalendarContainer, IconWrapper } from './styles';

export const CalendarInput = () => {
  const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];
  const [value, onChange] = useState(new Date());

  const icon = (
    <IconWrapper>
      <LoopIcon />
    </IconWrapper>
  );

  const capitalizeFirstLetter = (word: string) => {
    return word[0].toUpperCase() + word.substring(1);
  };

  return (
    <CalendarContainer>
      <Calendar
        onChange={onChange}
        value={value}
        showWeekNumbers={true}
        next2Label={icon}
        prev2Label={null}
        selectRange={false}
        navigationLabel={({ label }) => (
          <>
            {icon}
            {capitalizeFirstLetter(label)}
          </>
        )}
        formatShortWeekday={(locale, value) =>
          ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'So'][value.getDay()]
        }
        formatMonth={(locale, value) => months[value.getMonth()]}
      />
    </CalendarContainer>
  );
};
