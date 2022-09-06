import React, { FC, useEffect, useState } from 'react';

import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

import LoopIcon from '../../Icons/Vector.js';
import { CalendarContainer, BellClick, IconWrapper } from './styles';

const BellIcon = () => {
  return (
    <IconWrapper>
      <LoopIcon />
    </IconWrapper>
  );
};

interface CalendarInputProps {
  isBellPresent: boolean;
  isSelectRange: boolean;
}

export const CalendarInput: FC<CalendarInputProps> = ({
  isBellPresent,
  isSelectRange,
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
  const [range, setIsRange] = useState(isSelectRange);
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-09-01`);

  const icon = (
    <IconWrapper>
      <LoopIcon />
    </IconWrapper>
  );

  const capitalizeFirstLetter = (word: string) => {
    return word[0].toUpperCase() + word.substring(1);
  };

  const handleDrill = (isRange: boolean) => {
    if (isSelectRange) {
      setIsRange(isRange);
    }
  };

  const handleClickBell = () => {
    console.log('dzyn dzyn dzyn');
  };

  return (
    <CalendarContainer>
      {isBellPresent && <BellClick onClick={handleClickBell} />}
      <Calendar
        onChange={onChange}
        value={value}
        showWeekNumbers={true}
        minDate={startDate}
        next2Label={isBellPresent ? <BellIcon /> : null}
        prev2Label={null}
        selectRange={isSelectRange}
        onDrillDown={() => handleDrill(true)}
        onDrillUp={() => handleDrill(false)}
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
