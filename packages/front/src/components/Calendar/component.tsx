import React, { FC, useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

import LoopIcon from '../../Icons/Vector.js';
import { CalendarContainer, IconWrapper } from './styles';

interface CalendarInputProps {
  isBellPresent: boolean;
  isSelectRange: boolean;
}

export const CalendarInput: FC<CalendarInputProps> = ({
  isBellPresent = true,
  isSelectRange = false,
}) => {
  const localLanguage = 'pl';
  const monthsNames = [
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

  const daysNames = ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'So'];

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
        next2Label={isBellPresent ? icon : null}
        prev2Label={null}
        selectRange={isSelectRange}
        onViewChange={() => {}}
        navigationLabel={({ label }) => (
          <>
            {icon}
            {capitalizeFirstLetter(label)}
          </>
        )}
        formatShortWeekday={(locale, value) => daysNames[value.getDay()]}
        formatMonth={(locale, value) => monthsNames[value.getMonth()]}
        locale={localLanguage}
        minDetail='year'
      />
    </CalendarContainer>
  );
};
