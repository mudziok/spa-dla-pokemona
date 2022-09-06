import styled from 'styled-components';

export const CalendarContainer = styled.div`
  .react-calendar {
    background: #ffffff;
    border: 1px solid #a3a3a3;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05),
      0px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 1rem;

    &__navigation {
      /* display: grid;
      margin-bottom: 1em;
      grid-template-columns: 4fr 1fr 1fr 2fr;
      justify-items: stretch;
      justify-self: center;
      align-content: center; */

      display: flex;
      justify-items: stretch;
      align-items: stretch;
      align-content: stretch;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;

      button {
        background-color: white;
        &:hover,
        :focus {
          background-color: white;
        }
      }

      &__label {
        font-weight: 800;
        font-size: 16px;
        line-height: 24px;
        color: black;
        order: -1;

        &__labelText--from {
          /* justify-content: space-between; */

          /* display: grid;
    grid-template-columns: 1fr auto;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    column-gap: 1rem; */
          display: flex;
          flex-direction: row;
          font-weight: 800;
          font-size: 16px;
          line-height: 24px;
          align-items: center;
          justify-content: flex-start;
          align-content: center;
          gap: 1rem;
        }
      }

      &__next2-button {
        pointer-events: none;
      }
    }

    &__month-view {
      &__weekNumbers {
        color: #004899;
        font-weight: 400!;
        font-size: 11px!;
        line-height: 21px;
      }

      &__weekdays__weekday {
        font-weight: 400;
        font-size: 11px;
        line-height: 21px;
        text-transform: none;
        color: #000000;
        /* display: flex;
    align-items: center;
    text-align: center;
    justify-content: center; */
      }

      &__days {
        border-left: 1px solid #dfdfdf;
        border-top: 1px solid #dfdfdf;

        &__day {
          border-bottom: 1px solid #dfdfdf;
          border-right: 1px solid #dfdfdf;

          &--weekend {
            color: #000000;
          }
          &--neighboringMonth {
            color: #a3a3a3;
          }
        }
      }
    }

    &__tile {
      font-weight: 400;

      &--now {
        background: white;
      }

      &--active {
        background: #c6c6c6;
        /* outline: 1px solid #dfdfdf; */
        color: black;

        &:focus {
          background: #c6c6c6;
        }
      }
    }
    abbr[title] {
      text-decoration: none;
    }
  }
`;

export const IconWrapper = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
