import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const HistoryPage = (props) => {
    const [value, setValue] = useState(new Date());
    const { percentage } = props

    const greenDates = [new Date(2023, 2, 1), new Date(2023, 2, 2), new Date(2023, 2, 3)];
    const pinkDates = [new Date(2023, 2, 4), new Date(2023, 2, 5), new Date(2023, 2, 6)];
    // function to add a circular background to the tile
    function addCircleBackground({ date, view }) {
        if (view === 'month') {
            if (greenDates.some((d) => d.getTime() === date.getTime())) {
                return 'react-calendar__tile--green-bg';
            }
            if (pinkDates.some((d) => d.getTime() === date.getTime())) {
                return 'react-calendar__tile--pink-bg';
            }
            if (date.getTime() === new Date().getTime()) {
                return 'react-calendar__tile--today';
            }
        }
    }

    return (
        <>
            <Header signedIn={true} />
            <Main>
                <StyledCalendar
                    onChange={setValue}
                    value={value}
                    locale="pt-BR"
                    tileClassName={addCircleBackground}
                />
            </Main>
            <Footer percentage={percentage} />
        </>
    );
};

const Main = styled.main`
    background: #E5E5E5;
    height: calc(100vh - 140px);
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledCalendar = styled(Calendar)`
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 335px;
    height: 402px;
    background: #fff;
    font-size: 1rem;
    
    .react-calendar__tile {
        color: #000;
        text-align: center;
    }

    .react-calendar__tile--active {
        background-color: white;
    }
    
    .react-calendar__tile--green-bg {
    background-color: #8CC654;
  }

  .react-calendar__tile--pink-bg {
    background-color: #EA5766;
  }
  .react-calendar__tile--now,
  .react-calendar__tile--today {
    background-color: yellow;
  }

  .react-calendar__month-view__weekdays {
    text-align: left;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: #000;
    font-style: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    color: blue;
  }

  .react-calendar__navigation__label,
  .react-calendar__navigation__arrow {
    color: #000;
  }
  .react-calendar__navigation__label {
    font-size: 0.75rem;
  }

  .react-calendar__navigation__arrow {
    width: 10px;
  }
    .react-calendar__tile--green-bg,
    .react-calendar__tile--pink-bg {
        background-clip: padding-box;
        border-radius: 50%;
        transform: scale(0.8);
    }

    .react-calendar__year-view {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}

.react-calendar__year-view__months__month,
.react-calendar__decade-view__years__year {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 77px;
  color: #000;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  transform: scale(0.8);
}

.react-calendar__year-view__months__month:hover,
.react-calendar__decade-view__years__year {
  background-color: #E5E5E5;
}
`;

export default HistoryPage;